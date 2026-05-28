<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div class="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 class="text-2xl font-bold text-indigo-600">IDHE</h1>
      </div>
      
      <nav class="flex-1 p-4">
        <ul class="space-y-1">
          <NavItem 
            v-for="item in menu" 
            :key="item.name" 
            :item="item"
          />
        </ul>
      </nav>
    </aside>

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col">
      <header class="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between">
        <!-- ... tu navbar ... -->
      </header>

      <main class="flex-1 overflow-auto p-6">
        <RouterView />   <!-- ← Cambia esto -->
      </main>
    </div>
  </div>
</template>

<script setup>
import NavItem from './NavItem.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'   // ← Importa esto

const menu = ref([
  { name: 'Inicio', icon: '🏠', route: '/Home' },
  { name: 'Estudiantes', icon: '📁', route: '/Students' },
  { name: 'Maestros',    icon: '👥', route: '/teachers' },
  // { name: 'Facturación', icon: '💰', route: '/facturacion' },
  // { name: 'Configuración', icon: '⚙️', route: '/configuracion' },
])
</script>