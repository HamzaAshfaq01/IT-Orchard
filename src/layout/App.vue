<template>
    <header class="header "  id="header">
     <TopBar />
  <NavBar />
</header>
    <main>
        <router-view></router-view>
    </main>
    <Footer />
  </template>
  <script>
  
 import NavBar from '../components/NavBar.vue'
  import TopBar from '../components/TopBar.vue';
  import Footer from '../components/Footer.vue'
  export default {

components: {
    NavBar,
    TopBar,
    Footer,

},
mounted(){
  var navbar = document.getElementById("header");
var lastScrollTop = 0;

window.addEventListener("scroll", function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.classList.remove("visible");
  } else {
    // Scrolling up
    navbar.classList.add("visible");
  }
  
  lastScrollTop = scrollTop;
});
}


}
  </script>
  <style>
      main {
          min-height: 100vh;
      }
      /* .header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;

  transition: opacity 0.5s;
  z-index: 9999;
}

.header.visible {

  position: relative;
} */


  </style>
  