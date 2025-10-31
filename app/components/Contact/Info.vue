<template>
    <!-- Contact Sections -->
        <section class="contact-section">
            <div class="container"> 
                <!-- Bottom Contact Info -->
                <div class="grid info-grid" v-if="getSettings">
                    <div class="info-card">
                        <div class="info-icon icon-wrapper">
                            <i class="fa-solid fa-phone icon-size"></i>
                        </div>
                        <h3 class="info-title">
                            Phone 
                        </h3>
                        <span>
                            {{ getSettings?.phone }}
                        </span>
                    </div>
                    <div class="info-card">
                        <div class="info-icon icon-wrapper">
                            <i class="fa-solid fa-envelope icon-size"></i>
                        </div>
                        <h3 class="info-title">
                            Email Address 
                        </h3>
                        <span>
                            {{ getSettings?.email }}
                        </span>
                    </div>
                    <div class="info-card">
                        <div class="info-icon icon-wrapper">
                            <i class="fa-solid fa-location-dot icon-size"></i>
                        </div>
                        <h3 class="info-title">
                            Address 
                        </h3>
                        <span>
                            {{ getLocaleField(getSettings, 'address1', $i18n.locale) }} {{ getLocaleField(getSettings, 'address2', $i18n.locale) }}
                        </span>
                    </div>
                </div>
            </div>
        </section>
</template>

<script setup>
const utilityStore = useUtilityStore();
const { getSettings } = storeToRefs(utilityStore);

</script>

<style scoped>
.contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}
.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    background: #f9fafb;
    border-radius: 16px;
    padding: 2rem;
}

.info-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
}

.info-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
}

.info-title {
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.25rem;
}
:deep(p) {
    color: #6b7280;
    font-size: 0.95rem;
}
</style>
