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

const { locale, locales } = useI18n()

onMounted(() => {
	watch(
		locale,
		(newLocale) => {
			if (newLocale) {
				document.documentElement.lang = newLocale
			}
		},
		{ immediate: true }
	);
});

nuxtApp.hook("page:start", () => {
  isLoading.value = true;
});

nuxtApp.hook("page:finish", () => {
  isLoading.value = false;
});

</script>
