<template>
  <div>
    <section class="inner-section" :style="backgroundImage">
      <div class="container">
        <div class="inner-banner-tite">
          <p class="banner-subtext">{{ subtext }}</p>
          <h5>{{ bannertitle }}</h5>
          <p v-if="bannerdescription" class="banner-description">{{bannerdescription}}</p>
       
          <router-link v-if="bannerbutton" to="/contact" class="get-listed-btn">
            <div>{{bannerbutton}}</div>
            <div><img src="/src/assets/icons/circle.svg" alt="" class="circle-icon-img"><img src="/src/assets/icons/arrow.svg"
                alt="" class="circle-arrow-icon-img"></div>
            </router-link>
        </div>
      </div>
    </section>
  
  </div>
</template>
<script>
  export default {
    props: ["subtext", "bannertitle", "img", "bannerbutton", "bannerdescription"],
    computed: {
      backgroundImage() {
        return `background-image: url("/src/assets/images/${this.img}")`;
      },
    },

  };
</script>

