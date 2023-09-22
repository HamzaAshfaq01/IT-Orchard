const {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand
} = require('@aws-sdk/client-dynamodb');
const { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')
const nodemailer = require('nodemailer');
const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand
} = require("@aws-sdk/client-s3");
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
let tableName = "contactus";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}
const {
  getSignedUrl
} = require("@aws-sdk/s3-request-presigner");
const {
  marshall,
  unmarshall
} = require("@aws-sdk/util-dynamodb");
const {
  v4: uuidv4
} = require('uuid');
const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/website";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
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

app.get(path, async function(req, res) {
  try {
    let {
      Items
    } = await ddbDocClient.send(new ScanCommand({
      TableName: "contactus"
    }));
    const unmarshalledItems = Items.map(item => {
      const unmarshalledItem = unmarshall(item);
      unmarshalledItem.created_at = new Date(unmarshalledItem.created_at);
      return unmarshalledItem;
    });

    return res.json(unmarshalledItems);
  }
  catch (e) {
    res.statusCode = 500;
    res.json({
      error: 'Could not load items: ' + e.message
    });
  }
});
/********************************
 * HTTP Get method for list blogs *
 ********************************/

app.get(path + '/get-blogs', async function(req, res) {
  try {
    let {
      Items
    } = await ddbDocClient.send(new ScanCommand({
      TableName: 'blogs-dev'
    }));
    let data = Items.map((item) => unmarshall(item));
    for (let item of data) {
      item.imageLink = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: bucketName,
          Key: `uploads/blogs/${item.image}`
        }), {
          expiresIn: 6000
        } // 60 seconds
      )
    }

    return res.json(data);
  }
  catch (e) {
    res.statusCode = 500;
    res.json({
      error: 'Could not load items: ' + e.message
    });
  }
});
/********************************
 * HTTP Get method for list companies *
 ********************************/

app.get(path + '/get-companies', async function(req, res) {
  try {
    const isRecommended = "1";
    const queryRecommendedCommand = new QueryCommand({
      TableName: 'companies-dev',
      IndexName: 'isRecommended-index',
      KeyConditionExpression: 'isRecommended = :isRecommended',
      ExpressionAttributeValues: {
        ':isRecommended': isRecommended
      }
    });
    const recommendedCompanies = await ddbDocClient.send(queryRecommendedCommand);
    let {
      Items
    } = await ddbDocClient.send(new ScanCommand({
      TableName: 'companies-dev'
    }));
    let data = Items.map((item) => unmarshall(item));
    for (let item of data) {
      item.imageLink = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: bucketName,
          Key: `uploads/companies/${item.image}`
        }), {
          expiresIn: 6000
        } // 60 seconds
      )
      item.galleryLink = [];
      for (const file of item.galleryImages) {
        item.galleryLink.push(await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: bucketName,
            Key: `uploads/companies/${file}`
          }), {
            expiresIn: 600 // 60 seconds
          }
        ));
      }
    }
    for (let recom of recommendedCompanies.Items) {
      recom.imageLink = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: bucketName,
          Key: `uploads/companies/${recom.image}`
        }), {
          expiresIn: 6000
        } // 60 seconds
      )
      recom.galleryLink = [];
      for (const file of recom.galleryImages) {
        recom.galleryLink.push(await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: bucketName,
            Key: `uploads/companies/${file}`
          }), {
            expiresIn: 600 // 60 seconds
          }
        ));
      }
    }
    return res.json({
      "companies": data,
      "recommendedCompanies": recommendedCompanies.Items
    });
  }
  catch (e) {
    res.statusCode = 500;
    res.json({
      error: 'Could not load items: ' + e.message
    });
  }
});


/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/get-blog-details' + hashKeyPath + sortKeyPath, async function(req, res) {
  const params = {};
  params[partitionKeyName] = req.params.id

  let getItemParams = {
    TableName: 'blogs-dev',
    Key: params
  }
  const postId = req.params.id;
  const queryCommentsCommand = new QueryCommand({
    TableName: 'comments',
    IndexName: 'postId-index',
    KeyConditionExpression: 'postId = :postId',
    ExpressionAttributeValues: {
      ':postId': postId
    }
  });
  try {
    const blog = await ddbDocClient.send(new GetCommand(getItemParams));
    const comments = await ddbDocClient.send(queryCommentsCommand);
    if (blog.Item) {
      blog.Item.imageLink = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: bucketName,
          Key: `uploads/blogs/${blog.Item.image}`
        }), {
          expiresIn: 6000
        } // 60 seconds
      )
      res.json({ "blog": blog.Item, "comments": comments.Items });
    }
    else {
      res.json(blog.Item);
    }
  }
  catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Could not load items: ' + err.message });
  }
});
/*****************************************
 * HTTP Get method for get blog search *
 *****************************************/

app.get(path + '/search' + hashKeyPath + sortKeyPath, async function(req, res) {
  const title = req.params.id;
  const scanParams = {
    TableName: 'blogs-dev',
    IndexName: 'title-index',
    FilterExpression: 'contains(title, :title)',
    ExpressionAttributeValues: marshall({ ':title': title }),
  };
  try {
    const command = new ScanCommand(scanParams);
    const { Items } = await ddbDocClient.send(command);
    const results = Items.map((item) => unmarshall(item));
    if (results) {
      for(let item of results){
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
      res.json({ "blog": results});
    }
    else {
      res.json(results);
    }
  }
  catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Could not load items: ' + err.message });
  }
});
/*****************************************
 * HTTP Get method for get blog tag search *
 *****************************************/

app.get(path + '/search-tags' + hashKeyPath + sortKeyPath, async function(req, res) {
  const tags = req.params.id;
  const scanParams = {
    TableName: 'blogs-dev',
    IndexName: 'tags-index',
    FilterExpression: 'contains(tags, :tags)',
    ExpressionAttributeValues: marshall({ ':tags': tags }),
  };
  try {
    const command = new ScanCommand(scanParams);
    const { Items } = await ddbDocClient.send(command);
    const results = Items.map((item) => unmarshall(item));
    if (results) {
      for(let item of results){
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
      res.json({ "blog": results});
    }
    else {
      res.json(results);
    }
  }
  catch (err) {
    res.statusCode = 500;
    res.json({ error: 'Could not load items: ' + err.message });
  }
});


/************************************
 * HTTP put method for insert object *
 *************************************/

app.put(path, async function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  try {
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.json({ success: 'put call succeed!', url: req.url, data: data })
  }
  catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

/************************************
 * HTTP post method for insert contact us object *
 *************************************/

app.post(path, async function(req, res) {
  req.body.id = uuidv4();
  req.body.created_at = new Date().toISOString();
  let putItemParams = {
    TableName: 'contactus',
    Item: marshall(req.body)
  }
  try {
    let data = await ddbDocClient.send(new PutItemCommand(putItemParams));
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: "0f3479612730a9",
        pass: "fd8a45fd5ca2e9"
      }
    });
    // Compose the email
    const mailOptions = {
      from: 'sender@example.com', // Replace with the sender's email address
      to: 'recipient@example.com', // Replace with the recipient's email address
      subject: 'Thanks for contacting us',
      text: 'Thanks for contacting us we will reach out you within 2-3 working days. Thanks.' // You can also use HTML content
    };

    // Send the email
    const info = await transport.sendMail(mailOptions);
    res.json({ success: 'post call succeed!', url: req.url, data: data })
  }
  catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});
/************************************
 * HTTP post method for insert comment object *
 *************************************/

app.post(path + '/post-comment', async function(req, res) {

  // if (userIdPresent) {
  //   req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  // }
  req.body.id = uuidv4();
  req.body.created_at = new Date().toISOString();
  let putItemParams = {
    TableName: 'comments',
    Item: marshall(req.body)
  }
  // return res.send(putItemParams);
  try {
    let data = await ddbDocClient.send(new PutItemCommand(putItemParams));
    res.json({ success: 'post call succeed!', url: req.url, data: data })
  }
  catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});
/************************************
 * HTTP get method for dashboard counts *
 *************************************/

app.get(path + '/get-dashb-count', async function(req, res) {

  const scanParams = {
    TableName: 'blogs-dev',
    Select: 'COUNT',
  };
  const scanComParams = {
    TableName: 'companies-dev',
    Select: 'COUNT',
  };
  const scanContParams = {
    TableName: 'contactus',
    Select: 'COUNT',
  };
  try {
    let blogs = await ddbDocClient.send(new ScanCommand(scanParams));
    let companies = await ddbDocClient.send(new ScanCommand(scanComParams));
    let contactus = await ddbDocClient.send(new ScanCommand(scanContParams));
    
    res.json({blogs: blogs.Count, companies:companies.Count, contactus: contactus.Count })
  }
  catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

/**************************************
 * HTTP remove method to delete object *
 ***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, async function(req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }
  else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    }
    catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    }
    catch (err) {
      res.statusCode = 500;
      res.json({ error: 'Wrong column type ' + err });
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }

  try {
    let data = await ddbDocClient.send(new DeleteCommand(removeItemParams));
    res.json({ url: req.url, data: data });
  }
  catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url });
  }
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
