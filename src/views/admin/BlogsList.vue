<template>
        <div class="position-relative">
            <!-- Navigation-->
            <AdminNavbar />
            <div class="content-wrapper">
                <div class="container-fluid">
                    <!-- Breadcrumbs-->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/admin">Dashboard</router-link>
                        </li>
                        <li class="breadcrumb-item active">Blog Listing</li>
                    </ol>
                    <div class="mt-0 mb-1">
                    <h2>Blog Listing</h2>
                    <div class="divider ml-0" style="width:90px"></div>
                </div>
                    <div v-if="screen == 'form'">
                        <form @submit.prevent="submitBlog()" class="form-style-9" id="myForm"
                            enctype="multipart/form-data">
                            <ul>
                                <li>
                                    <label class="custom-input-label">Post Title</label>  
                                    <input type="hidden" name="id" v-if="id!=0" v-model="record.id" />
                                    <input type="text" name="title" class="field-style field-split align-left" required
                                        v-model="record.title" placeholder="Post Title" />
                                   
                                </li>
                                <li>
                                    <label class="custom-input-label">Post Tags</label>  <sup>Add tags by sperate comma</sup>  
                                    <input type="text" name="tags" class="field-style field-split align-right" required
                                        v-model="record.tags" placeholder="Post Tags" />

                                </li>
                                <li>
                                    <label class="custom-input-label">Post Thumbnail</label>    
                                    <img :src="record.imageLink" v-if="record.id != 0" style="width: 50px" />
                                    <input type="file" name="file" v-if="record.id == 0" required class="field-style field-full align-none" placeholder="Post Image" />
                                    <input type="file" name="file" v-else class="field-style field-full align-none" placeholder="Post Image" />
                                </li>
                                <li>
                                    <label class="custom-input-label">Post Description</label>  
                                    <textarea name="description" class="field-style" v-model="record.description" required placeholder="Post Description"></textarea>
                                </li>
                                <li>
                                    <input type="submit" value="Submit" v-if="record.id == 0" />
                                    <input type="submit" value="Update" v-else />
                                    <input @click.prevent="clearForm()" type="submit" value="Cancel" class="ml-3"/>
                                </li>
                            </ul>
                        </form>
                    </div>
                    <div v-if="screen == 'list'">
                        <button @click="screen = 'form'" class="create-btn">Create Blog</button>
                        <!-- loader -->
                        <div v-if="loading" class="Adminpage-loader">
                            <atom-spinner :animation-duration="1000" :size="60" :color="'#00AB55'" />
                        </div>

                        <table id="getlisted_table" class="display" style="width:100%" v-if="!loading">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Tags</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(blog, index) in blogs" :key="index">
                                    <td>{{index+1}}</td>
                                    <td><img :src="blog.imageLink" style="width: 50px;" /> </td>
                                    <td>{{blog.title}}</td>
                                    <td>{{blog.tags}}</td>
                                    <td>{{blog.description}}</td>
                                    <td>{{moment(blog.created_at).format("MMM.DD.YYYY")}}</td>
                                    <td>
                                        <div class="d-flex">
                                        <a @click="editBlog(blog)" class="edit-icon mr-3">
                                            <i class="fas fa-edit "></i>
                                        </a> 
                                        <a @click="deleteBlog(blog.id, blog.image)" class="trash-icon">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Tags</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <!-- /.container-fluid-->
                <!-- /.content-wrapper-->
                <AdminFooter />

            </div>
        </div>
</template>

<script>
import {AtomSpinner} from 'epic-spinners';
    import moment from 'moment';
    import {
    API,
    Auth
    } from 'aws-amplify';
    export default {
        data() {
            return {
                record: {
                    id: 0,
                    title: '',
                    tags: '',
                    description: '',
                    image: '',
                    imageLink: ''
                },
                blogs: [],
                screen: 'list',
                loading: true, // flag to track loading state
            }
        },
       
        mounted() {
            // this.$nextTick(() => {
            //     $(document).ready(function () {
            //         $('#getlisted_table').DataTable();
            //     });
            // });
        },
        created() {
            this.moment = moment;
            this.fetchData();
        },
        components: {
            AtomSpinner
        },
        methods: {
            async submitBlog() {
                try {
                    const form = document.getElementById('myForm');
                    const formData = new FormData(form);
                    const jwtToken = await Auth.currentSession().then(session =>
                        session.getIdToken().getJwtToken()
                    );
                    const requestInfo = {
                        headers: {
                            Authorization: jwtToken
                        },
                        body: formData,
                        'Content-Type': 'image/png',
                    }
                    if (this.record.id == 0) {
                        const response = await API.post('blogApi', '/blogs', requestInfo);
                    } else {
                        const response = await API.put('blogApi', '/blogs', requestInfo);
                    }
                    this.clearForm();
                } catch (error) {
                    console.error(error);
                }
            },
            async deleteBlog(id, image) {
                try {
                    const jwtToken = await Auth.currentSession().then(session =>
                        session.getIdToken().getJwtToken()
                    );
                    const requestInfo = {
                        headers: {
                            Authorization: jwtToken
                        },
                        body: {
                            id: id,
                            image: image
                        }
                    }
                    const response = await API.post('blogApi', '/blogs/delete', requestInfo);
                    this.clearForm();
                } catch (error) {
                    console.error(error);
                }
            },
            editBlog(item) {
                try {
                    this.record.id = item.id
                    this.record.title = item.title
                    this.record.description = item.description
                    this.record.tags = item.tags
                    this.record.imageLink = item.imageLink
                    this.screen = 'form';
                } catch (error) {
                    console.error(error);
                }
            },
            async fetchData() {
                try {
                    const jwtToken = await Auth.currentSession().then(session => session.getIdToken().getJwtToken());
                    const requestInfo = {
                        headers: {
                            Authorization: jwtToken,
                            'Content-Type': 'application/json'
                        },
                    }
                    const response = await API.get('blogApi', '/blogs', requestInfo);
                    this.blogs = response
                    this.loading = false;
                    this.$nextTick(() => {
                        $(document).ready(function () {
                            $('#getlisted_table').DataTable();
                        });
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            clearForm(){
                this.record = {
                    id: 0,
                    title: '',
                    tags: '',
                    description: '',
                    image: '',
                },
                this.fetchData();
                this.screen = 'list';
            },
        },

    }
</script>