<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-4xl font-bold text-gray-900">
        ¡Bienvenido de nuevo, {{ authStore.user?.name?.split(' ')[0] || 'Miguel' }}!
      </h1>
      <p class="text-gray-600 mt-2">Resumen del rendimiento académico</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatCard 
        title="Total Alumnos" 
        :value="studentsStore.students.length" 
        icon="👨‍🎓" 
        color="violet" 
      />
      <StatCard 
        title="Total Maestros" 
        :value="teachersStore.teachers.length" 
        icon="👨‍🏫" 
        color="indigo" 
      />
      <StatCard 
        title="Promedio General" 
        value="8.4" 
        icon="📊" 
        color="emerald" 
      />
      <StatCard 
        title="Alumnos en Riesgo" 
        value="7" 
        icon="⚠️" 
        color="orange" 
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Gráfica 1: Promedio por Grado -->
      <div class="bg-white rounded-3xl shadow p-6">
        <h2 class="text-xl font-semibold mb-6">Promedio por Grado</h2>
        <div class="h-80">
          <canvas ref="gradeChartRef"></canvas>
        </div>
      </div>

      <!-- Gráfica 2: Evolución del Rendimiento -->
      <div class="bg-white rounded-3xl shadow p-6">
        <h2 class="text-xl font-semibold mb-6">Evolución del Rendimiento (Últimos 6 meses)</h2>
        <div class="h-80">
          <canvas ref="trendChartRef"></canvas>
        </div>
      </div>

      <!-- Gráfica 3: Distribución de Calificaciones -->
      <div class="bg-white rounded-3xl shadow p-6 lg:col-span-2">
        <h2 class="text-xl font-semibold mb-6">Distribución de Calificaciones</h2>
        <div class="h-80">
          <canvas ref="distributionChartRef"></canvas>
        </div>
      </div>
    </div>

    <!-- Accesos Rápidos -->
    <div class="mt-12">
      <h2 class="text-2xl font-semibold mb-6">Accesos Rápidos</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <RouterLink to="/students" class="group">
          <div class="bg-white hover:bg-violet-50 border border-transparent hover:border-violet-200 rounded-3xl p-8 text-center transition-all duration-200">
            <div class="text-5xl mb-4">👨‍🎓</div>
            <h3 class="font-semibold text-lg">Alumnos</h3>
            <p class="text-gray-500 text-sm mt-1">Gestionar estudiantes</p>
          </div>
        </RouterLink>

        <RouterLink to="/Teachers" class="group">
          <div class="bg-white hover:bg-indigo-50 border border-transparent hover:border-indigo-200 rounded-3xl p-8 text-center transition-all duration-200">
            <div class="text-5xl mb-4">👨‍🏫</div>
            <h3 class="font-semibold text-lg">Maestros</h3>
            <p class="text-gray-500 text-sm mt-1">Gestionar docentes</p>
          </div>
        </RouterLink>

        <!-- <RouterLink to="/proyectos" class="group">
          <div class="bg-white hover:bg-amber-50 border border-transparent hover:border-amber-200 rounded-3xl p-8 text-center transition-all duration-200">
            <div class="text-5xl mb-4">📁</div>
            <h3 class="font-semibold text-lg">Proyectos</h3>
            <p class="text-gray-500 text-sm mt-1">Ver proyectos</p>
          </div>
        </RouterLink>

        <RouterLink to="/facturacion" class="group">
          <div class="bg-white hover:bg-emerald-50 border border-transparent hover:border-emerald-200 rounded-3xl p-8 text-center transition-all duration-200">
            <div class="text-5xl mb-4">💰</div>
            <h3 class="font-semibold text-lg">Facturación</h3>
            <p class="text-gray-500 text-sm mt-1">Gestión financiera</p>
          </div>
        </RouterLink> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useStudentsStore } from '../../stores/students'
import { useTeachersStore } from '../../stores/teachers'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

// Componente opcional (recomendado)
import StatCard from '../../components/StatCard.vue'

const authStore = useAuthStore()
const studentsStore = useStudentsStore()
const teachersStore = useTeachersStore()

// Refs para canvases
const gradeChartRef = ref(null)
const trendChartRef = ref(null)
const distributionChartRef = ref(null)

let gradeChart = null
let trendChart = null
let distributionChart = null

onMounted(() => {
  // Promedio por Grado
  gradeChart = new Chart(gradeChartRef.value, {
    type: 'bar',
    data: {
      labels: ['1° A', '1° B', '2° A', '2° B', '3° A'],
      datasets: [{
        label: 'Promedio',
        data: [8.2, 7.8, 8.7, 8.1, 9.0],
        backgroundColor: '#8b5cf6',
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 10 } }
    }
  })

  // Evolución del Rendimiento
  trendChart = new Chart(trendChartRef.value, {
    type: 'line',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        label: 'Promedio General',
        data: [7.8, 8.1, 8.0, 8.4, 8.6, 8.7],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } }
    }
  })

  // Distribución de Calificaciones
  distributionChart = new Chart(distributionChartRef.value, {
    type: 'doughnut',
    data: {
      labels: ['Excelente (9-10)', 'Bueno (7-8)', 'Regular (6)', 'Insuficiente (<6)'],
      datasets: [{
        data: [45, 38, 12, 5],
        backgroundColor: ['#22c55e', '#8b5cf6', '#eab308', '#ef4444'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', padding: 20 }
      }
    }
  })
})

onBeforeUnmount(() => {
  gradeChart?.destroy()
  trendChart?.destroy()
  distributionChart?.destroy()
})
</script>