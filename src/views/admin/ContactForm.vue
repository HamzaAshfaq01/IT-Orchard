<template>
    <div class="position-relative">
        <!-- Navigation-->
        <AdminNavbar />
        <div class="content-wrapper">
            <div class="container-fluid">
                <!-- Breadcrumbs-->
                <ol class="breadcrumb mb-5">
                    <li class="breadcrumb-item">
                        <router-link to="/admin">Dashboard</router-link>
                    </li>
                    <li class="breadcrumb-item active">Contact Us</li>
                </ol>
                <div class="mt-0 mb-5">
                    <h2>Contact Us</h2>
                    <div class="divider ml-0" style="width:90px"></div>
                </div>
                <div v-if="loading" class="Adminpage-loader">
                    <atom-spinner :animation-duration="1000" :size="60" :color="'#00AB55'" />
                </div>
                <table id="contactus_table" class="display" style="width:100%" v-if="!loading">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <!-- <th>Website</th> -->
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(inqury, index) in inquires" :key="index">
                            <td>{{ index+1 }}</td>
                            <td>{{inqury.name}}</td>
                            <td>{{inqury.email}}</td>
                            <td>{{inqury.phone}}</td>
                            <td>{{inqury.message}}</td>
                            <!-- <td>{{inqury.website}}</td> -->
                            <td>{{moment(inqury.created_at).format("MMM.DD.YYYY")}}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <!-- <th>Website</th> -->
                            <th>Date</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import {AtomSpinner} from 'epic-spinners';
    import AdminNavbar from "../../components/admin/Layouts/AdminNavbar.vue";
    import AdminFooter from "../../components/admin/Layouts/AdminFooter.vue";
    import moment from 'moment';
    import {
        API
    } from 'aws-amplify';
    export default {
        data() {
            return {
                inquires: [],
                loading: true, // flag to track loading state
            };
        },
        created() {
            this.moment = moment;
            this.getInquires();
        },
        components: {
            AdminNavbar,
            AdminFooter,
            AtomSpinner
        },
        mounted() {
          
        },
        methods: {
            async getInquires() {
                try {
                    const response = await API.get('websiteApi', '/website');
                    this.inquires = response;
                    this.loading = false; 
                    this.$nextTick(() => {
                        $(document).ready(function () {
                            $('#contactus_table').DataTable();
                        });
                    });
                } catch (error) {
                    console.error(error);
                }
            },
        },


    }
</script>
<style>

</style>