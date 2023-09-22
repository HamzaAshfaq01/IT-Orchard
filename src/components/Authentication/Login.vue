<!-- <script setup lang="ts">
    import {
        Authenticator,
        useAuthenticator 
    } from "@aws-amplify/ui-vue";
    import "@aws-amplify/ui-vue/styles.css";
    import { Amplify, Auth } from 'aws-amplify';
    import awsconfig from '../../aws-exports';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    Auth.currentAuthenticatedUser().then((user)=>{
        console.log(user);        
    });

    
    // Amplify.configure(awsconfig);
    // onMounted(() => {
    //     const router = useRouter();
    //     Auth.confirmSignIn(user, confirmationCode)
    //         .then(() => {
    //             // Confirmation successful, redirect to the home page
    //             router.push('/home');
    //         })
    //         .catch(error => {
    //             // Handle any error that occurred during confirmation
    //             console.error('Error confirming sign-in:', error);
    //         });
    // });
</script>

<template>
    <authenticator :hide-sign-up="true">
        <template v-slot="{ user, signOut }">
            <h1>Hello {{ user.username }}!</h1>
            <button @click="signOut">Sign Out</button>
        </template>
    </authenticator>
</template> -->
<script setup >
    import { Auth } from 'aws-amplify';
    import {
        ref
    } from 'vue';
    const email = ref('');
    const password = ref('');
    const user = ref(null);
    const login = async  () => {
        try {
            const authenticatedUser = await Auth.signIn(email.value, password.value);
            // this.$router.push('/admin')
            window.location.href = '/admin';
        } catch (error) {
            console.log('error signing in', error);
            alert(error.UserNotFoundException)
        }
        console.log('Perform login with credentials:', email.value, password.value);
    };

</script>
    
<template v-slot="{ user, signOut }">
   
    <div>
        <section class="login-section">
            <div class="container">
                <div class="admin-loginform">
                    <h2 class="sign-in-h">Sign In</h2>
                    <div class="loginform-box">
                        <form @submit.prevent="login()">
                            <div class="form-group">
                                <label for="username" class="signup-label">Username</label>
                                <input type="email" v-model="email" placeholder="Email" required class="form-controls">
                            </div>
                            <div class="form-group">
                                <label for="password" class="signup-label">Password</label>
                                <input type="password" v-model="password" required placeholder="Please Enter Your Password" class="form-controls"/>
                            </div>
                            <div class="text-right p-t-8 p-b-31">
                                <a href="#" class="forget-link">
                                    Forgot password?
                                </a>
                            </div>
                            <button class="signin-form-btn">
                                <div>Login</div>
                                <div>
                                    <img src="/src/assets/icons/circle.svg" alt="" class="circle-icon-img">
                                    <img src="/src/assets/icons/arrow.svg" alt="" class="circle-arrow-icon-img">
                                </div>
                            </button>
                        </form>
                    
                    </div>
                </div>
            </div>
        </section>
    </div>
   
</template>
<style>
.signup-label{
    font-family: 'Public Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 18px;
    color: #212B36;
}
.signup-link{
    margin-top: 20px;
    text-align: center;
    text-decoration: underline;
}
    .login-section {
        padding: 100px 0px;
    }

    .sign-in-h {
        font-family: 'Public Sans';
        font-style: normal;
        font-weight: 700;
        font-size: 48px;
        line-height: 56px;
        text-align: center;
        color: #212B36;
        margin-bottom: 30px;
    }

    .admin-loginform {
        max-width: 500px;
        margin: auto;
    }

    .loginform-box {
        background: var(--white);
        border-radius: 30px;
        width: 100%;
        filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));
        padding: 24px;
    }

    .signin-form-btn {
        background: var(--Base_grey);
        font-size: 18px;
        font-weight: 500;
        color: var(--vt-text);
        height: 50px;
        width: 100%;
        max-width: 100%;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px auto 0px;
        padding: 16px 8px;
        cursor: pointer;
        border:none;
    }

    .signin-form-btn:hover {
        background-color: #00AB55;
        color: var(--white);
    }

    .signin-form-btn div {
        margin-left: auto;
    }

    .signin-form-btn:hover>div {

        color: var(--white);
    }

    .signin-form-btn .circle-icon-img {
        display: inline-block;
        width: 38px;
        height: 38px;
    }

    .signin-form-btn:hover .circle-icon-img {
        display: none;
    }

    .signin-form-btn .circle-arrow-icon-img {
        display: none;
    }

    .signin-form-btn:hover .circle-arrow-icon-img {
        display: inline-block;
        width: 38px;
        height: 38px;
    }
    .forget-link, .signup-anchor{
        color:#212B36;  
    }
    .forget-link:hover, .signup-anchor:hover{
        color: #00AB55;
    }
</style>