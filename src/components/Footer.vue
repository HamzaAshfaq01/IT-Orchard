<template>
  <div>
    <button id="scrollUpButton" style="display: block;"><svg class="svg-inline--fa fa-arrow-up" aria-hidden="true"
        focusable="false" data-prefix="fas" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512" data-fa-i2svg="">
        <path fill="currentColor"
          d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z">
        </path>
      </svg></button>
    <section class="main-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-5">
            <img src="/src/assets/icons/mainlogo.svg" class="footer-logo">
          </div>

        </div>
        <div class="row">
          <div class="col-md-4">
            <p class="footer-p">We ensure that all companies listed on our platform meet our high standards for quality
              and customer
              service.</p>
            <div class="footer-social">
              <a href="#"> <img src="/src/assets/icons/footer-twitter.svg"></a>
              <a href="https://www.facebook.com/ITOrchard/" target="_blank">
                <img src="/src/assets/icons/footer-facebook.svg">
              </a>
              <a href="#"> <img src="/src/assets/icons/footer-linkedin.svg"></a>
            </div>
          </div>
          <div class="col-md-8">
            <ul class="footer-menu">
              <li class="footer-nav-li">
                <div class="footer-nav-item">
                  <router-link to="/" class="footer-menu-item"><span>Home</span></router-link> <span
                    class="menu-bar"></span>
                </div>
                <ul class="sub-list">
                  <li> <a :class="{
                                'company-pag-list': currentPage === 1,
                                'active': currentPage === 1
                            }" @click="sendDataToParent(1)" class="footer-submenu-item">Top 1-20</a> </li>
                        <li>    <a :class="{
                                'company-pag-list': currentPage === 2,
                                'active': currentPage === 2
                            }" @click="sendDataToParent(2)" class="footer-submenu-item">Top 21-40</a> </li>
                         <li>   <a :class="{
                                'company-pag-list': currentPage === 3,
                                'active': currentPage === 3
                            }" @click="sendDataToParent(3)" class="footer-submenu-item">Top 41-60</a> </li>
                         <li>  <a :class="{
                                'company-pag-list': currentPage === 4,
                                'active': currentPage === 4
                            }" @click="sendDataToParent(4)" class="footer-submenu-item">Top 61-80</a> </li> 
                         <li>   <a :class="{
                                'company-pag-list': currentPage === 5,
                                'active': currentPage === 5
                            }" @click="sendDataToParent(5)" class="footer-submenu-item">Top 81-100</a> </li>
                </ul>
              </li>

              <li>
                <div class="footer-nav-item">
                  <router-link to="/about" class="footer-menu-item"><span>About</span> </router-link><span
                    class="menu-bar"></span>
                </div>
              </li>
              <li>
                <div class="footer-nav-item">
                  <router-link to="/blogs" class="footer-menu-item"><span>Blog</span> </router-link><span
                    class="menu-bar"></span>
                </div>
              </li>
              <li>
                <div class="footer-nav-item">
                  <router-link to="/contact" class="footer-menu-item"><span>Contact Us</span></router-link> <span
                    class="menu-bar"></span>
                </div>
              </li>
              <li>

                <ul class="other-page-list">
                  <li>
                    <router-link to="/" class="footer-menu-item">Terms&Conditions</router-link>
                  </li>
                  <li>
                    <router-link to="/" class="footer-menu-item">Privacy Policy</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

        </div>
        <div class="copyright">
          <div class="row">
            <div class="col-md-12">
              <p class="copyright-p">©ITORCHARD INC.™, 2021. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
        return {
      
          start: 0,
            end: 20,
            count: 1,
            currentPage: 1,
            pages: [
                { id: 1, label: 'Top 1-20' },
                { id: 2, label: 'Top 21-40' },
                { id: 3, label: 'Top 41-80' },
                { id: 4, label: 'Top 81-100' },
            ],
        }
    },
    methods: {
        sendDataToParent(pageNO) {
            this.currentPage = pageNO;
            this.$emit('data-emitted', pageNO);
        },
        changeNum(start, end, count) {
            this.start = start;
            this.end = end;
            this.count = count;
        }
      
    },
    mounted() {
      const scrollUpButton = document.getElementById('scrollUpButton');

      // scroll event listener to the window
      window.addEventListener('scroll', () => {
        // Check the scroll position
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          // Show the scroll-up button
          scrollUpButton.style.display = 'block';
        } else {
          // Hide the scroll-up button
          scrollUpButton.style.display = 'none';
        }
      });

      // Add a click event listener to the scroll-up button
      scrollUpButton.addEventListener('click', () => {
        // Scroll to the top of the page smoothly
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    },
    
  }
</script>