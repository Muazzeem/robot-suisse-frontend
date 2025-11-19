<template>
    <section class="hero" style="padding-top: 4rem;">
        <div class="overlay"></div>
        <div class="content">
            <div class="hero-left">
                <div class="logo">
                    <div class="icon">
                        <i class="fa-solid fa-building"></i>
                    </div>
                    <p class="company-name" v-if="getSettings?.company_name_en">
                        {{ getLocaleField(getSettings, 'company_name', $i18n.locale) }}
                    </p>
                </div>
                <h1>
                    {{ getLocaleField(data, "title", $i18n.locale) }}
                </h1>
                <div style="display: flex; align-items: center; gap: 4px;" class="location">
                    <i class="fa-solid fa-location-dot"></i>
                    <div v-html="getLocaleField(data, 'subtitle', $i18n.locale)"></div>
                </div>
            </div>
            <!-- Right Side: Contact Form -->
            <div class="hero-right">
                <ContactForm :padding="2" />
            </div>
        </div>
    </section>
</template>

<script setup>
const utilityStore = useUtilityStore();
const { getSettings } = storeToRefs(utilityStore);
const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped>
.hero {
    position: relative;
    height: auto;
    background: url('https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=1920') center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    max-width: 1300px;
    position: relative;
    z-index: 2;
    gap: 8rem;
    padding: 6rem 0;
}

/* Left Section */
.hero-left {
    flex: 1;
    color: #fff;
}

.logo {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
}

.icon {
    background: #fff;
    color: #000;
    font-size: 2rem;
    border-radius: 8px;
    margin-right: 0.8rem;
}

.company-name {
    font-size: 1rem;
    opacity: 0.9;
}

.hero-left h1 {
    font-size: 5rem;
    font-weight: 500;
    line-height: 1.1;
    margin-bottom: 1.5rem;
}

.location {
    font-size: 1rem;
    opacity: 0.5;
}

/* Right Section */
.hero-right {
    flex: 1;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

label {
    font-size: 0.9rem;
    color: #333;
    margin-bottom: 0.4rem;
}

input,
select,
textarea {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 0.95rem;
    width: 100%;
}

textarea {
    resize: none;
    height: 100px;
}

.form-row {
    display: flex;
    gap: 1rem;
}

.submit-btn {
    background: #f44336;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
}

.submit-btn:hover {
    background: #d32f2f;
}

/* Responsive */
@media (max-width: 1000px) {
    .content {
        flex-direction: column;
        align-items: stretch;
    }

    .hero-right {
        width: 100%;
    }
    .hero-left {
        text-align: center;
    }

    .hero-left h1 {
        font-size: 3rem;
    }
    .content {
        gap: 2rem;
        padding: 6rem 0;
    }

}
@media (max-width: 1025px) {
    .content{
        gap: 2rem !important;
    }
}
</style>
