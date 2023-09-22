<script setup>
    import { ref } from 'vue';
    const id = ref(0);
    const items = ref([]);
    const companyName = ref('');
    const description = ref('');
    const ratePerHour = ref('');
    const experties = ref('');
    const industryExperience = ref('');
    const noEmployees = ref('');
    const foundedDate = ref('');
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
            items.value = await API.get('companyAPi', '/company', requestInfo);
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
            items.value = await API.get('companyAPi', `/company/${params}`, requestInfo);
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
                body: formData,
            }
            const response = await API.post('companyAPi', '/company', requestInfo);

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
            const response = await API.put('companyAPi', '/company', requestInfo);

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
            const response = await API.post('companyAPi', '/company/delete', requestInfo);

            // Process the response as needed
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    const editBlog = async (item) => {
        try {
            id.value = item.id
            companyName.value = item.companyName
            description.value = item.description
            ratePerHour.value = item.tags
            experties.value = item.experties
            industryExperience.value = item.industryExperience
            noEmployees.value = item.noEmployees
            foundedDate.value = item.foundedDate
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
                <input type="text" name="id" v-if="id!=0" placeholder="id" v-model="id" />
                <input name="companyName" type="text" v-model="companyName" placeholder="companyName" />
                <input name="description" type="text" v-model="description" placeholder="description" />
                <input name="ratePerHour" type="text" v-model="ratePerHour" placeholder="ratePerHour" />
                <input name="location" type="text" v-model="location" placeholder="location" />
                <input name="experties" type="text" v-model="experties" placeholder="experties" />
                <input name="industryExperience" type="text" v-model="industryExperience" placeholder="industryExperience" />
                <input name="noEmployees" type="text" v-model="noEmployees" placeholder="noEmployees" />
                <input name="foundedDate" type="date" v-model="foundedDate" placeholder="foundedDate" />
                <input name="logo" type="file" />
                <a @click.prevent="createBlog()" v-if="id == 0">submit</a>
                <a @click.prevent="updateBlog()" v-else>update</a>
            </form>


        </template>
    </authenticator>
</template>