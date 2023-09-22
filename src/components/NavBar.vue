<template>
  <div class="main-menu">
    <div class="container">
      <nav class="navbar navbar-expand-lg main-nav">
        <router-link class="navbar-brand" to="/">
          <img src="/src/assets/icons/mainlogo.svg" alt="" />
        </router-link>
        <button class="mbl-humbger-menu" type="button" @click="setIsNavOpen(true)">
          <span><img src="/src/assets/icons/mbl-humbger-icon.svg"></span>
        </button>
        <div class="desktop-navbar navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About Us</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/blogs">Blog</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">Contact Us
              </router-link>
            </li>
          </ul>
          <router-link to="/get-listed" class="getlisted-btn">
            <div>Get listed</div>
            <div>
              <img src="/src/assets/icons/circle.svg" alt="" class="circle-icon-img">
              <img src="/src/assets/icons/arrow.svg" alt="" class="circle-arrow-icon-img">
            </div>
          </router-link>
        </div>
      </nav>
    </div>
</div>
  <div :class="{ 'navbar-link-wrapper-mobile': true, 'show': isNavOpen }">
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em"
      xmlns="http://www.w3.org/2000/svg" @click="setIsNavOpen(false)">
      <path
        d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z">
      </path>
    </svg>
    <router-link @click="setIsNavOpen(false)" to="/about">About Us</router-link>
    <router-link @click="setIsNavOpen(false)" to="/blogs">Blog</router-link>
    <router-link @click="setIsNavOpen(false)" to="/contact">Contact Us</router-link>
    <router-link @click="setIsNavOpen(false)" to="/get-listed" class="getlisted-btn">
      <div>Get listed</div>
      <div><img src="/src/assets/icons/circle.svg" alt="" class="circle-icon-img"><img
          src="/src/assets/icons/arrow.svg" alt="" class="circle-arrow-icon-img"></div>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: 'Header',
    data() {
      return {
        isNavOpen: false,
        activeLink: '',
      };
    },
    methods: {
      setIsNavOpen(value) {
        this.isNavOpen = value;
      },
      setActiveLink(link) {
        this.activeLink = link;
      }
    }
  };
</script>
<style>
.main-menu{
  background-color: var(--vt-basegrey);
  z-index: 9999;
  position: relative;
}


</style>
