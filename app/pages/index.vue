<template>
    <Header />
    <div v-if="pageData?.currentPage?.body">
        <div v-for="(item, idx) in pageData?.currentPage?.body" :key="'p_idx_' + idx">
            <div>
                <div>
                    <HeroSection v-if="item?.type == 'hero_title'" :data="item?.value" />
                </div>
                <div>
                    <TitleSection v-if="item?.type == 'title'" :data="item?.value" />
                </div>
    
                <div class="container">
                    <WhyChooseSection v-if="item?.type == 'why_chose'" :data="item?.value" />
                </div>
                <div style="background: #f9fafb;">
                    <div class="container">
                        <CategoriesSection v-if="item?.type == 'categories'" :data="item?.value" />
                    </div>
                </div>
                <div class="container">
                    <FeaturedSection v-if="item?.type == 'robots'" :data="item?.value" />
                </div>
                <div>
                    <div class="container">
                        <FaqSection v-if="item?.type == 'faq'" :data="item?.value" />
                    </div>
                </div>
               <div style="background: #f9fafb;">
                    <div class="container">
                        <BlogSection v-if="item?.type == 'blogs'" :data="item?.value" />
                    </div>
                </div>

                <div style="color: white;">
                    <div class="container">
                        <IndustryCallout v-if="item?.type == 'cta'" :data="item?.value" />
                    </div>
                </div>
                <div>
                    <div class="container">
                        <ContactSection v-if="item?.type=='contact'" :data="item?.value" />
                    </div>
                </div>
                <div>
				    <Spacer v-if="item?.type=='spacer'" :data="item?.value" />
			    </div>

                <div class="container">
                    <AIChatAssistant v-if="item?.type=='chat'" :data="item?.value" />
                </div>

                <div>
                    <div class="container">
                        <RobotUseCases v-if="item?.type=='tabs'" :data="item?.value" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const commonStore = useCommonPageStore()

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