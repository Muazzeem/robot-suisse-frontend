<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <Modal :isOpenModal="isLoading" v-if="isLoading" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const isLoading = ref(false);

nuxtApp.hook("page:start", () => {
  isLoading.value = true;
});

nuxtApp.hook("page:finish", () => {
  isLoading.value = false;
});

</script>
