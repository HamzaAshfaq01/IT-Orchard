<template>
<div class="container-fluid top-bar p-0">
<div class="container">
  <div class="top-content">
  <div class="top-bar-left-content">
    <div class="call-to-action">
      <a class="contact phone" href="tel:030001234567">
      <img class="phone-icon" src="/src/assets/icons/phone.svg" alt="Phone icon image">
      03001234567</a>
    </div>
    <div class="call-to-action">
      <a class="contact email" href="mailto:info@itorchard.com" target="_blank">
      <img class="email-icon" src="/src/assets/icons/top-mail.svg" alt="Email icon image">
      info@itorchard.com</a>
    </div>
  </div>
  <div class="top-bar-right-content d-flex">
   <div class="search">
    <input class="search-input" type="text" placeholder="Keyword:Web Developmen">
    <button class="search-btn"><img src="/src/assets/icons/Frame.svg" alt=""></button>
   </div>
   <div class="topbar-social-links d-flex">
    <div class="top-twiter">
      <router-link to="">
   <img src="/src/assets/icons/twiter.svg" alt="">
      </router-link>
   </div>
    <div class="top-facebook">
      <a href="https://www.facebook.com/ITOrchard/" target="_blank">
      <img src="/src/assets/icons/facebook.svg" alt="">
      </a>
    </div>
    <div class="top-twiter">
       <router-link to="">
      <img src="/src/assets/icons/insta.svg" alt="">
        </router-link>
    </div>
   </div>
  </div>
</div>
</div>
</div>
</template>

<script>
export default {

}
</script>
