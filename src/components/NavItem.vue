<template>
  <li>

    <button
      v-if="item.children"
      @click="toggleMenu"
      class="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <div class="flex items-center gap-3">
        <span>{{ item.icon }}</span>
        <span>{{ item.name }}</span>
      </div>

      <span>
        {{ open ? '▼' : '▶' }}
      </span>
    </button>

    <RouterLink
      v-else
      :to="item.route"
      class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <span>{{ item.icon }}</span>
      <span>{{ item.name }}</span>
    </RouterLink>

    <ul
      v-if="item.children && open"
      class="ml-8 mt-2 space-y-1"
    >
      <li
        v-for="child in item.children"
        :key="child.route"
      >
        <RouterLink
          :to="child.route"
          class="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {{ child.name }}
        </RouterLink>
      </li>
    </ul>

  </li>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true
  }
})

const open = ref(false)

const toggleMenu = () => {
  open.value = !open.value
}
</script>