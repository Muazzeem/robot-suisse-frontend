<template>
	<Header />
	<div v-if="data?.currentPage?.body">
		<div v-for="(item, idx) in data?.currentPage?.body" :key="'p_idx_' + idx">
			<div>
				<PageHeader v-if="item?.type == 'page_header'" :data="item?.value" />
			</div>
			<div>
				<ProfileHero v-if="item?.type == 'hero'" :data="item?.value" />
			</div>
			<div>
				<TitleSection v-if="item?.type == 'title'" :data="item?.value" />
			</div>
			<div style="color: white;">
				<div class="container">
					<IndustryCallout v-if="item?.type == 'cta'" :data="item?.value" />
				</div>
			</div>
			<div style="background-color: #FAFAFA;">
				<div class="container">
					<ProfileServiceCard v-if="item?.type == 'service_card'" :data="item?.value" />
				</div>
			</div>
			<div class="container">
				<Team v-if="item?.type == 'team'" :data="item?.value" />
			</div>
			<div class="container">
				<WhatDefinesUs v-if="item?.type == 'banner_video'" :data="item?.value" />
			</div>
			<div class="container">
				<Cards v-if="item?.type == 'cards'" :data="item?.value" />
			</div>
			<div>
				<Spacer v-if="item?.type == 'spacer'" :data="item?.value" />
			</div>
			<div class="container">
				<QuoteCard v-if="item?.type == 'quote'" :data="item?.value" />
			</div>
			<div class="container">
				<StatsCard v-if="item?.type == 'stats'" :data="item?.value" />
			</div>
			<div>
				<AboutHowItWorks v-if="item?.type == 'how_it_works'" :data="item?.value" />
			</div>
			<div class="container">
				<Richtext v-if="item?.type == 'richtext'" :data="item?.value" />
			</div>
			<div class="container">
				<ContactInfo v-if="item?.type == 'contact'" :data="item?.value" />
			</div>
			<div class="container">
				<ProfileContact v-if="item?.type == 'profile_contact'" :data="item?.value" />
			</div>
			<div class="container">
				<ContactSection v-if="item?.type == 'contact_form'" :data="item?.value" />
			</div>
			<div class="container">
				<BlogList v-if="item?.type == 'blogs'" :data="item?.value" />
			</div>
			<div style="background: #f9fafb;">
				<div class="container">
					<BlogSection v-if="item?.type == 'blog'" :data="item?.value" />
				</div>
			</div>
			<div class="container">
				<Robot v-if="item?.type == 'robots'" :data="item?.value" />
			</div>
			<div class="container">
				<Companies v-if="item?.type == 'companies'" :data="item?.value" />
			</div>
		</div>
	</div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const requestURL = useRequestURL();
const commonStore = useCommonPageStore();
const route = useRoute();

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

		return { currentPage };
	}
);

watch(() => route.fullPath, () => refresh());

const getTitle = computed(() => {
	return data?.value?.currentPage?.meta?.seo_title
		? data?.value?.currentPage?.meta?.seo_title
		: "";
});

const description = computed(() => {
	return data?.value?.currentPage?.meta?.search_description
		? data?.value?.currentPage?.meta?.search_description
		: "";
});

const keywords = computed(() => {
	return data?.value?.currentPage?.og_keywords
		? data?.value?.currentPage?.og_keywords
		: "";
});

const robotsDirective = computed(() => {
	return data?.value?.currentPage?.robots_directive
		? data?.value?.currentPage?.robots_directive
		: "";
});

const prepareOGImageUrl = computed(() => {
	return data?.value?.currentPage?.og_img_original
		? HOST.value + data?.value?.currentPage?.og_img_original?.original?.src
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
