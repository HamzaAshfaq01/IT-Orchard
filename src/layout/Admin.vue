<template>
     <AdminNavbar />
    <main>
        <router-view></router-view>
    </main>
    <AdminFooter />
  </template>
  <script>
  import AdminNavbar from "../components/admin/Layouts/AdminNavbar.vue";
  import AdminFooter from "../components/admin/Layouts/AdminFooter.vue";
  export default {

components: {
  AdminNavbar,
  AdminFooter,

},


}
  </script>