<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div class="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 class="text-2xl font-bold text-indigo-600">MiApp</h1>
      </div>
      
      <nav class="flex-1 p-4">
        <ul class="space-y-1">
          <NavItem v-for="item in menu" :key="item.name" :item="item" />
        </ul>
      </nav>
    </aside>

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar -->
      <header class="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button class="lg:hidden">☰</button>
          <input 
            type="text" 
            placeholder="Buscar..." 
            class="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
        </div>
        
        <div class="flex items-center gap-4">
          <button class="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700"></button>
          <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
            LO
          </div>
        </div>
      </header>

      <!-- Área de contenido -->
      <main class="flex-1 overflow-auto p-6">
        <slot />
        <!-- Aquí va tu contenido -->
        <h2 class="text-3xl font-semibold mb-6">Bienvenido al Dashboard</h2>
        <!-- Cards de ejemplo -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div class="text-sm text-gray-500">Métrica {{ i }}</div>
            <div class="text-4xl font-semibold mt-2">12,459</div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menu = ref([
  { name: 'Dashboard', icon: '🏠' },
  { name: 'Proyectos', icon: '📁' },
  { name: 'Equipo', icon: '👥' },
  { name: 'Facturación', icon: '💰' },
  { name: 'Configuración', icon: '⚙️' },
])
</script>