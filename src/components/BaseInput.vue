<template>
  <div class="space-y-1.5">
    <label v-if="label" 
           :for="id" 
           class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        class="w-full px-5 py-4 border border-gray-300 rounded-2xl 
               focus:outline-none focus:ring-2 focus:ring-violet-500 
               focus:border-transparent text-base transition-all
               disabled:bg-gray-100"
        :class="{ 'border-red-300 focus:ring-red-500': error }"
      />

      <!-- Append Slot (para el ojo) -->
      <slot name="append"></slot>
    </div>

    <p v-if="error" class="text-red-500 text-sm pl-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const id = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>