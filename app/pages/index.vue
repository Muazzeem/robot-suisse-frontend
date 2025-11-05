<template>
    <Header />
    <div v-if="pageData?.currentPage?.body">
        <div v-for="(item, idx) in pageData?.currentPage?.body" :key="'p_idx_' + idx">
            <div>
                <div>
                    <HeroSection v-if="item?.type == 'hero_title'" :data="item?.value" />
                </div>
                <div>
                    <TitleSection v-if="item?.type == 'title'" :data="item?.value" />
                </div>
    
                <div class="container">
                    <WhyChooseSection v-if="item?.type == 'why_chose'" :data="item?.value" />
                </div>
                <div style="background: #f9fafb;">
                    <div class="container">
                        <CategoriesSection v-if="item?.type == 'categories'" :data="item?.value" />
                    </div>
                </div>
                <div class="container">
                    <FeaturedSection v-if="item?.type == 'robots'" :data="item?.value" />
                </div>
                <div>
                    <div class="container">
                        <FaqSection v-if="item?.type == 'faq'" :data="item?.value" />
                    </div>
                </div>
               <div style="background: #f9fafb;">
                    <div class="container">
                        <BlogSection v-if="item?.type == 'blogs'" :data="item?.value" />
                    </div>
                </div>

                <div style="color: white;">
                    <div class="container">
                        <IndustryCallout v-if="item?.type == 'cta'" :data="item?.value" />
                    </div>
                </div>
                <div>
                    <div class="container">
                        <ContactSection v-if="item?.type=='contact'" :data="item?.value" />
                    </div>
                </div>
                <div>
				    <Spacer v-if="item?.type=='spacer'" :data="item?.value" />
			    </div>

                <div class="container">
                    <AIChatAssistant v-if="item?.type=='chat'" :data="item?.value" />
                </div>

                <div>
                    <div class="container">
                        <RobotUseCases v-if="item?.type=='tabs'" :data="item?.value" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const requestURL = useRequestURL();
const commonStore = useCommonPageStore()

const { data: pageData, pending, error } = await useAsyncData('homepage', async () => {
  try {
    const d = await commonStore.fetchPage({ html_path: "/" })
    return { currentPage: d }
  } catch (e) {
    console.error("Error fetching page data:", e)
    throw e
  }
})
const getTitle = computed(() => {
	return pageData?.value?.currentPage?.meta?.seo_title
		? pageData?.value?.currentPage?.meta?.seo_title
		: "";
});

const description = computed(() => {
	return pageData?.value?.currentPage?.meta?.search_description
		? pageData?.value?.currentPage?.meta?.search_description
		: "";
});

const keywords = computed(() => {
	return pageData?.value?.currentPage?.og_keywords
		? pageData?.value?.currentPage?.og_keywords
		: "";
});

const robotsDirective = computed(() => {
	return pageData?.value?.currentPage?.robots_directive
		? pageData?.value?.currentPage?.robots_directive
		: "";
});

const prepareOGImageUrl = computed(() => {
	return pageData?.value?.currentPage?.og_img_original
		? HOST.value + pageData?.value?.currentPage?.og_img_original?.original?.src
		: "";
});

const fullPath = computed(() => {
	return requestURL?.href;
});

useHead({
	title: getTitle?.value,
	meta: [
		{
			name: "robots",
			content: robotsDirective,
		},
		{
			name: "title",
			content: getTitle,
		},
		{
			name: "description",
			content: description,
		},
		{
			name: "Keywords",
			content: keywords,
		},
		{
			hid: "og:Keywords",
			name: "og:Keywords",
			content: keywords,
		},
		{
			hid: "og:title",
			property: "og:title",
			content: getTitle,
		},
		{
			hid: "og:description",
			property: "og:description",
			content: description,
		},
		{
			hid: "og:image",
			property: "og:image",
			content: prepareOGImageUrl,
		},
		{
			hid: "og:url",
			property: "og:url",
			content: fullPath,
		},
		{
			hid: "twitter:title",
			property: "twitter:title",
			content: getTitle,
		},
		{
			hid: "twitter:description",
			property: "twitter:description",
			content: description,
		},
		{
			hid: "twitter:image",
			property: "twitter:image",
			content: prepareOGImageUrl,
		},
		{
			hid: "twitter:url",
			property: "twitter:url",
			content: fullPath,
		},
	],
	link: [
		{
			rel: "canonical",
			href: fullPath,
		},
	]
});

</script>

<style scoped>

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1.25rem;
  }
}

</style>