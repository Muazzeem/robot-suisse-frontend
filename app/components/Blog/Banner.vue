<template>
    <div class="banner-image">
        <div class="banner-image-container">
            <img :src="HOST + props?.data?.image?.original?.src" alt="Robotics innovation" />
        </div>
    </div>
</template>

<script setup>
const config = useRuntimeConfig()
const HOST = computed(() => {
	return config.public.HOST;
});

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

</script>

<style scoped>
.banner-image-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.banner-image img {
  width: 100%;
  max-height: 500px !important;
  object-fit: cover;
  height: auto;
  display: block;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .banner-image {
    padding: 0px;
  }

  .banner-image-container {
    padding: 0px;
  }
}
</style>