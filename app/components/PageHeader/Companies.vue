<template>
    <section class="page-hero">
        <div class="hero-background"></div>
        <div class="hero-overlay" :style="{
            background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${imageURL}) center/cover`
        }"></div>
        <div class="container">
            <div class="company-header">
                <div class="company-info">
                    <div class="logo-section">
                        <img src="https://howtorobot.com/sites/default/files/association_logos/a3.png" alt="ABB Logo"
                            class="company-logo" />
                        <div class="company-details">
                            <h1 class="company-name">ABB North America</h1>
                            <p class="company-meta">North America · Robot OEM · 20-50 employees</p>

                            <div class="contact-links">
                                <a href="#" class="link-item visit-link">
                                    <i class="fa-solid fa-globe icon"></i>
                                    Visit website
                                </a>
                                <span class="link-item">
                                    <i class="fa-solid fa-phone icon"></i>
                                    (702) 555-0122
                                </span>
                                <span class="link-item">
                                    <i class="fa-solid fa-envelope icon"></i>
                                    jeram.bell@example.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    data: null
})

const config = useRuntimeConfig()
const HOST = computed(() => {
    return config.public.baseURL;
});
const imageURL = computed(() => HOST.value + props.data?.image?.original?.src)
</script>

<style lang="css" scoped>
@import './header.css';

.container{
    margin-top: 0rem;
}


</style>