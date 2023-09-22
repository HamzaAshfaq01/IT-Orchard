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
                    <li class="breadcrumb-item active">My Dashboard</li>
                </ol>
                <!-- Icon Cards-->
                <div class="row">
                    <!-- <div class="col-xl-3 col-sm-6 mb-3">
                        <div class="card text-white bg-primary o-hidden h-100">
                            <div class="card-body">
                                <div class="card-body-icon">
                                    <i class="fa fa-fw fa-comments"></i>
                                </div>
                                <div class="mr-5">26 New Messages!</div>
                            </div>
                            <router-link class="card-footer text-white clearfix small z-1" to="/admin/contact-us">
                                <span class="float-left">View Details</span>
                                <span class="float-right">
                                    <i class="fa fa-angle-right"></i>
                                </span>
                            </router-link>
                        </div>
                    </div> -->
                    <div class="col-xl-4 col-sm-6 mb-4">
                        <div class="card text-white bg-warning o-hidden h-100">
                            <div class="card-body">
                                <div class="card-body-icon">
                                    <i class="fa fa-fw fa-list"></i>
                                </div>
                                <div class="mr-5">{{contactus}} Contacuts Lists</div>
                            </div>
                            <router-link class="card-footer text-white clearfix small z-1" to="/admin/get-listed">
                                <span class="float-left">View Details</span>
                                <span class="float-right">
                                    <i class="fa fa-angle-right"></i>
                                </span>
                            </router-link>
                        </div>
                    </div>
                    <div class="col-xl-4 col-sm-6 mb-4">
                        <div class="card text-white bg-success o-hidden h-100">
                            <div class="card-body">
                                <div class="card-body-icon">
                                    <i class="fa fa-fw fa-shopping-cart"></i>
                                </div>
                                <div class="mr-5">{{company}} Company Lists</div>
                            </div>
                            <router-link class="card-footer text-white clearfix small z-1" to="/admin/company-listing">
                                <span class="float-left">View Details</span>
                                <span class="float-right">
                                    <i class="fa fa-angle-right"></i>
                                </span>
                            </router-link>
                        </div>
                    </div>
                    <div class="col-xl-4 col-sm-6 mb-4">
                        <div class="card text-white bg-danger o-hidden h-100">
                            <div class="card-body">
                                <div class="card-body-icon">
                                    <i class="fa fa-fw fa-support"></i>
                                </div>
                                <div class="mr-5">{{blog}} New Posts</div>
                            </div>
                            <router-link class="card-footer text-white clearfix small z-1" to="/admin/blog-listing">
                                <span class="float-left">View Details</span>
                                <span class="float-right">
                                    <i class="fa fa-angle-right"></i>
                                </span>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="text-center dashboard-h">
        <h2>Welcome to IT ORCHARD<br>Admin Dashboard</h2>
    </div> 
            </div>
         
        </div>
    </div>
  
  
</template>

<script>
    import {
        API
    } from 'aws-amplify';
    import awsconfig from '../../aws-exports';
    API.configure(awsconfig);
    export default {
        data() {
            return {
                blog: 0,
                company: 0,
                contactus: 0,
            };
        },
        created() {
            this.getDashCount();
        },
        methods: {
            async getDashCount() {
                try {
                    const response = await API.get('websiteApi', '/website/get-dashb-count');
                    this.blog = response.blogs
                    this.company = response.companies
                    this.contactus = response.contactus
                } catch (error) {
                    console.error(error);
                }
            },
        },
    };
</script>