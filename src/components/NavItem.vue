<template>
  <li>
    <router-link
      :to="item.route"
      class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
      :class="{
        'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400': isActive,
        'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300': !isActive
      }"
    >
      <span class="text-xl w-6 flex justify-center">{{ item.icon }}</span>
      <span>{{ item.name }}</span>
    </router-link>
  </li>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const isActive = computed(() => {
  return route.name === props.item.name
})
</script>