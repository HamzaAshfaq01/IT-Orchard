<template>
  <div>
    <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
      <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
        <router-link class="nav-link" to="/admin">
          <i class="fa fa-fw fa-dashboard mr-2"></i>
          <span class="nav-link-text">Dashboard</span>
        </router-link>
      </li>
      <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Get Listed Requests">
        <router-link class="nav-link" to="/admin/get-listed">
          <i class="fa fa-book  mr-2" aria-hidden="true"></i>
          <span class="nav-link-text">Get Listed Requests</span>
        </router-link>
      </li>
      <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Contact Us">
        <router-link class="nav-link" to="/admin/contact-us">
          <i class="fa fa-address-book mr-2" aria-hidden="true"></i>
          <span class="nav-link-text">Contact Us</span>
        </router-link>
      </li>
      <!-- <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
        <router-link class="nav-link" to="/admin/get-listing">
          <i class="fa fa-fw fa-list mr-2"></i>
          <span class="nav-link-text">Get Listed</span>
        </router-link>
      </li> -->
      <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Company Ads List">
        <router-link class="nav-link" to="/admin/company-listing">
          <i class="fa fa-fw fa-ad mr-2"></i>
          <span class="nav-link-text">Company Ads List</span>
        </router-link>
      </li>
      <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Blog Listing">
        <router-link class="nav-link" to="/admin/blog-listing">
          <i class="fa fa-fw fa-sticky-note mr-2"></i>
          <span class="nav-link-text">Blog Listing</span>
        </router-link>
      </li>
      <!-- <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Example Pages">
          <a class="nav-link nav-link-collapse collapsed w-100" data-toggle="collapse" href="#collapseExamplePages" data-parent="#exampleAccordion">
            <i class="fa fa-fw fa-file mr-2"></i>
            <span class="nav-link-text">Blogs</span>
          </a>
          <ul class="sidenav-second-level collapse" id="collapseExamplePages">
            <li>
              <a href="register.html">All Post</a>
            </li>
            <li>
              <a href="login.html">Add New Post</a>
            </li>
          </ul>
        </li> -->
      <!-- <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Menu Levels">
          <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMulti" data-parent="#exampleAccordion">
            <i class="fa fa-fw fa-sitemap"></i>
            <span class="nav-link-text">Menu Levels</span>
          </a>
          <ul class="sidenav-second-level collapse" id="collapseMulti">
            <li>
              <a href="#">Second Level Item</a>
            </li>
            <li>
              <a href="#">Second Level Item</a>
            </li>
            <li>
              <a href="#">Second Level Item</a>
            </li>
            <li>
              <a class="nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMulti2">Third Level</a>
              <ul class="sidenav-third-level collapse" id="collapseMulti2">
                <li>
                  <a href="#">Third Level Item</a>
                </li>
                <li>
                  <a href="#">Third Level Item</a>
                </li>
                <li>
                  <a href="#">Third Level Item</a>
                </li>
              </ul>
            </li>
          </ul>
        </li> -->
      <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Logout">
        <a @click="signOut()" class="nav-link">
          <i class="fa fa-fw fa-link mr-2"></i>
          <span class="nav-link-text">Logout</span>
        </a>
      </li>
    </ul>
    <ul class="navbar-nav sidenav-toggler">
      <li class="nav-item">
        <a class="nav-link text-center" id="sidenavToggler">
          <i class="fa fa-fw fa-angle-left"></i>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { Auth } from 'aws-amplify';
  export default {
    
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          $("#sidenavToggler").click(function (e) {
            e.preventDefault();
            $("body").toggleClass("sidenav-toggled");
            $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
            $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass(
              "show");
          });
        }, 500); // Adjust the timeout value as needed (in milliseconds)
      });
    },
    methods: {
      async signOut(){
          try {
            await Auth.signOut();
            this.$router.push('/')
          } catch (error) {
            console.log('error signing out: ', error);
          }
      }

    },
  }
</script>