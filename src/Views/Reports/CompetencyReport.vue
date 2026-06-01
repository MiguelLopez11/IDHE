<template>
  <div class="max-w-7xl mx-auto p-6">

    <h1 class="text-4xl font-bold mb-8">
      Reporte de Competencias
    </h1>

    <div class="grid md:grid-cols-5 gap-4">

      <div
        v-for="item in competencies"
        :key="item.name"
        class="bg-white rounded-3xl shadow p-6"
      >
        <h2 class="font-bold mb-4">
          {{ item.label }}
        </h2>

        <div class="text-4xl font-bold text-violet-600">
          {{ item.average }}
        </div>

        <div class="text-sm text-gray-500 mt-2">
          Promedio escolar
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStudentsStore } from '../../stores/students'

const studentsStore = useStudentsStore()

const avg = (key) => {

  const total =
    studentsStore.students.reduce(
      (sum, s) =>
        sum + (s.profile?.[key] || 0),
      0
    )

  return studentsStore.students.length
    ? Math.round(total / studentsStore.students.length)
    : 0
}

const competencies = computed(() => [
  {
    name:'criticalThinking',
    label:'Pensamiento Crítico',
    average:avg('criticalThinking')
  },
  {
    name:'teamwork',
    label:'Trabajo en Equipo',
    average:avg('teamwork')
  },
  {
    name:'leadership',
    label:'Liderazgo',
    average:avg('leadership')
  },
  {
    name:'empathy',
    label:'Empatía',
    average:avg('empathy')
  },
  {
    name:'resilience',
    label:'Resiliencia',
    average:avg('resilience')
  }
])
</script>