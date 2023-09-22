<template>
    <div>
        <InnerBannerVue bannertitle="Blogs" img="blog-bg.png" />
        <Breadcrumb :items="breadcrumbItems" />
        <section class="blogs-sec">
            <div v-if="loading" class="Adminpage-loader">
                <atom-spinner :animation-duration="1000" :size="120" :color="'#00AB55'" />
            </div>
            <div class="container" v-if="!loading">
                <div class="row">

                    <div class="col-md-9">
                        <div v-if="this.blogs.length > 0">
                        <div class="blog-list" v-for="(blog, index) in blogs" :key="index">
                            <h3 v-if="blogs.length==0">No Data Found</h3>
                            <div class="blog-above">
                                <div class="blog-thumbnail">
                                    <img :src="blog.imageLink" style="width: 100%" class="blog-thumb">

                                </div>
                                <div class="blog-content">
                                    <div class="blog-title">
                                        {{blog.title}}
                                    </div>
                                    <p class="blog-description">
                                        {{ blog.description }}
                                    </p>

                                </div>
                            </div>
                            <div class="blog-below">
                                <div class="blog-info">
                                    <ul class="blog-meta">
                                        <li class="blog-author"><img src="/src/assets/icons/author.svg">Admin</li>
                                        <li class="blog-comment"><img src="/src/assets/icons/Comment.svg">Comment</li>
                                        <li class="blog-date"><img
                                                src="/src/assets/icons/date.svg">{{ moment(blog.created_at).format("MMM.DD.YYYY")  }}
                                        </li>
                                    </ul>
                                </div>
                                <div class="meta-tag">
                                    <div class="company-deal-tag-name">
                                        <div v-for="(tag, index) in blog.tags.split(',')" :key="index">{{tag}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row btn-row">
                                <router-link :to="'/blog-detail/'+blog.id"
                                    class="router-link-active router-link-exact-active readmore-btn"
                                    aria-current="page">
                                    <div>Read more</div>
                                    <div>
                                        <img src="/src/assets/icons/circle.svg" alt="" class="circle-icon-img"><img
                                            src="/src/assets/icons/arrow.svg" alt="" class="circle-arrow-icon-img">
                                    </div>
                                </router-link>
                            </div>
                        </div>
                         </div>
                         <h2 v-else class="">No Post Found</h2>
                    </div>
                    <div class="col-md-3 right-col-3">
                        <div class="blog-rightsidebar">
                            <div class="search">
                                <input class="search-input-filter" type="text" v-model="keyword"
                                    @input="searchKeyword()">
                                <button class="search-btn"><img src="/src/assets/icons/Frame.svg" alt=""></button>
                            </div>
                            <div class="right-side-box">
                                <div class="right-side-title">
                                    Popular Tags
                                </div>
                                <div class="popular-tag">
                                    <div v-for="(tag, index) in tags" :key="index"><a
                                            @click="searchTags(tag)">{{tag}}</a></div>
                                </div>
                            </div>
                            <div class="right-side-box">
                                <div class="right-side-title">
                                    Top Rated Post
                                </div>
                                <div class="recent-post" v-for="blog in randomBlogs" :key="blog.id">
                                  <router-link :to="'/blog-detail/'+blog.id" >
                                    <div class="post-thumb">
                                        <img :src="blog.imageLink" width="100%" class="post-thumbnail">
                                    </div>
                                    <div class="recent-post-title">
                                        {{blog.title}}
                                    </div>
                                    <div class="recent-post-date">
                                        {{ moment(blog.created_at).format("MMM.DD.YYYY")  }}
                                    </div>
                                </router-link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>

<script>
    import {
        AtomSpinner
    } from 'epic-spinners';
    import {
        computed,
        reactive
    } from 'vue';
    import {
        useHead
    } from '@vueuse/head';
    import Breadcrumb from '../components/Breadcrumb.vue';
    import InnerBannerVue from "../components/InnerBanner.vue";
    import moment from 'moment';
    import {
        API
    } from 'aws-amplify';
    import awsconfig from '../aws-exports';
    API.configure(awsconfig);
    export default {
        setup() {
            const siteData = reactive({
                title: 'Blogs - IT ORCHARD',
                description: 'The Largest Software Development Listing in South Asia We connect you with the top IT development companies in India, Pakistan and Bangladesh Get a free bulk quotation / Top ranking software companies in India, Pakistan and Bangladesh Platform to find top IT companies Find trusted companies evaluated by experts Search by category Save your time',
            })
            useHead({
                // Can be static or computed
                title: computed(() => siteData.title),
                meta: [{
                    name: 'description',
                    content: computed(() => siteData.description),
                }, ],

            })
        },
        props: ["bannertitle", "bannerbutton"],
        components: {
            InnerBannerVue,
            Breadcrumb,
            AtomSpinner
        },

        data() {
            return {
                breadcrumbItems: [{
                        label: 'Home',
                        url: '/'
                    },
                    {
                        label: 'Blogs',
                        url: '/blog'
                    },
                ],
                blogs: [],
                randomBlogs: [],
                tags: [],
                keyword: '',
                loading: true, // flag to track loading state
            };
        },
        created() {
            this.moment = moment;
            this.getBlogs();
        },
        methods: {
            async getBlogs() {
                try {
                    const response = await API.get('websiteApi', '/website/get-blogs');
                    this.blogs = response.blogs;
                    this.randomBlogs = response.randomData;
                    const column = this.blogs.flatMap(item => item.tags.split(',').map(tag => tag.trim()));
                    this.tags = [...new Set(column)];
                    this.loading = false;
                } catch (error) {
                    console.error(error);
                }
            },
            async searchKeyword() {
                try {
                    if (this.keyword != '') {
                        const response = await API.get('websiteApi', `/website/search/${this.keyword}`);
                        this.blogs = response.blog
                    } else {
                        this.getBlogs();
                    }
                } catch (error) {
                    console.error(error);
                }
            },
            async searchTags(tag) {
                try {
                    const response = await API.get('websiteApi', `/website/search-tags/${tag}`);
                    this.blogs = response.blog

                } catch (error) {
                    console.error(error);
                }
            },
        },

    };
</script>