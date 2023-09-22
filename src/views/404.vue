<template>
    <div>
        <div class="notfound-section">
            <div class="number">404</div>
            <div class="text"><span>page not found</span></div>
            <router-link to="/get-listed" class="not-found-btn">
                <div>Home</div>
                <div><img src="/src/assets/icons/circle.svg" alt="" class="circle-icon-img">
                    <img src="/src/assets/icons/arrow.svg" alt="" class="circle-arrow-icon-img">
                    </div>
                </router-link>
        </div>
    </div>
</template>
<style>
    .not-found-btn {
        background: var(--Base_grey);
        font-size: 18px;
        font-weight: 500;
        color: var(--vt-text);
        height: 50px;
        width: 100%;
        max-width: 280px;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin:30px auto;
        padding: 16px 8px;
        cursor: pointer;
        border: none;
    }

    .not-found-btn:hover {
        background-color: #00AB55;
        color: var(--white);
    }

    .not-found-btn div {
        margin-left: auto;
    }

    .not-found-btn:hover>div {

        color: var(--white);
    }

    .not-found-btn .circle-icon-img {
        display: inline-block;
        width: 38px;
        height: 38px;
    }

    .not-found-btn:hover .circle-icon-img {
        display: none;
    }

    .not-found-btn .circle-arrow-icon-img {
        display: none;
    }

    .not-found-btn:hover .circle-arrow-icon-img {
        display: inline-block;
        width: 38px;
        height: 38px;
    }

    .notfound-section {
        max-width: 700px;
        margin: auto;
        text-align: center;
        height: 100vh;
        justify-content: center;
        display: flex;
        flex-direction: column;
    }

    .number {
        background: #fff;
        position: relative;
        font: 900 30vmin "Consolas";
        letter-spacing: 5vmin;
        text-shadow: 2px -1px 0 #000, 4px -2px 0 #0A0A0A, 6px -3px 0 #0F0F0F, 8px -4px 0 #141414, 10px -5px 0 #1A1A1A, 12px -6px 0 #1F1F1F, 14px -7px 0 #242424, 16px -8px 0 #292929;
    }

    .number::before {
        background-color: #00AB55;
        background-image: radial-gradient(closest-side at 50% 50%, #7ED957 100%, rgba(0, 0, 0, 0)), radial-gradient(closest-side at 50% 50%, #C9E365 100%, rgba(0, 0, 0, 0));
        background-repeat: repeat-x;
        background-size: 40vmin 40vmin;
        background-position: -100vmin 20vmin, 100vmin -25vmin;
        width: 100%;
        height: 100%;
        mix-blend-mode: screen;
        -webkit-animation: moving 10s linear infinite both;
        animation: moving 10s linear infinite both;
        display: block;
        position: absolute;
        content: "";
    }

    @-webkit-keyframes moving {
        to {
            background-position: 100vmin 20vmin, -100vmin -25vmin;
        }
    }

    @keyframes moving {
        to {
            background-position: 100vmin 20vmin, -100vmin -25vmin;
        }
    }

    .text {
        font-family: 'Public Sans', sans-serif;
        text-transform: uppercase;
        font-weight: 700;
    }

    .text span {
        font-size: 60px;
    }
</style>