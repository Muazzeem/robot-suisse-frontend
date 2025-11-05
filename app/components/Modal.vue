<template>
    <Transition name="modal">
        <div v-if="isOpenModal" class="modal-backdrop">
            <div class="modal-container">
                <div class="loading-content">
                    <div class="spinner"></div>
                    <p class="loading-text">{{ $t('loader.loading') }}</p>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
const props = defineProps({
    isOpenModal: {
        type: Boolean,
        required: true
    }
});

</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-container {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    min-width: 300px;
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #FF0000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-text {
    margin: 0;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
}

/* Modal transition animations */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    transform: scale(0.9);
}
</style>