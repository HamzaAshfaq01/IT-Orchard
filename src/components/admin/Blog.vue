<script setup>
    import { ref } from 'vue';
    const id = ref(0);
    const items = ref([]);
    const title = ref('');
    const description = ref('');
    const tags = ref('');
    import {
        Authenticator
    } from "@aws-amplify/ui-vue";
    import "@aws-amplify/ui-vue/styles.css";

    import {
        Amplify,
        API,
        Auth,
    } from 'aws-amplify';
    import awsconfig from '../../aws-exports';

    Amplify.configure(awsconfig);
    API.configure(awsconfig);
    const fetchData = async () => {
        try {
            const jwtToken = await Auth.currentSession().then( session => session.getIdToken().getJwtToken());
            const requestInfo = {
                headers: { Authorization: jwtToken, 
               'Content-Type': 'application/json' },
            }
            items.value = await API.get('blogApi', '/blogs', requestInfo);
        } catch (error) {
            console.error(error);
        }
    }
    const fetchDataByID = async () => {
        try {
            const jwtToken = await Auth.currentSession().then( session => session.getIdToken().getJwtToken());
            const requestInfo = {
                headers: { Authorization: jwtToken, 
               'Content-Type': 'application/json' },
            }
            let params = 'd356cd4d-a547-492c-af88-ba6a4704515c';
            items.value = await API.get('blogApi', `/blogs/${params}`, requestInfo);
        } catch (error) {
            console.error(error);
        }
    }
    const createBlog = async () => {
        try {
            const form = document.getElementById('myForm');
            const formData = new FormData(form);
            const jwtToken = await Auth.currentSession().then(session =>
                session.getIdToken().getJwtToken()
            );
            const requestInfo = {
                headers: { Authorization: jwtToken },
                'Content-Type': 'image/png',
                body: formData,
            }
            const response = await API.post('blogApi', '/blogs', requestInfo);

            // Process the response as needed
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    const updateBlog = async () => {
        try {
            const form = document.getElementById('myForm');
            const formData = new FormData(form);
            const jwtToken = await Auth.currentSession().then(session =>
                session.getIdToken().getJwtToken()
            );
            // console.log(jwtToken, 'jwtToken');
            const requestInfo = {
                headers: { Authorization: jwtToken },
                'Content-Type': 'image/png',
                body: formData,
            }
            const response = await API.put('blogApi', '/blogs', requestInfo);

            // Process the response as needed
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    const deleteBlog = async (id, image) => {
        try {
            const jwtToken = await Auth.currentSession().then(session =>
                session.getIdToken().getJwtToken()
            );
            const requestInfo = {
                headers: { Authorization: jwtToken },
                body: {
                    id: id,
                    image: image
                }
            }
            const response = await API.post('blogApi', '/blogs/delete', requestInfo);

            // Process the response as needed
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    const editBlog = async (item) => {
        try {
            id.value = item.id
            title.value = item.title
            description.value = item.description
            tags.value = item.tags
        } catch (error) {
            console.error(error);
        }
    }
</script>

<template>
    <authenticator>
        <template v-slot="{ user, signOut }">
            <h1>Hello {{ user.username }}!</h1>
            <button @click="signOut">Sign Out</button>
            <button @click="fetchData">Fetch Data</button> <!-- Add this line -->
            <button @click="fetchDataByID">Fetch Data by id</button> <!-- Add this line -->
        <table>
            <tr v-for="item in items" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td> <img :src="item.imageLink" /></td>
                <td @click="editBlog(item)">edit</td>
                <td @click="deleteBlog(item.id, item.image)">delete</td>
            </tr>
        </table>
            <form id="myForm" enctype="multipart/form-data">
                <input type="text" name="id" v-if="id!=0" v-model="id" />
                <input name="title" type="text" v-model="title" />
                <input name="description" type="text" v-model="description" />
                <input name="tags" type="text" v-model="tags" />
                <input name="file" type="file" />
                <a @click.prevent="createBlog()" v-if="id == 0">submit</a>
                <a @click.prevent="updateBlog()" v-else>update</a>
            </form>


        </template>
    </authenticator>
    
</template>