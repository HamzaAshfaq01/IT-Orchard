<template>
    <div>

        <Breadcrumb :items="breadcrumbItems" class="breadcrumb-blog-detail" />
        <section class="blog-detail-sec">
            <div v-if="loading" class="Adminpage-loader">
                <atom-spinner :animation-duration="1000" :size="120" :color="'#00AB55'" />
            </div>
            <div class="container" v-if="!loading">
                <div class="row">
                    <div class="col-md-12">
                        <div class="blog-header">
                            <h1 class="blog-detail-title">{{blog.title}}</h1>
                            <div class="divider"></div>
                        </div>
                        <div class="blog-meta-info">
                            <ul class="blog-meta">
                                <li class="blog-author"><img src="/src/assets/icons/author.svg">Admin</li>
                                <li class="blog-date"><img
                                        src="/src/assets/icons/date.svg">{{ moment(blog.created_at).format("MMM.DD.YYYY") }}
                                </li>
                            </ul>
                            <div class="company-deal-tag-name">
                                <div v-for="(tag, index) in blog.tags.split(',')" :key="index">{{tag}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="blog-detail-section">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="blog-detail-thumbnail">
                                <img :src="blog.imageLink" class="blog-deail-img">
                            </div>
                            <div class="mbl-blog-title">
                                <h2>{{blog.title}}</h2>
                            </div>
                            <div class="bolg-detail-description">
                                <p>
                                    {{ blog.description }}
                                </p>
                            </div>
                            <div class="comment-section">
                                <h3 class="comment-h">Comment</h3>
                                <div class="autor-bio" v-for="(comment, index) in comments" :key="index">
                                    <div class="autor-imag">
                                        <img src="/src/assets/images/author-image.png">
                                    </div>
                                    <div class="author-bio-info">
                                        <p>{{comment.comment}}</p>
                                    </div>

                                </div>
                                <!-- <div class="reply-button">
                                    <a href="#" class="reply-btn">
                                        <div>Reply</div>
                                        <div>
                                            <img src="/src/assets/icons/circle.svg" alt="" class="circle-icon-img">
                                            <img src="/src/assets/icons/arrow.svg" alt="" class="circle-arrow-icon-img">
                                        </div>
                                    </a>
                                </div> -->
                            </div>
                            <div class="reply-comment-form-section">
                                <h3 class="reply-h">Leave A Reply</h3>
                                <div class="form-comment">
                                    <form @submit.prevent="postComment()">
                                        <textarea id="msg-txt" name="message-text" rows="6" cols="40"
                                            v-model="comment.comment" class="comment-form"
                                            placeholder="Your comment"></textarea>
                                        <span class="error">{{ errors.comment }}</span>
                                        <!-- Display the email error message -->
                                        <div class="form-input-field-group">
                                            <div class="w-100">
                                                <input type="text" class="form-control-input" v-model="comment.name"
                                                    placeholder="Your Name">
                                                <span class="error">{{ errors.name }}</span>
                                                <!-- Display the email error message -->
                                            </div>
                                            <div class="w-100">
                                                <input type="text" class="form-control-input" v-model="comment.email"
                                                    placeholder="Your Email">
                                                <span class="error">{{ errors.email }}</span>
                                                <!-- Display the email error message -->
                                            </div>
                                            <div class="w-100">
                                                <input type="text" class="form-control-input" v-model="comment.website"
                                                    placeholder="Website">
                                                <span class="error">{{ errors.website }}</span>
                                                <!-- Display the email error message -->
                                            </div>
                                        </div>
                                        <div class="check-div">
                                            <input type="checkbox" class="form-control-check" id="checkboxcomment">
                                            <label class="check-p" for="checkboxcomment">Save my name, email, and
                                                website
                                                in
                                                this browser of the next
                                                time I comments.
                                            </label>
                                        </div>
                                        <div class="reply-button">
                                            <button class="reply-btn">
                                                <div>Submit</div>
                                                <div><img src="/src/assets/icons/circle.svg" alt=""
                                                        class="circle-icon-img"><img src="/src/assets/icons/arrow.svg"
                                                        alt="" class="circle-arrow-icon-img">
                                                </div>
                                            </button>
                                            <p class="mt-2 mb-0 text-success"> {{ submitMessage }}</p>
                                            <!-- Display the submit message -->
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 right-col-3">
                            <div class="blog-rightsidebar">
                                <div class="search">
                                    <input @input="searchKeyword()" class="search-input-filter" type="text">
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
                                    <div v-if="this.blogs.length > 0">
                                    <div class="recent-post" v-for="blog in randomBlogs" :key="blog.id">
                                        <router-link :to="'/blog-detail/'+blog.id">
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
                                    <h2 v-else class="">No Post Found</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <section class="newsletter-section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="newletter-h">Sign Up For Our Newsletter</h2>
                        <div class="newsletter-div">
                            <input class="newsletter-field" type="email" placeholder="Email">
                            <button class="search-btn newsletter-btn">
                                <div>Send</div>
                                <div>
                                    <img src="/src/assets/icons/circle.svg" alt="" class="circle-icon-img">
                                    <img src="/src/assets/icons/arrow.svg" alt="" class="circle-arrow-icon-img">
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>

<script lang="ts">
    import {
        AtomSpinner
    } from 'epic-spinners';
    import Breadcrumb from '../../components/Breadcrumb.vue';
    import moment from 'moment';
    import {
        API
    } from 'aws-amplify';
    import awsconfig from '../../aws-exports';
    API.configure(awsconfig);
    export default {
        props: ["bannertitle", "bannerbutton"],
        components: {
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
                        label: 'Blogs Detail',
                        url: '/blog-detail'
                    },
                ],
                blog: {},
                blogs: [],
                comments: [],
                keyword: '',
                comment: {
                    name: '',
                    email: '',
                    website: '',
                    comment: '',
                    postId: this.$route.params.id
                },
                errors: {
                    comment: '',
                    name: '',
                    email: '',
                    website: '',

                },
                randomBlogs: [],
                loading: true, // flag to track loading state
                submitMessage: '', // Variable to track the submit message
                isLoading: false,
            };

        },
        watch: {
            '$route.path': function (val, oldVal) {
                this.getBlogDetail();
            },
        },
        created() {
            this.moment = moment;
            this.getBlogDetail();
            this.getBlogs()
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
            async getBlogDetail() {
                try {
                    const response = await API.get('websiteApi',
                        `/website/get-blog-details/${this.$route.params.id}`);
                    this.blog = response.blog
                    this.comments = response.comments
                    this.loading = false;
                } catch (error) {
                    console.error(error);
                }
            },
            async searchKeyword() {
                try {
                    if (this.keyword != '') {
                        const response = await API.get('websiteApi', `/website/search/${this.keyword}`);
                        this.randomBlogs = response.blog
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
                    this.randomBlogs = response.blog

                } catch (error) {
                    console.error(error);
                }
            },
            validateForm() {
                this.errors = {}; // Clear previous error messages

                // Perform form validation
                let isValid = true;

                if (!this.comment.comment) {
                    this.errors.comment = 'Comment is required';
                    isValid = false;
                }

                if (!this.comment.name) {
                    this.errors.name = 'Name is required';
                    isValid = false;
                }

                if (!this.comment.email) {
                    this.errors.email = 'Email is required';
                    isValid = false;
                }
                if (!this.comment.website) {
                    this.errors.website = 'Website is required';
                    isValid = false;
                }
                return isValid;
            },

            async postComment() {
                if (!this.validateForm()) {
                    return;
                }
                try {
                    const requestInfo = {
                        body: this.comment,
                    }
                    const response = await API.post('websiteApi', '/website/post-comment', requestInfo);
                    this.getBlogDetail();
                    this.comment = {
                        comment: '',
                        name: '',
                        email: '',
                        website: '',

                        postId: this.$route.params.id
                    };
                    this.submitMessage = 'Comment sent successfully!'; // Set success message
                    // Hide success message after 3 seconds (3000 milliseconds)
                    setTimeout(() => {
                        this.submitMessage = '';
                    }, 2000);
                } catch (error) {
                    console.error(error);
                    this.submitMessage = 'Error sending comment. Please try again.'; // Set error message
                }
            },
        },
    };
</script>