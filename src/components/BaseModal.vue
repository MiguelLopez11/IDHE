<template>
  <Transition name="modal">
    <div v-if="modelValue" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col">
        
        <!-- Header -->
        <div class="px-8 pt-6 pb-4 border-b flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">{{ title }}</h2>
          <button @click="close" class="text-3xl text-gray-400 hover:text-gray-600">×</button>
        </div>

        <!-- Body -->
        <div class="flex-1 p-8 overflow-y-auto">
          <slot></slot>
        </div>

        <!-- Footer -->
        <div v-if="showFooter" class="px-8 py-6 border-t bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
          <button
            type="button"
            @click="close"
            class="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-2xl transition"
          >
            {{ cancelText }}
          </button>
          <button
            type="button"
            @click="handleConfirm"
            :disabled="loading"
            class="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition disabled:opacity-70"
          >
            {{ loading ? 'Procesando...' : confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: 'Modal' },
  confirmText: { type: String, default: 'Guardar' },
  cancelText: { type: String, default: 'Cancelar' },
  showFooter: { type: Boolean, default: true },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const close = () => emit('update:modelValue', false)
const handleConfirm = () => emit('confirm')
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }
</style>