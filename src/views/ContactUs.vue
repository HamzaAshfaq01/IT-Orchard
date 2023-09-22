<template>
    <div>
        <InnerBannerVue bannertitle=" Contact us" img="contactusbg.png" />
        <Breadcrumb :items="breadcrumbItems" class="breadcrumb-blog-detail" />
        <section class="section-contact-us-assist">
            <div class="container">
                <div class="contact-sections-title text-center">
                    <p>CONTACT US, WE WILL ASSIST YOU</p>
                    <hr class="underline-green" />
                </div>
                <p class="contact-us-desc mbl-contact">
                    Our company is constantly seeking to enhance our services and we
                    welcome any input or proposals from you. We encourage you to
                    share your suggestions or ideas with us by using the “Contact
                    Us” page.
                </p>
                <div class="assist-you-content">
                    <div class="row contactpage-row">
                        <div class="col-md-6">
                            <p class="contact-us-desc desptop-contact">
                                Our company is constantly seeking to enhance our services and we
                                welcome any input or proposals from you. We encourage you to
                                share your suggestions or ideas with us by using the “Contact
                                Us” page.
                            </p>
                            <div class="information-content">
                                <div class="col-md-6 p-0">
                                    <div class="files-sent-img">
                                        <img src="/src/assets/images/Files.png" alt="" width="100%" />
                                    </div>
                                </div>
                                <div class="col-md-7 p-0">
                                    <div class="files-sent-contact-info">
                                        <ul style="list-style: none">
                                            <li class="contact-us-list">
                                                <img class="contact-phone-img" src="/src/assets/images/phon.png"
                                                    alt="" />+92 2545 654 566
                                            </li>
                                            <li class="contact-us-list">
                                                <img class="contact-mail-img" src="/src/assets/icons/mail.svg"
                                                    alt="" />mailto:info@itorchard.com
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="contact-us-form">
                                <form @submit.prevent="Contactus()">
                                    <div class="form-group">
                                        <input type="text" class="form-control contact-us-input" id="exampleInputname"
                                         v-model="record.name" placeholder="Name">
                                            <span class="error">{{ errors.name }}</span> <!-- Display the name error message -->
                                    </div>
                                    <div class="form-group">
                                        <input type="number" class="form-control contact-us-input"
                                            v-model="record.phone" id="exampleInputPhone" placeholder="Phone">
                                            <span class="error">{{ errors.phone }}</span> <!-- Display the phone error message -->
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control contact-us-input" v-model="record.email"
                                         id="exampleInputEmail1" aria-describedby="emailHelp"
                                            placeholder="Email">
                                            <span class="error">{{ errors.email }}</span> <!-- Display the email error message -->
                                    </div>
                                    <div class="form-group">
                                        <textarea name="" id="" rows="3" class="w-100 message-textarea"
                                            v-model="record.message" placeholder="Message"></textarea>
                                            <span class="error">{{ errors.message }}</span> <!-- Display the message error message -->
                                    </div>
                                    <button class="contactform-btn " aria-current="page">
                                        <div>Send</div>
                                        <div>
                                            <img src="/src/assets/icons/circle.svg" alt="" class="circle-icon-img">
                                            <img src="/src/assets/icons/arrow.svg" alt="" class="circle-arrow-icon-img">
                                        </div>
                                    </button>
                                    <p class="mt-2 mb-0 text-success"> {{ submitMessage }}</p> <!-- Display the submit message -->
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section-faqs">
            <div class="container">
                <div class="contact-sections-title faqs-title text-center">
                    <p>We’re Here To All Your Questions</p>
                    <hr class="underline-green" />
                </div>
                <div class="faqs-desc text-center">
                    <p>Our team is dedicated to answering any and all questions you may have.No question is too big or
                        small for
                        us to tackle. We’re here to help with all of your inquiries.</p>
                </div>



                <div class="faqs-accordian">

                    <button class="btn accordian-btn" type="button" data-toggle="collapse" data-target="#stream"
                        aria-expanded="false" aria-controls="stream">
                        Stream-Oriented Analytics
                    </button>

                    <div class="collapse show" id="stream">
                        <div class="card card-body faqs-card">
                            <img class="faq-arrow" src="/src/assets/images/faqarrow.png" alt="icon image">
                            <p> Find out what behavior and trends are pointing to new prospects for your company. </p>
                        </div>
                    </div>
                    <button class="btn accordian-btn" type="button" data-toggle="collapse" data-target="#stepwise"
                        aria-expanded="false" aria-controls="stepwise">
                        Stepwise Guidance
                    </button>
                    <div class="collapse show" id="stepwise">
                        <div class="card card-body faqs-card">
                            <img class="faq-arrow" src="/src/assets/images/faqarrow.png" alt="icon image">
                            <p> Find out what behavior and trends are pointing to new prospects for your company. </p>
                        </div>
                    </div>
                    <button class="btn accordian-btn" type="button" data-toggle="collapse" data-target="#shortlisted"
                        aria-expanded="false" aria-controls="shortlisted">
                        Shortlisted Companies
                    </button>
                    <div class="collapse show" id="shortlisted">
                        <div class="card card-body faqs-card">
                            <img class="faq-arrow" src="/src/assets/images/faqarrow.png" alt="icon image">
                            <p> Find out what behavior and trends are pointing to new prospects for your company. </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
        <img src="/src/assets/images/Contact-Ellipse-278.png" class="green-contact-ellipse">
        <img src="/src/assets/images/Contact-Ellipse-279.png" class="yellow-contact-ellipse">
        <section class="getlisted-quote-secion">
            <p class="getlisted-quote-p">Thank You For Choosing Our WebsiteAs
                Your Go-To Resource For IT Company Rankings
                We Look Forward To Hearing From You Soon</p>
            <router-link to="/get-listed" class="get-listed-btn">
                <div>Get Listed</div>
                <div><img src="/src/assets/icons/circle.svg" alt="" class="circle-icon-img">
                    <img src="/src/assets/icons/arrow.svg" alt="" class="circle-arrow-icon-img">
                </div>
            </router-link>
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
                title: 'Contact Us - IT ORCHARD',
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
                        label: 'Contact us',
                        url: '/contact-us'
                    },
                ],
                record: {
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    requestType: 'normal'
                },
                errors: {
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
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

                if (!this.record.phone) {
                    this.errors.phone = 'Phone is required';
                    isValid = false;
                }

                if (!this.record.email) {
                    this.errors.email = 'Email is required';
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
                        phone: ''
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
    .faqs-accordian {
        max-width: 900px;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 15px;

    }

    .section-contact-us-assist {
        padding: 104px 0px 104px 0px;
        background: linear-gradient(180deg, rgba(244, 246, 248, 0) 0%, #f4f6f8 100%);

    }

    .contact-sections-title {
        margin-bottom: 90px;
    }

    .contact-sections-title p {
        font-family: 'Public Sans';
        font-style: normal;
        font-weight: 700;
        font-size: 48px;
        line-height: 56px;
        text-align: center;
        color: #212B36;
    }

    .underline-green {
        border-bottom: 6px solid #00ab55;
        width: 150px;
        margin: 0px auto;
    }

    .contact-us-desc {
        font-family: "Public Sans";
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 150%;
        text-align: justify;
        color: #212b36;
    }

    .information-content {
        background: #f8f9fb;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .contact-phone-img {
        height: 31px;
        width: 31px;
        margin-right: 15px;
    }

    .contact-mail-img {
        height: 44px;
        width: 44px;
        margin-right: 15px;
    }

    .contact-us-list {
        font-family: 'Public Sans';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 100%;
        color: #00ab55;
        margin-bottom: 30px;
    }

    .contact-us-form {
        background: #ffffff;
        border-radius: 30px;
        padding: 40px;
        filter: drop-shadow(0px 9px 20px rgba(0, 0, 0, 0.25));
        margin: 0px 15px;
    }

    .contact-us-input {
        padding: 8px 0px 12px 8px;
        border-radius: 0px !important;
        background-color: #F4F6F8 !important;
        border: none !important;
    }

    .message-textarea {
        padding: 8px 0px 12px 8px;
        border: none !important;
        background-color: #F4F6F8 !important;

    }

    .get-listed-form-btn {
        background: #F4F6F8;
        font-size: 18px;
        font-weight: 400;
        color: var(--vt-text);
        height: 50px;
        width: 100%;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        padding: 16px 8px;
    }

    .get-listed-form-btn:hover {
        background-color: #00AB55;
        color: #fff;
    }


    /* SECTION FAQS CSS  */
    .section-faqs {
        position: relative;
        padding: 104px 0px;
    }

    .faqs-desc {
        width: 100%;
        max-width: 950px;
        margin: auto;
    }

    .faqs-desc p {
        margin: 80px 0px;
        font-family: 'Public Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 36px;
        text-align: justify;
        color: #212B36;
    }

    .accordian-btn {
        display: flex;
        height: 53px;
        padding: 16px 40px 16px 40px;
        background: #F4F6F8;
        border-radius: 30px;
        color: #00AB55;
        font-family: 'Public Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 21px;
        width: 100% !important;

    }

    .accordian-btn:hover {
        color: #00AB55;
    }

    .btn.accordian-btn:focus,
    .btn.accordian-btn.focus {
        outline: 0;
        box-shadow: none;
    }

    .faqs-card {
        flex-direction: row;
        border: none;
        padding: 16px 40px;
        align-items: center;
    }

    .faqs-card p {
        margin-bottom: 0px;
    }

    .faq-arrow {
        height: 23.83px;
        width: 23.83px;
        margin-right: 25px;
    }

    .getlisted-quote-secion {
        background: linear-gradient(132.54deg, #31B8B2 -1.18%, #00AB55 114.29%);
        padding: 40px 0px 48px
    }

    .getlisted-quote-p {
        font-family: 'Public Sans';
        font-style: normal;
        font-weight: 700;
        font-size: 48px;
        line-height: 56px;
        text-align: center;
        color: #fff;
        max-width: 1056px;
        margin: 0px auto 48px;

    }

    .green-contact-ellipse {
        position: absolute;
        right: 0;
        bottom: 30px;
    }

    .yellow-contact-ellipse {
        position: absolute;
        right: 0;
        bottom: -20px;
    }

    .desptop-contact {
        display: block;
    }

    .mbl-contact {
        display: none;
    }

    .mbl-contact {
        margin-bottom: 64px;
    }

    @media only screen and (max-width: 120px) and (min-width: 769px) {
        .contact-us-list {
            font-size: 16px;
        }
    }

    @media only screen and (max-width:768px) {
        .contactpage-row {
            flex-direction: column-reverse;
        }

        .contact-us-form {
            margin-bottom: 50px;
            margin-left: 0px;
            margin-right: 0px;
        }

        .faqs-card {
            padding: 10px 5px;
        }

        .faqs-desc p {
            margin: 56px 0px 70px 0px;
        }

        .section-faqs {
            padding: 80px 0px;
        }

        .desptop-contact {
            display: none;
        }

        .mbl-contact {
            display: block;
        }

        .information-content {
            flex-direction: column-reverse;
        }

        .contact-us-list {
            text-align: center;
            font-size: 18px;
        }

        .contact-mail-img {
            height: 34px;
            width: 34px;
            margin-right: 15px;
        }

        .files-sent-img {
            text-align: center;
        }

        .files-sent-img img {
            width: 200px;
        }

        .contact-sections-title {
            max-width: 230px;
            margin: 0px auto 56px auto;
        }

        .section-contact-us-assist {
            padding: 57px 0px 104px 0px;
        }

        .contact-sections-title p {
            font-size: 22px;
            line-height: 25.85px;
        }

        .underline-green {
            width: 80px;
        }

        .contact-us-desc {
            font-size: 18px;
            line-height: 27px;
        }

        .contact-us-desc {
            flex-direction: column-reverse;
        }

        .getlisted-quote-p {
            font-size: 22px;
            line-height: 29px;
            max-width: 300px;
        }

    }
</style>