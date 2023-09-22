<template>
    <div>
        <section class="recommended-sec">
            <div class="container-fluid">
                <div class="row justify-content-end">
                    <div class="col-md-10 col-lg-10 col-xl-10 p-0">
                        <div class="recommended-box">
                            <div class="recommended-h">
                                <h2>Top Recommended IT Companies</h2>
                                <div class="divider"></div>
                            </div>
                            <div class="recommended-content">
                                <div class="recommended-img">
                                    <img src="/src/assets/images/recommended-thumb.png">
                                </div>
                                <div class="recommended-p">
                                    <p> Looking for the best IT companies to help support your business? Look no
                                        further!
                                        Our team has researched and analyzed hundreds of IT companies and compiled a
                                        list of
                                        the top recommended ones based on customer feedback, industry expertise, and
                                        overall
                                        performance. These companies offer a wide range of services, including software
                                        development, IT consulting, cloud computing, cybersecurity, and more. Trust us
                                        to
                                        help you find the right IT partner for your business needs.Choosing the right IT
                                        company is crucial for the success and growth of your business. With so many
                                        options
                                        available, it can be challenging to find a reliable and experienced partner that
                                        can
                                        provide the services you need. That’s why our team has done the research and
                                        compiled a list of the top recommended IT companies to help you make an informed
                                        decision.</p>

                                    <p>These companies have a proven track record of delivering quality services and are
                                        trusted by businesses around the world. Whether you need software development,
                                        IT
                                        consulting, cloud computing, or cybersecurity services, these companies can
                                        provide
                                        the expertise and support you need to succeed in today’s digital world.</p>
                                </div>
                            </div>

                        </div>
                        <div class="slide-list">
                            <div class="swiper recommendedSlider">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="(company, index) in recommendedCompanies"
                                        :key="index">
                                        <div class="recommended-slide-item">
                                            <div class="swiper companyslider-swiper">
                                            <div class="swiper-wrapper">
                                                <div class="swiper-slide"
                                                    v-for="(gallery, index) in company.galleryLink" :key="index">
                                                    <img :src="gallery" class="recommended-slide-img">
                                                </div>
                                            </div>
                                            <div class="swiper-button-next company-next-arrow">
                                                <img src="/src/assets/icons/nav-prev.svg" alt="Previous" />
                                            </div>
                                            <div class="swiper-button-prev company-prev-arrow">
                                                <img src="/src/assets/icons/nav-next.svg" alt="next" />
                                            </div>
                                        </div>
                                            <div class="recommended-slide-content">
                                                <div class="company-name-box">
                                                    <div class="company-name-img">
                                                        <img :src="company.imageLink" class="company-logo">
                                                    </div>
                                                    <div class="company-name-h2">
                                                        <h2> {{company.companyName}} </h2>
                                                        <p class="company-location">({{company.location}})</p>
                                                    </div>
                                                </div>
                                                <div class="company-industry-exp-tag-name">
                                                    <div v-for="(tag, index) in company.experties.split(',').slice(0,2)"
                                                        :key="index">{{tag}}</div>

                                                </div>
                                                <div class="recommended-slide-description">{{company.description}}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="swiper-pagination mbl-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import moment from 'moment';
    export default {
        props: ['recommendedCompanies'],
        data() {
            return {

            }
        },
        created() {
            this.moment = moment;
        },
        mounted() {
            if (this.companies) {
                setTimeout(() => {
                    this.$nextTick( ()=>{
                        var swiper = new Swiper(".companyslider-swiper", {
                            spaceBetween: 30,
                            loop: true,
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            },
                        });
                    });
                }, 5000); // Set the desired delay in milliseconds
            }

            this.$nextTick(() => {
                var swiper = new Swiper(".recommendedSlider", {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    loop: true,

                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                            pagination: {
                                el: ".swiper-pagination",
                            },
                        },
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                            pagination: {
                                el: ".swiper-pagination",
                            },
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                            pagination: {
                                el: ".swiper-pagination",
                            },
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1300: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        1300: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1900: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    },

                });
            })
        },
    }
</script>
<style>
    .recommended-slide-description {
        font-family: 'Public Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        text-align: justify;
        color: #212B36;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }

    .company-name-h2 h2 {
        max-height: 55px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 10px;
    }

    .recommended-slide-content .company-name-box {
        margin-bottom: 16px;
        height: 90px;
    }

    .recommended-slide-content .company-industry-exp-tag-name {
        margin-bottom: 8px;
    }

    .recommended-slide-content .company-name-h2 p {
        height: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 0px;
    }
</style>