const {
    DynamoDBClient,
    ScanCommand,
    PutItemCommand,
    UpdateItemCommand
} = require('@aws-sdk/client-dynamodb');
const {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
} = require('@aws-sdk/lib-dynamodb');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')
const {
    marshall,
    unmarshall
} = require("@aws-sdk/util-dynamodb");

const ddbClient = new DynamoDBClient({
    region: process.env.TABLE_REGION
});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand
} = require("@aws-sdk/client-s3");
// const s3 = new S3Client({ region: 'ap-northeast-1'});
const bucketName = 'itorchardmainstorage120228-dev'
const region = 'ap-northeast-1'
const accessKeyId = 'AKIA32FFS5UT3WYMF3FS'
const secretAccessKey = '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'
const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})
const fs = require('fs');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});
const {
    v4: uuidv4
} = require('uuid');
const {
    getSignedUrl
} = require("@aws-sdk/s3-request-presigner");


let tableName = "blogs";
if (process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/blogs";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
    switch (type) {
        case "N":
            return Number.parseInt(param);
        default:
            return param;
    }
}

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path, async function (req, res) {
    try {
        let {
            Items
        } = await ddbDocClient.send(new ScanCommand({
            TableName: tableName
        }));
        let data = Items.map((item) => unmarshall(item));
        for (let item of data) {
            item.imageLink = await getSignedUrl(
                s3,
                new GetObjectCommand({
                    Bucket: bucketName,
                    Key: `uploads/blogs/${item.image}`
                }), {
                    expiresIn: 600
                } // 60 seconds
            )
        }

        return res.json(data);
    } catch (e) {
        res.statusCode = 500;
        res.json({
            error: 'Could not load items: ' + e.message
        });
    }
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/object' + hashKeyPath + sortKeyPath, async function (req, res) {
    const params = {};
    if (userIdPresent && req.apiGateway) {
        params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    } else {
        params[partitionKeyName] = req.params[partitionKeyName];
        try {
            params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
        } catch (err) {
            res.statusCode = 500;
            res.json({
                error: 'Wrong column type ' + err
            });
        }
    }
    if (hasSortKey) {
        try {
            params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
        } catch (err) {
            res.statusCode = 500;
            res.json({
                error: 'Wrong column type ' + err
            });
        }
    }

    let getItemParams = {
        TableName: tableName,
        Key: params
    }

    try {
        const data = await ddbDocClient.send(new GetCommand(getItemParams));
        if (data.Item) {
            res.json(data.Item);
        } else {
            res.json(data);
        }
    } catch (err) {
        res.statusCode = 500;
        res.json({
            error: 'Could not load items: ' + err.message
        });
    }
});


/************************************
 * HTTP put method for insert object *
 *************************************/

app.put(path, upload.single('file'), async function (req, res) {
    try {
        if(req.file){
            // get previous record
            let params = {};
            params[partitionKeyName] = req.body.id
            let getPreviusData = {
                TableName: tableName,
                Key: params
            }
            const data = await ddbDocClient.send(new GetCommand(getPreviusData));
            // delete previous image from s3
            const deleteParams = {
                Bucket: 'itorchardmainstorage120228-dev',
                Key: `uploads/blogs/${data.Item.image}`,
            }
            s3.send(new DeleteObjectCommand(deleteParams));
            // create new name and upload image to s3
            const uniqueImgName = uuidv4() + req.file.originalname;
            const uploadParamsS3 = {
                Bucket: 'itorchardmainstorage120228-dev',
                Key: `uploads/blogs/${uniqueImgName}`,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            }
            // Send the upload to S3
            await s3.send(new PutObjectCommand(uploadParamsS3));
            req.body.image = uniqueImgName;
        }
        const objKeys = Object.keys(req.body).filter(key => key !== 'id');
        const updateParams = {
            TableName: tableName,
            Key: marshall({ id: req.body.id }),
            UpdateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
            ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
            ...acc,
            [`#key${index}`]: key,
          }), {}),

            ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) => ({
            ...acc,
                [`:value${index}`]: req.body[key],
            }), {})),

            ReturnValues: 'ALL_NEW',
        };

        let data = await ddbDocClient.send(new UpdateItemCommand(updateParams));
        res.json({
            success: 'put call succeed!',
            url: req.url,
            data: data
        })
    } catch (err) {
        res.statusCode = 500;
        res.json({
            error: err,
            url: req.url,
            body: req.body
        });
    }
});

/************************************
 * HTTP post method for insert object *
 *************************************/

app.post(path, upload.single('file'), async function (req, res) {
    try {
        // first save the file in s3 with unique name and then save data into dynamodb
        const uniqueImgName = uuidv4() + req.file.originalname;
        const uploadParamsS3 = {
            Bucket: 'itorchardmainstorage120228-dev',
            Key: `uploads/blogs/${uniqueImgName}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }
        // res.send(req.file);
        // Send the upload to S3
        await s3.send(new PutObjectCommand(uploadParamsS3));
        req.body.image = uniqueImgName;
        req.body.id = uuidv4();
        req.body.created_at = new Date().toISOString();
        let putItemParams = {
            TableName: tableName,
            Item: marshall(req.body),
        }
        const createResult = await ddbDocClient.send(new PutItemCommand(putItemParams));

        res.json({
            success: 'Blog saved t!',
            url: req.url,
            data: createResult
        })
    } catch (err) {
        res.statusCode = 500;
        res.json({
            error: err,
            url: req.url,
            body: req.body
        });
    }
});

/**************************************
 * HTTP remove method to delete object *
 ***************************************/

app.post(path + '/delete', async function (req, res) {
    const params = {};
    params[partitionKeyName] = req.body.id
    const deleteParams = {
        Bucket: 'itorchardmainstorage120228-dev',
        Key: `uploads/blogs/${req.body.image}`,
    }
    try {
        s3.send(new DeleteObjectCommand(deleteParams))
        let removeItemParams = {
            TableName: tableName,
            Key: params
        }
        let data = await ddbDocClient.send(new DeleteCommand(removeItemParams));
        res.json({
            url: req.url,
            data: data
        });
    } catch (err) {
        res.statusCode = 500;
        res.json({
            error: err,
            url: req.url
        });
    }
});

app.listen(3000, function () {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app