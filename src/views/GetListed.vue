<template>
    <div>
        <InnerBannerVue bannertitle="Get Listed" img="get-listed.png" />
        <Breadcrumb :items="breadcrumbItems" class="breadcrumb-blog-detail" />
        <section class="get-comany-form-sect">
            <h2 class="get-company-list-h">Get your company’s name listed
                among the best around the world!</h2>
            <div class="divider"></div>
        </section>
        <section class="getlisted-form">
            <div class="container">
                <p class="get-touch-text">Get in touch and leave the rest to us</p>
                <form @submit.prevent="Contactus()">
                    <div class="form-box">
                        <div class="row form-row">
                            <div class="col-md-6 col-first">
                                <label class="getform-label">Name</label>
                                <input type="text" name="name" placeholder="Example: Jone Smith" v-model="record.name"
                                    class="get-inputform">
                                <span class="error">{{ errors.name }}</span> <!-- Display the name error message -->
                            </div>
                            <div class="col-md-6 col-second">
                                <label class="getform-label">Email</label>
                                <input type="email" name="name" placeholder="Example: info@itorchard.com"
                                    v-model="record.email" class="get-inputform">
                                <span class="error">{{ errors.email }}</span> <!-- Display the email error message -->
                            </div>
                        </div>
                        <div class="row form-row ">
                            <div class="col-md-6 col-first">
                                <label class="getform-label">Phone</label>
                                <input type="tel" name="name" placeholder="Example: +92-123-456-7890"
                                    v-model="record.phone" class="get-inputform">
                                <span class="error">{{ errors.phone }}</span> <!-- Display the phone error message -->
                            </div>
                            <div class="col-md-6 col-second">
                                <label class="getform-label">WEBSITE</label>
                                <input type="url" name="name" placeholder="Enter your website url" class="get-inputform"
                                    v-model="record.website">
                                <span class="error">{{ errors.website }}</span>
                                <!-- Display the website error message -->
                            </div>

                        </div>
                        <div class="row form-row">
                            <div class="col-md-12">
                                <label class="getform-label">Message</label>
                                <textarea id="msg-txt" name="message-text" rows="4" cols="40" class="text-area-form"
                                    v-model="record.message" placeholder="Message"></textarea>
                                <span class="error">{{ errors.message }}</span>
                                <!-- Display the message error message -->
                            </div>
                        </div>
                        <div class="row form-btn-row">
                            <div class="col-md-12">
                                <button class="get-listed-form-btn" aria-current="page">
                                    <div>Submit now</div>
                                    <div>
                                        <img src="/src/assets/icons/circle.svg" alt="" class="circle-icon-img">
                                        <img src="/src/assets/icons/arrow.svg" alt="" class="circle-arrow-icon-img">
                                    </div>
                                </button>
                                <p class="mt-2 mb-0 text-success"> {{ submitMessage }}</p>
                                <!-- Display the submit message -->
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>
<script lang="ts">
    import {
        computed,
        reactive
    } from 'vue';
    import {
        useHead
    } from '@vueuse/head';
    import Breadcrumb from '../components/Breadcrumb.vue';
    import InnerBannerVue from "../components/InnerBanner.vue";
    import {
        API
    } from 'aws-amplify';
    import awsconfig from '../aws-exports';
    API.configure(awsconfig);
    export default {
        setup() {
            const siteData = reactive({
                title: 'Get Listed - IT ORCHARD',
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
            Breadcrumb
        },
        data() {
            return {
                breadcrumbItems: [{
                        label: 'Home',
                        url: '/'
                    },
                    {
                        label: 'Get Listed',
                        url: '/get-listed'
                    },
                ],
                record: {
                    name: '',
                    email: '',
                    website: '',
                    phone: '',
                    message: '',
                    requestType: 'getListed'
                },
                errors: {
                    name: '',
                    email: '',
                    website: '',
                    phone: '',
                    message: '',
                },
                submitMessage: '' // Variable to track the submit message
            };
        },
        methods: {
            validateForm() {
                this.errors = {}; // Clear previous error messages

                // Perform form validation
                let isValid = true;

                if (!this.record.name) {
                    this.errors.name = 'Name is required';
                    isValid = false;
                }

                if (!this.record.email) {
                    this.errors.email = 'Email is required';
                    isValid = false;
                }
                if (!this.record.website) {
                    this.errors.website = 'Website is required';
                    isValid = false;
                }
                if (!this.record.phone) {
                    this.errors.phone = 'Phone is required';
                    isValid = false;
                }
                if (!this.record.message) {
                    this.errors.message = 'Message is required';
                    isValid = false;
                }

                return isValid;
            },
            async Contactus() {
                if (!this.validateForm()) {
                    return;
                }

                try {
                    const requestInfo = {
                        body: this.record,
                    }
                    const response = await API.post('websiteApi', '/website', requestInfo);

                    this.record = {
                        name: '',
                        email: '',
                        website: '',
                        phone: '',
                        message: ''
                    };
                    this.submitMessage = 'Message sent successfully!'; // Set success message
                    // Hide success message after 3 seconds (3000 milliseconds)
                    setTimeout(() => {
                        this.submitMessage = '';
                    }, 2000);
                } catch (error) {
                    console.error(error);
                    this.submitMessage = 'Error sending message. Please try again.'; // Set error message
                }
            },
        },
    };
</script>

<style scoped>
    .getlisted-form {
        background-image: url(/src/assets/images/Union.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding: 176px 0px 160px;
        margin-top: -200px;
    }

    .get-comany-form-sect {
        padding: 104px 0px;
    }

    .get-company-list-h {
        font-family: 'Public Sans';
        font-style: normal;
        font-weight: 700;
        font-size: 48px;
        line-height: 56px;
        text-align: center;
        color: #212B36;
        max-width: 762px;
        margin: auto;
    }

    .get-company-list-h {
        margin-bottom: 16px;
    }

    .get-touch-text {
        font-family: 'Public Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 36px;
        color: #212B36;
        text-align: center;
    }

    .form-box {
        background: #FFFFFF;
        border-radius: 30px;
        filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
        padding: 40px;
        max-width: 1000px;
        margin: auto;
        width: 100%;
    }

    .get-inputform {
        display: block;
        width: 100%;
        height: calc(1.5em + 0.75rem + 2px);
        padding: 8px 10px;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background: #F4F6F8;
        background-clip: padding-box;
        border: 1px solid #F4F6F8;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .getform-label {
        font-family: 'Public Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 18px;
        color: #212B36;
        margin-bottom: 16px;
    }

    .form-row {
        margin-bottom: 16px;

    }

    .form-row .col-second {
        padding-left: 40px;
    }

    .form-row .col-first {
        padding-right: 40px;
    }

    .form-btn-row {
        margin-top: 45px;
    }

    @media only screen and (max-width:768px) {
        .form-row .col-second {
            padding: 0px;
        }

        .form-row .col-first {
            padding: 0px;
            margin-bottom: 14px;
        }

        .form-box {
            padding: 24px;
        }

        .getform-label {
            font-size: 14px;
            margin-bottom: 8px;
        }

        .form-btn-row {
            margin-top: 40px;
        }

        .getlisted-form {
            background-image: url('/src/assets/images/mbl-Union.png');
            padding: 67px 0px 225px;
            margin-top: -100px;
        }

        .get-touch-text {
            font-size: 18px;
            margin-bottom: 40px;
        }

        .get-company-list-h {
            line-height: 25.85px;
            font-size: 18px;
            padding: 0px 15px;
        }

        .get-comany-form-sect {
            padding: 26px 0px 104px;
        }
    }
</style>