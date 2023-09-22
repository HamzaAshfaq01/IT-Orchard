<template>
  <div>
    <HeroSection />
    <div class="company-h">
      <h2>Top ranking software companies in India,
        Pakistan and Bangladesh</h2>
      <div class="divider"></div>
    </div>
    <UsingHandComputer />
    <div class="company-h">
      <h2>Top IT companies 1-100</h2>
      <div class="divider"></div>
    </div>
    <CompanyListItem :companies="companies" @data-emitted="onPageReceived" :loading="loading" />
    <RecommendedIT :recommendedCompanies="recommendedCompanies" />

  </div>
</template>
<script>
import { computed, reactive } from 'vue';
import { useHead } from '@vueuse/head';
import HeroSection from '../components/HeroSection.vue'
import RecommendedIT from "../components/RecommendedIT.vue";
import CompanyListItem from "../components/CompanyListItem.vue";
import UsingHandComputer from "../components/UsingHandComputer.vue";
import { API } from 'aws-amplify';
import awsconfig from '../aws-exports';
API.configure(awsconfig);
export default {
  setup() {
    const siteData = reactive({
      title: 'Home - IT ORCHARD',
      description: 'The Largest Software Development Listing in South Asia We connect you with the top IT development companies in India, Pakistan and Bangladesh Get a free bulk quotation / Top ranking software companies in India, Pakistan and Bangladesh Platform to find top IT companies Find trusted companies evaluated by experts Search by category Save your time',
    })
    useHead({
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [{
        name: 'description',
        content: computed(() => siteData.description),
      },],

    })
  },
  data() {
    return {
      page: 1,
      loading:false,
      companies: [],
      recommendedCompanies: [],
    }
  },
  components: {
    CompanyListItem,
    UsingHandComputer,
    HeroSection,
    RecommendedIT,
  },
  created() {
    this.getCompanies()
  },
  methods: {
    onPageReceived(pageNO) {
      this.page = pageNO;
    },
    async getCompanies() {
      this.loading = true
      try {
        const queryParameters = {
          page: this.page,
        };
        const response = await API.get('websiteApi', '/website/get-companies', {
          queryStringParameters: queryParameters,
        });
        this.companies = response.companies.sort((companyA, companyB) => parseInt(companyA.id) - parseInt(companyB.id))
        this.recommendedCompanies = response.recommendedCompanies
        this.loading = false
      } catch (error) {
        console.error(error);
        this.loading = false
      }
    },
  },
  watch: {
    page(newData, oldData) {
      if (newData != oldData) {
        this.getCompanies()
      }
    }
  }
}
</script>