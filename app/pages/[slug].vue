<template>
    <Header />
    <div v-if="data?.currentPage?.body">
        <div v-for="(item, idx) in data?.currentPage?.body" :key="'p_idx_' + idx">
			<div>
				<PageHeader v-if="item?.type == 'page_header'" :data="item?.value" />
			</div>
            <div>
                <TitleSection v-if="item?.type == 'title'" :data="item?.value" />
            </div>
            <div style="color: white;">
                <div class="container">
                    <IndustryCallout v-if="item?.type == 'cta'" :data="item?.value" />
                </div>
            </div>
            <div class="container">
            	<Team v-if="item?.type == 'team'" :data="item?.value" />
            </div>
            <div class="container">
                <WhatDefinesUs v-if="item?.type=='banner_video'" :data="item?.value" />
            </div>
			<div class="container">
				<Cards v-if="item?.type=='cards'" :data="item?.value" />
			</div>
			<div>
				<Spacer v-if="item?.type=='spacer'" :data="item?.value" />
			</div>
			<div class="container">
				<QuoteCard v-if="item?.type=='quote'" :data="item?.value" />
			</div>
			<div class="container">
				<StatsCard v-if="item?.type=='stats'" :data="item?.value" />
			</div>
			<div class="container">
				<AboutHowItWorks v-if="item?.type=='working_process'" :data="item?.value" />
			</div>
			<div class="container">
				<Richtext v-if="item?.type=='richtext'" :data="item?.value" />
			</div>
			<div class="container">
				<ContactInfo v-if="item?.type=='contact'" :data="item?.value" />
			</div>
			<div class="container">
				<ContactSection v-if="item?.type=='contact_form'" :data="item?.value" />
			</div>
			<div class="container">
				<BlogList v-if="item?.type=='blogs'" :data="item?.value" />	
			</div>
			<div class="container">
				<Robot v-if="item?.type=='robots'" :data="item?.value" />
			</div>
        </div>
    </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const commonStore = useCommonPageStore();
const route = useRoute();

const { data, error } = await useAsyncData("pageData3", async () => {
	let currentPage = null;

	await nuxtApp.runWithContext(async () => {
		await commonStore
			.fetchPage({ html_path: route.path })
			.then((d) => {
				currentPage = d;
			})
			.catch((e) => {
				console.log(e);
			});
	});

	return {
		currentPage,
	};
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
