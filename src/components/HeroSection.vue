<template>

    <section class="section-hero">
        <img class="ellipse278-top-img" src="/src/assets/images/Ellipse-278.png">
        <img class="ellipse-279-botom-img" src="/src/assets/images/Ellipse-279.png">
        <div class="container">
            <div class="section-hero-content">
                <div class="row m-0 align-items-center">
                    <img src="/src/assets/images/img.png" class="map-img">
                    <div class="col-md-7 banner-col-7">
                        <img src="/src/assets/images/quote-rank.svg" class="quote-rank">
                        <h1 class="banner-heading"><span class="largest-h">The Largest</span><br><span
                                class="software-h">Software Development</span><br><span class="listing-h">Listing in
                                South Asia</span></h1>
                        <p class="banner-p">We connect you with the top IT development companies
                            in India, Pakistan and Bangladesh</p>
                    </div>
                    <div class="col-md-5 form-col">
                         <div class="form-banner">
                        <p class="text-center get-quote-bulk-text">\ Get a free bulk quotation /</p>
                        <div class="banner-form">

                            <form @submit.prevent="Contactus()">
                                <div class="form-group">
                                    <label class="form-label">Name</label>
                                    <input type="text" class="form-controls"  id="name-input" v-model="record.name" placeholder="Example: Jone Smith">
                                    <span class="error">{{ errors.name }}</span> <!-- Display the name error message -->
        

                                </div>
                                <div class="form-group">
                                    <label class="form-label">Phone</label>
                                    <input type="tel" class="form-controls"  id="phone-imput" v-model="record.phone"
                                        placeholder="Example: +92-123-456-7890">
                                        <span class="error">{{ errors.phone }}</span> <!-- Display the phone error message -->

                                </div>
                                <div class="form-group">
                                    <label  class="form-label">Email</label>
                                    <input type="email" class="form-controls"  id="email-input" v-model="record.email"
                                        placeholder="Example: info@itorchard.com">
                                        <span class="error">{{ errors.email }}</span> <!-- Display the email error message -->
                                </div>

                                <button class="router-link-active router-link-exact-active get-listed-form-btn"
                                    aria-current="page">
                                    <div>Submit</div>
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
        </div>
        <img class="ellipse-botom-img" src="/src/assets/images/Ellipse-281.png">
    </section>
</template>
<script>
import { API } from 'aws-amplify';
import awsconfig from '../aws-exports';

API.configure(awsconfig);

export default {
    data() {
        return {
            record: {
                name: '',
                email: '',
                phone: '',
                message: ''
            },
            errors: {
                name: '',
                email: '',
                phone: ''
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
            
            if (!this.record.phone) {
                this.errors.phone = 'Phone is required';
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

<style>

</style>