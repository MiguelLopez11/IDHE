<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-950">

    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">

      <div class="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 class="text-2xl font-bold text-indigo-600">
          IDHE
        </h1>
      </div>

      <nav class="flex-1 p-4">
        <ul class="space-y-1">

          <NavItem v-for="item in menu" :key="item.name" :item="item" />

        </ul>
      </nav>

      <div class="p-4 border-t">
        <button @click="logout"
          class="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors">
          Cerrar sesión
        </button>
      </div>

    </aside>

    <!-- Contenido -->
    <div class="flex-1 flex flex-col">

      <header class="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" />

      <main class="flex-1 overflow-auto p-6">
        <RouterView />
      </main>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import NavItem from './NavItem.vue'

import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}

const menu = ref([
  {
    name: 'Inicio',
    icon: '🏠',
    route: '/Home'
  },

  {
    name: 'Académico',
    icon: '📚',
    children: [
      {
        name: 'Estudiantes',
        route: '/Students'
      },
      {
        name: 'Maestros',
        route: '/teachers'
      },
      {
        name: 'Materias',
        route: '/subjects'
      }
    ]
  },

  {
    name: 'Evaluación Integral',
    icon: '🎮',
    children: [
      {
        name: 'Juegos',
        route: '/games'
      },
      {
        name: 'Perfiles',
        route: '/profiles'
      },
    ]
  },

  {
    name: 'Analítica',
    icon: '📊',
    children: [
      {
        name: 'Dashboard',
        route: '/dashboard'
      },
      {
        name: 'Analytics',
        route: '/analytics'
      },
      {
        name: 'Mapa de Talento',
        route: '/talent-map'
      },
      {
        name: 'Logros',
        route: '/achievements'
      },
      {
        name: 'Evaluaciones',
        route: '/evaluations'
      },
      {
        name: 'Recomendaciones',
        route: '/recommendations'
      },
    ]
  },
  {
    name: 'Gamificación',
    icon: '🏆',
    children: [
      {
        name: 'Ranking',
        route: '/ranking'
      },
      {
        name: 'Logros',
        route: '/achievements'
      },
      {
        name: 'Insignias',
        route: '/badges'
      },
      {
        name: 'Misiones',
        route: '/missions'
      },
      {
        name: 'Temporada',
        route: '/seasons'
      }
    ]
  },
  {
    name: 'Reportes',
    icon: '📑',
    children: [
      {
        name: 'Reporte Individual',
        route: '/report/student'
      },
      {
        name: 'Reporte Grupal',
        route: '/report/group'
      },
      {
        name: 'Competencias',
        route: '/report/competencies'
      }
    ]
  }
])
</script>