<template>
    <div>
        <section class="company-section" id="company-sec">
            <div class="custom-container">
                <div class="row-gutter">
                    <div class="col-md-12">
                        <div class="top-item-company-list">
                            <a :class="{
                                'company-pag-list': currentPage === 1,
                                'active': currentPage === 1
                            }" @click="sendDataToParent(1)">Top 1-20</a> /
                            <a :class="{
                                'company-pag-list': currentPage === 2,
                                'active': currentPage === 2
                            }" @click="sendDataToParent(2)">21-40</a> /
                            <a :class="{
                                'company-pag-list': currentPage === 3,
                                'active': currentPage === 3
                            }" @click="sendDataToParent(3)">41-60</a> /
                            <a :class="{
                                'company-pag-list': currentPage === 4,
                                'active': currentPage === 4
                            }" @click="sendDataToParent(4)">61-80</a> /
                            <a :class="{
                                'company-pag-list': currentPage === 5,
                                'active': currentPage === 5
                            }" @click="sendDataToParent(5)">81-100</a>
                        </div>
                        <card-shimmer v-if="companies.length == 0 || loading" width="1000px" />

                        <section v-for="(company, index) in companies" :key="index">
                            <section v-if="!loading" class="company-list-box">
                                <h3 v-if="companies.length == 0">No Data Found</h3>
                                <div class="company-info-above">
                                    <div class="itorchard-rank-item">
                                        <div class="itorchard-rank-no"><span>{{ company.id }}</span></div>
                                    </div>
                                    <div class="itorchard-review">
                                        <div class="itorchard-review-img">
                                            <img src="/src/assets/images/itorchard-review-img.png">
                                        </div>
                                        <div class="itorchard-review-p">
                                            <p>[Quick release with limited express response] Please leave the production of
                                                quick delivery to us.
                                                In
                                                the BtoB industry, he is good at designing usability (search ability and UI)
                                                and clarity.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="company-name-box">
                                                <div class="company-name-img">
                                                    <img :src="company.imageLink" class="company-logo">
                                                </div>
                                                <div class="company-name-h2">
                                                    <h2> {{ company.companyName }} </h2>
                                                    <p class="company-location">({{ company.location }})</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">

                                            <div class="company-deal-tag">
                                                <h2>This Company Deals With</h2>
                                            </div>
                                            <div class="company-deal-tag-name">
                                                <div v-for="(tag, index) in company.experties.split(',').slice(0, 4)"
                                                    :key="index">
                                                    {{ tag }}</div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="company-industry-exp-tag">
                                                <h2>Industry Experience</h2>
                                            </div>
                                            <div class="company-industry-exp-tag-name">
                                                <div v-for="(tag, index) in company.industryExperience.split(',').slice(0, 4)"
                                                    :key="index">{{ tag }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="company-item-detail">
                                    <div class="company-info-below pc">
                                        <div class="company-meta-info">
                                            <div class="company-hour"><img src="/src/assets/icons/time.svg"><span>{{
                                                company.ratePerHour }}</span>
                                            </div>
                                            <div class="company-employee"><img
                                                    src="/src/assets/icons/Employees.svg"><span>{{
                                                        company.noEmployees }}</span>
                                            </div>
                                            <div class="company-year"><img src="/src/assets/icons/since.svg"><span>{{
                                                moment(company.foundedDate).format("YYYY") }}</span>
                                            </div>
                                            <div class="company-address"><img src="/src/assets/icons/place.svg  "><span>{{
                                                company.location }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="company-detail">
                                        <div class="company-thumbnail-info">
                                            <!-- Swiper -->
                                            <div class="swiper companyslider-swiper">
                                                <div class="swiper-wrapper">
                                                    <div class="swiper-slide"
                                                        v-for="(gallery, index) in company.galleryLink" :key="index">
                                                        <img :src="gallery" class="company-slide-img">
                                                    </div>
                                                </div>
                                                <div class="swiper-button-next company-next-arrow">
                                                    <img src="/src/assets/icons/nav-prev.svg" alt="Previous" />
                                                </div>
                                                <div class="swiper-button-prev company-prev-arrow">
                                                    <img src="/src/assets/icons/nav-next.svg" alt="next" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="company-info-below sp">
                                            <div class="company-meta-info">
                                                <div class="company-hour"><img src="/src/assets/icons/time.svg"><span>{{
                                                    company.ratePerHour }}</span>
                                                </div>
                                                <div class="company-employee"><img
                                                        src="/src/assets/icons/Employees.svg"><span>{{ company.noEmployees
                                                        }}</span>
                                                </div>
                                                <div class="company-year"><img src="/src/assets/icons/since.svg"><span>{{
                                                    moment(company.foundedDate).format("YYYY") }}</span>
                                                </div>
                                                <div class="company-address"><img
                                                        src="/src/assets/icons/place.svg  "><span>{{
                                                            company.location }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="company-description">
                                            <p>{{ company.description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <GetConnected v-if="shouldShowBanner(index) && !loading" />
                        </section>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
// import  CardShimmer  from 'shimmer'
import {
    CardShimmer
} from 'vue3-shimmer';
import GetConnected from '../components/GetConnected.vue';
import moment from 'moment';
export default {
    props: ['companies', 'loading'],
    data() {
        return {
            iterationsToShowBanner: 5,
            start: 0,
            end: 20,
            count: 1,
            currentPage: 1,
            pages: [
                { id: 1, label: 'Top 1-20' },
                { id: 2, label: '21-40' },
                { id: 3, label: '41-60' },
                { id: 4, label: '61-80' },
                { id: 5, label: '81-100' },
            ],
        }
    },
    mounted() {
        if (this.companies) {
            setTimeout(() => {
                this.$nextTick(() => {
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
    },
    components: {
        GetConnected,
        CardShimmer,
        // ParagraphShimmer,
        // FreeStyleShimmer,
    },
    created() {
        this.moment = moment;
    },
    methods: {
        sendDataToParent(pageNO) {
            this.currentPage = pageNO;
            this.$emit('data-emitted', pageNO);
        },
        shouldShowBanner(index) {
            return (index + 1) % this.iterationsToShowBanner === 0 && index > 0;
        },
        changeNum(start, end, count) {
            this.start = start;
            this.end = end;
            this.count = count;
        }
    },
}
</script>
<style>
#company-sec .shimmer-card {
    width: 100%;
    height: 600px;
}

#company-sec .card-image {
    height: 400px;
}

.company-section {
    margin: 40px 0px 45px;
}

.top-item-company-list {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
}

.top-item-company-list {
    font-family: 'Public Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #637381;
}

.top-item-company-list a {
    cursor: pointer;
    color: inherit
}

.company-pag-list.active {

    color: #212B36;
}

.divider {
    width: 150px;
    height: 6px;
    margin: auto;
    background-color: #00AB55;
}

.custom-container {
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    position: relative;
}

.company-list-box {
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    position: relative;
    margin-bottom: 47px;

}

.company-info-above {
    padding: 32px 25px;
}

.itorchard-rank-item {
    position: absolute;
    top: -5px;
}

.itorchard-rank-no {
    background-image: url('/src/assets/images/it-orchard-rank-bg.png');
    padding: 10px 30px 24px 30px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.itorchard-rank-no span {
    font-family: 'Public Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
}

.itorchard-review {
    display: flex;
    padding: 0px 0px 0px 110px;
    position: relative;
    margin-bottom: 50px;
}

.itorchard-review-p {
    margin-left: 15px;
    align-items: center;
    display: flex;
}

.itorchard-review-p p {
    margin-bottom: 0px;
    font-family: 'Public Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;

}

.company-name-box {
    display: flex;
}

.company-name-img {
    height: 90px;
    width: 90px;
    min-width: 90px;
    display: inline-block;
    background-color: #D9D9D9;
    border-radius: 30px;
    position: relative;
}

.company-name-img .company-logo {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    border-radius: 30px;
}

.company-name-img .company-verify {
    width: 61px;
    height: 61px;
    position: absolute;
    right: -15px;
    bottom: -30px;
    object-fit: contain;
}

.company-name-h2 {
    margin-left: 24px;
}

.company-name-h2 h2 {
    margin-bottom: 16px;
    color: #212B36;
    font-family: "Public Sans", Sans-serif;
    font-size: 24px;
    font-weight: 700;

}

.company-name-h2 p {
    font-family: 'Public Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
}

.company-deal-tag h2 {
    font-family: 'Public Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 16px;
}

.company-industry-exp-tag h2 {
    font-family: 'Public Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 16px;
}

.company-deal-tag-name div {
    border: 1px solid #00AB55;
    border-radius: 100px;
    margin-right: 8px;
    font-family: 'Public Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    padding: 8px 15px;
    display: inline-block;
    margin-bottom: 8px;
}

.company-industry-exp-tag-name div {
    border: 1px solid #F4F6F8;
    background-color: #F4F6F8;
    border-radius: 100px;
    margin-right: 8px;
    font-family: 'Public Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    padding: 8px 15px;
    display: inline-block;
    margin-bottom: 8px;
}

.company-meta-info {
    display: flex;
    flex-wrap: wrap;
}

.company-item-detail {
    border-top: 1px solid #C4C4C4;
    padding: 35px 24px 24px 32px;
}

.company-hour {
    margin-right: 13px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
}

.company-hour img {
    margin-right: 5px;
}

.company-employee {
    margin-right: 13px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
}

.company-employee img {
    margin-right: 5px;
}

.company-year {
    margin-right: 13px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
}

.company-year img {
    margin-right: 5px;
}

.company-address {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
}

.company-address img {
    margin-right: 5px;
}

.company-detail {
    padding: 35px 0px 0px;
    display: flex;
}

.company-thumbnail-info {
    width: 35.1%;
    padding: 0px 15px 0px 0px
}

.company-slide-img {
    width: 100%;
    height: 300px;
    border-radius: 30px;
    object-fit: cover;
}

.company-description {
    width: 66%;
    padding: 0px 15px;

}

.companyslider-swiper .company-prev-arrow img {
    width: 32px;
    height: 32px;
}

.companyslider-swiper .company-next-arrow img {
    width: 32px;
    height: 32px;
}

/* .companyslider-swiper .company-next-arrow {
        width: 32px;
        height: 32px;
        font-size: 24px;
        background: #fff;
        border-radius: 100px;
        opacity: 1;
        border: 1px solid #00AB55;
    } */

/* .companyslider-swiper .company-prev-arrow {
        width: 32px;
        height: 32px;
        font-size: 24px;
        background: #fff;
        border-radius: 100px;
        opacity: 1;
        border: 1px solid #00AB55;
    } */

/* .companyslider-swiper .company-prev-arrow:after {
        font-size: 16px;
        font-weight: 700;
    }

    .companyslider-swiper .company-next-arrow:after {
        font-size: 16px;
        font-weight: 700;
    } */

.company-description p {
    font-family: 'Public Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: justify;
    color: #212B36;
    margin-bottom: 0px;
}

.pc {
    display: block;
}

.sp {
    display: none;
}

@media (max-width: 1024px) {
    .custom-container {
        max-width: 1024px;
    }
}

@media (max-width: 767px) {
    .company-name-h2 p {
        font-size: 14px;
    }

    .company-deal-tag h2,
    .company-industry-exp-tag h2 {
        font-family: Public Sans;
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 28px;
        margin-bottom: 16px;
    }

    .company-list-box {
        border-radius: 10px;
    }

    .itorchard-rank-no {
        background-image: url('/src/assets/images/it-orchard-rank-bg-mbl.png');
        padding: 0px 28px 0px 28px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .itorchard-rank-item {
        left: -5px;
        top: 15px;
    }

    .itorchard-rank-no span {
        font-family: 'Public Sans';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 27px;
    }

    .itorchard-review {
        padding: 25px 0px 0px 0px;
    }

    .company-info-above {
        padding: 32px 8px;
        margin-bottom: 20px;
    }

    .company-detail {
        flex-direction: column;
        padding: 0px;
    }

    .company-thumbnail-info {
        width: 100%;
        padding: 0px;
    }

    .company-description {
        width: 100%;
        padding: 0px;
    }

    .company-item-detail {
        padding: 32px 8px;
    }

    .company-slide-img {
        width: 100%;
        height: 261px;
    }

    .company-description {
        margin-top: 24px;
    }

    .pc {
        display: none;
    }

    .sp {
        display: block;
    }

    .divider {
        width: 80px;
    }

    .recommended-slide-content .company-name-img {
        width: 54px;
        height: 54px;
        min-width: 54px;
    }

    .company-name-h2 h2 {
        font-size: 18px;
        margin-bottom: 12px;
    }

    .recommended-slide-content {
        padding: 36px 8px 24px;
    }

    .recommended-slide-content .company-location {
        margin-bottom: 0px;
    }

    .recommended-slide-content .company-name-box {
        font-size: 14px;
    }

    .recommended-slide-content .company-industry-exp-tag-name {
        margin-bottom: 24px;
    }

    .company-name-img .company-verify {
        width: 48px;
        height: 48px;
        right: -18px;
        bottom: -14px;

    }

    .top-item-company-list {
        font-size: 14px;
        gap: 7px;
    }

}
</style>