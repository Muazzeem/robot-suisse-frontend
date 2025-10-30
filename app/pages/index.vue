<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div v-if="pending">Loading...</div>
        <div v-else-if="error">
          <h1>Error loading page</h1>
          <p>{{ error }}</p>
        </div>
        <div v-else-if="pageData">
          <h1>{{ pageData.currentPage?.title || 'RobotSuisse' }}</h1>
          <pre>{{ pageData }}</pre>
        </div>
        <div v-else>
          <h1>Hello world</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommonPageStore } from '../stores/common'

const commonStore = useCommonPageStore()

useHead({
  title: 'RobotSuisse - Advanced Robotics for Every Industry',
  meta: [
    { name: 'description', content: 'Discover cutting-edge robotic solutions that transform manufacturing, healthcare, and service industries with Swiss precision and innovation.' }
  ]
})

const { data: pageData, pending, error } = await useAsyncData('homepage', async () => {
  try {
    const d = await commonStore.fetchPage({ html_path: "/" })
    return { currentPage: d }
  } catch (e) {
    console.error("Error fetching page data:", e)
    throw e
  }
})
</script>
