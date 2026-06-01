<template>
  <div class="bg-white rounded-3xl p-6 shadow hover:shadow-lg transition-shadow">
    <div class="flex justify-between items-start">
      <!-- Información -->
      <div>
        <p class="text-gray-500 text-sm font-medium">{{ title }}</p>
        <p class="text-4xl font-bold mt-3 text-gray-900">{{ value }}</p>
      </div>
      
      <!-- Icono -->
      <div 
        class="w-14 h-14 rounded-2xl flex items-center justify-center text-4xl transition-colors"
        :class="`bg-${color}-100 text-${color}-600`"
      >
        {{ icon }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'violet',
    validator: (value) => ['violet', 'indigo', 'emerald', 'orange', 'gray'].includes(value)
  }
})
</script>