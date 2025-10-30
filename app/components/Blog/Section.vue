<template>
  <section class="blog">
    <div class="blog-grid">
      <NuxtLink v-for="post in getBlogs" :key="post.id" :to="`/blog/${post.fetch_parent.slug}/${post.meta.slug}`"class="blog-link">
        <BlogCard :data="post" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";

const utilityStore = useUtilityStore();
const { getBlogs } = storeToRefs(utilityStore);
</script>


<style scoped>
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem 0 4rem;
}

@media (max-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>