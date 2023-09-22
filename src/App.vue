<template>
  <v-app>
    <component v-bind:is="layout"></component>
  </v-app>
</template>
<script>
  import AppLayout from "./layout/App.vue"
  import AdminLayout from "./layout/Admin.vue"

  export default {
    data() {
      return {
        layout: "appLayout"
      }
    },
    components: {
      'appLayout': AppLayout,
      'adminLayout': AdminLayout,
    },
    watch: {
      $route(to) {
        if (to.meta.layout == "admin") {
          this.layout = "adminLayout"
        } else {
          this.layout = "appLayout"
        }
      },
    },
  }
</script>

<!-- <template>
  <TopBar />
  <NavBar />

  <RouterView />

  <Footer />
</template>
<script>
  import {
    RouterLink,
    RouterView
  } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'



</script> -->