<template>
    <Navbar />
    <PageHeader :pageData="data.currentPage" />
    <BlogList />
</template>

<script setup>
import { useRoute } from "#vue-router";

const nuxtApp = useNuxtApp();
const commonStore = useCommonPageStore();
const route = useRoute();

const { data, error } = await useAsyncData("pageData4", async () => {
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