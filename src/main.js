import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import  {createHead}  from '@vueuse/head'
const head = createHead()
import Shimmer from 'vue3-shimmer'
import {
    Amplify,
    API,
} from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
API.configure(awsconfig);

const app = createApp(App)
app.use(head)
app.use(Shimmer)
app.use(router)

app.mount('#app')
