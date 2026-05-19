<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div class="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 class="text-2xl font-bold text-indigo-600">IDHE</h1>
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
       <AlumnoList> 

       </AlumnoList>
      </main>
    </div>
  </div>
</template>

<script setup>
import AlumnoList from '../Views/Students/StudentList.vue';
import { ref } from 'vue'

const menu = ref([
  { name: 'Dashboard', icon: '🏠' },
  { name: 'Proyectos', icon: '📁' },
  { name: 'Equipo', icon: '👥' },
  { name: 'Facturación', icon: '💰' },
  { name: 'Configuración', icon: '⚙️' },
])
</script>