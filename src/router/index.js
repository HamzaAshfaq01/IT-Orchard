import {
  createRouter,
  createWebHistory
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContactUs from "../views/ContactUs.vue";
import GetListed from "../views/GetListed.vue";
import AdminView from "../views/admin/AdminView.vue";
import NotFound from '../views/404.vue';

import {
  Auth
} from "aws-amplify";

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
  routes: [{
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutUs.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactUs,
    },
    {
      path: "/blogs",
      name: "blogs",
      component: () => import("../views/Blogs.vue"),
    },
    {
      path: "/blog-detail/:id",
      name: "blogDetail",
      component: () => import("../views/blog-detail/BlogDetail.vue"),
    },
    {
      path: "/get-listed",
      name: "getlisted",
      component: GetListed,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/Authentication/Login.vue"),
      beforeEnter: (to, from, next) => {
        Auth.currentAuthenticatedUser()
          .then((user) => {
            if (user) {
              next('/admin')
            } else {
              next('/login')
            }
          }).catch(() => {
            next()
          });
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
      beforeEnter: (to, from, next) => {
        Auth.currentAuthenticatedUser()
          .then((user) => {
            if (user) {
              next()
            } else {
              next('/login')
            }
          }).catch(() => {
            next('/login')
          });
      },
      meta: {
        layout: "admin",
      },
    },
    {
      path: "/admin/contact-us",
      name: "contactus",
      component: () => import("../views/admin/ContactForm.vue"),
      beforeEnter: (to, from, next) => {
        Auth.currentAuthenticatedUser()
          .then((user) => {
            if (user) {
              next()
            } else {
              next('/login')
            }
          }).catch(() => {
            next('/login')
          });
      },
      meta: {
        layout: "admin",
      },
    },
    {
      path: "/admin/get-listed",
      name: "getlisting",
      component: () => import("../views/admin/GetListed.vue"),
      beforeEnter: (to, from, next) => {
        Auth.currentAuthenticatedUser()
          .then((user) => {
            if (user) {
              next()
            } else {
              next('/login')
            }
          }).catch(() => {
            next('/login')
          });
      },
      meta: {
        layout: "admin",
      },
    },
    {
      path: "/admin/company-listing",
      name: "companylisted",
      component: () => import("../views/admin/CompanyList.vue"),
      beforeEnter: (to, from, next) => {
        Auth.currentAuthenticatedUser()
          .then((user) => {
            if (user) {
              next()
            } else {
              next('/login')
            }
          }).catch(() => {
            next('/login')
          });
      },
      meta: {
        layout: "admin",
      },
    },
    {
      path: "/admin/blog-listing",
      name: "bloglisted",
      component: () => import("../views/admin/BlogsList.vue"),
      beforeEnter: (to, from, next) => {
        Auth.currentAuthenticatedUser()
          .then((user) => {
            if (user) {
              next()
            } else {
              next('/login')
            }
          }).catch(() => {
            next('/login')
          });
      },
      meta: {
        // requiresAuth: true,
        layout: "admin",
      },
    },

    {
      path: "/admin/blog",
      name: "blog",
      component: () => import("../components/admin/Blog.vue"),
      beforeEnter: (to, from, next) => {
        Auth.currentAuthenticatedUser()
          .then((user) => {
            if (user) {
              next()
            } else {
              next('/login')
            }
          }).catch(() => {
            next('/login')
          });
      },
      meta: {
        layout: "admin",
        // requiresAuth: true,
      },
    },
    {
      path: "/admin/company",
      name: "company",
      component: () => import("../components/admin/Company.vue"),
      beforeEnter: (to, from, next) => {
        Auth.currentAuthenticatedUser()
          .then((user) => {
            if (user) {
              next()
            } else {
              next('/login')
            }
          }).catch(() => {
            next('/login')
          });
      },
      meta: {
        layout: "admin",
      },
    },
    {
      path: "/admin/get-listed",
      name: "AdminGetListedRequest",
      component: () => import("../components/admin/GetListedRequest.vue"),
      beforeEnter: (to, from, next) => {
        Auth.currentAuthenticatedUser()
          .then((user) => {
            if (user) {
              next()
            } else {
              next('/login')
            }
          }).catch(() => {
            next('/login')
          });
      },
      meta: {
        layout: "admin",
      },
    },
    // other routes
  {
    path: '/:catchAll(.*)',
    name:404,
    component: NotFound
  }
  ],
});

// router.beforeResolve((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     Auth.currentAuthenticatedUser().then((user) => {
//       // const user = await Auth.currentAuthenticatedUser()
//     console.log(user,'user');
//       next()
//     }).catch(() => {
//       next({
//         path: '/'
//       });
//     });
//   }
//   else{
//     console.log('unautne');
//     next('/blogs')
//     // router.push('/')
//   }
// })


export default router;