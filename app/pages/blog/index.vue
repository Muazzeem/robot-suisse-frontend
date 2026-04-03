<template>
  <Header />
  <div v-if="data?.currentPage?.body">
    <div v-for="(item, idx) in data?.currentPage?.body" :key="'p_idx_' + idx">
      <div>
        <PageHeader v-if="item?.type == 'page_header'" :data="item?.value" />
      </div>
    </div>
  </div>
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
