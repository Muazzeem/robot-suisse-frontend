<template>
</template>

<script setup>
import { useCommonPageStore } from '../stores/common'

const commonStore = useCommonPageStore()
const nuxtApp = useNuxtApp();

const pageData = ref(null);
const error = ref(null);

useHead({
    title: 'RobotSuisse - Advanced Robotics for Every Industry',
    meta: [
        { name: 'description', content: 'Discover cutting-edge robotic solutions that transform manufacturing, healthcare, and service industries with Swiss precision and innovation.' }
    ]
})


try {
    const d = await nuxtApp.runWithContext(async () => {
        return await commonStore.fetchPage({ html_path: "/" });
    });
    pageData.value = { currentPage: d };
} catch (e) {
    console.error("Error fetching page data:", e);
    error.value = e;
}
</script>
