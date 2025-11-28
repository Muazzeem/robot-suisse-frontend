<template>
    <div>
        <Header />
        
        <!-- Company Header Section -->
        <template v-for="(item, idx) in data?.currentPage?.body" :key="'header_' + idx">
            <div v-if="item?.type === 'company_header'">
                <section class="page-hero">
                    <div class="hero-background"></div>
                    <div class="hero-overlay" :style="{
                        background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(https://api.robot.marketize.biz/media/images/Robotic-Arm-Manufac.original.jpegquality-80.format-webp.webp) center/cover`
                    }"></div>
                    <div class="container" style="margin-top: 4rem;">
                        <div class="company-header">
                            <div class="company-info">
                                <div class="logo-section">
                                    <img src="https://howtorobot.com/sites/default/files/association_logos/a3.png"
                                        alt="ABB Logo" class="company-logo" />
                                    <div class="company-details">
                                        <h1 class="company-name">
                                            {{ getStremleField(data.currentPage.company_name, $i18n.locale) }}
                                        </h1>
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
            </div>
        </template>

        <!-- Company Profile Section -->
        <div class="company-profile">
            <div class="container">
                <!-- Company Details Section -->
                <template v-for="(item, idx) in data?.currentPage?.body" :key="'content_' + idx">
                    <div v-if="item?.type === 'company_details'" class="main-content">
                        <div class="custom-block" 
                             v-html="getStremleField(item?.value?.description, $i18n.locale)">
                        </div>
                    </div>
                </template>

                <!-- Contacts Section -->
                <template v-for="(item, idx) in data?.currentPage?.body" :key="'contact_' + idx">
                    <section v-if="item?.type === 'contacts'" class="card contact-card">
                        <h2 class="section-title">Contact Persons</h2>
                        <ContactPerson :data="item?.value?.contacts" />
                    </section>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();
const nuxtApp = useNuxtApp();
const requestURL = useRequestURL();
const commonStore = useCommonPageStore();

const slug = computed(() => route.params.slug);

const companyBody = ref(null);

const fetchCompanyData = async () => {
    try {
        const res = await $fetch(PAGE_API_ROOT, {
            method: "GET",
            query: {
                type: "home.CompanyDetailPage",
                slug: slug.value,
            },
        });

        if (res.items?.length) {
            companyBody.value = res.items[0].body;
        }
    } catch (err) {
        console.error("Error fetching company:", err);
    }
};

const { data, refresh } = await useAsyncData(
    () => route.fullPath,
    async () => {
        let currentPage = null;

        await nuxtApp.runWithContext(async () => {
            await commonStore
                .fetchPage({ html_path: route.path })
                .then((d) => {
                    currentPage = d;
                })
                .catch((e) => console.error(e));
        });
        await fetchCompanyData();

        return { currentPage, companyBody: currentPage?.body };
    }
);

const getTitle = computed(() =>
    data?.value?.currentPage?.meta?.seo_title || ""
);

const description = computed(() =>
    data?.value?.currentPage?.meta?.search_description || ""
);

const keywords = computed(() =>
    data?.value?.currentPage?.og_keywords || ""
);

const robotsDirective = computed(() =>
    data?.value?.currentPage?.robots_directive || ""
);

const prepareOGImageUrl = computed(() =>
    data?.value?.currentPage?.og_img_original
        ? HOST.value + data.value.currentPage.og_img_original.original.src
        : ""
);

const fullPath = computed(() => requestURL?.href);

useHead({
    title: getTitle.value,
    meta: [
        { name: "robots", content: robotsDirective },
        { name: "title", content: getTitle },
        { name: "description", content: description },
        { name: "Keywords", content: keywords },

        { hid: "og:Keywords", name: "og:Keywords", content: keywords },
        { hid: "og:title", property: "og:title", content: getTitle },
        { hid: "og:description", property: "og:description", content: description },
        { hid: "og:image", property: "og:image", content: prepareOGImageUrl },
        { hid: "og:url", property: "og:url", content: fullPath },

        { hid: "twitter:title", property: "twitter:title", content: getTitle },
        { hid: "twitter:description", property: "twitter:description", content: description },
        { hid: "twitter:image", property: "twitter:image", content: prepareOGImageUrl },
        { hid: "twitter:url", property: "twitter:url", content: fullPath },
    ],
    link: [{ rel: "canonical", href: fullPath }],
});
</script>

<style scoped>
@import '@/components/PageHeader/header.css';

.company-header {
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    padding: 27px;
    margin-bottom: 2rem;
    border-radius: 12px;
}

.company-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.logo-section {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.company-logo {
    height: 8rem;
}

.company-details {
    display: flex;
    flex-direction: column;
}

.company-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
}

.company-meta {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0.25rem 0 0;
}

.contact-links {
    margin-top: .5rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.link-item {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: #4b5563;
    text-decoration: none;
}

.link-item.visit-link {
    color: #dc2626;
    font-weight: 500;
    text-decoration: underline;
}

.link-item.visit-link:hover {
    color: #b91c1c;
}

.icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.375rem;
}

/* Company Profile Styles */
.company-profile {
    margin-top: 3rem;
    min-height: 100vh;
    padding-bottom: 3rem;
}

.container {
    text-align: left;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

/* Main Content */
.main-content {
    margin-bottom: 2rem;
}

.section-title {
    font-size: 20px;
    font-weight: 500;
    color: #101828;
    margin: 0 0 1rem;
}

:deep(.custom-block) {
    color: #10182899;
    line-height: 27px;
    margin: 0;
    font-size: 17px;
    font-weight: 400;
    text-align: justify;
    letter-spacing: 0.15%;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .company-info {
        flex-direction: column;
        align-items: flex-start;
    }

    .contact-links {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }

    .company-name {
        font-size: 1.25rem;
    }

    .section-title {
        font-size: 1.125rem;
    }
}
</style>