<template>
  <div class="space-y-8">

    <div>
      <h1 class="text-4xl font-bold">
        Dashboard Integral
      </h1>

      <p class="text-gray-500">
        Métricas generales del sistema
      </p>
    </div>

    <!-- KPIs -->

    <div class="grid md:grid-cols-4 gap-6">

      <div class="bg-white rounded-3xl shadow p-6">
        <div class="text-gray-500">
          Alumnos
        </div>

        <div class="text-4xl font-bold">
          {{ students.length }}
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow p-6">
        <div class="text-gray-500">
          Juegos Realizados
        </div>

        <div class="text-4xl font-bold">
          {{ results.length }}
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow p-6">
        <div class="text-gray-500">
          XP Total
        </div>

        <div class="text-4xl font-bold">
          {{ totalXp }}
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow p-6">
        <div class="text-gray-500">
          Competencia Principal
        </div>

        <div class="text-xl font-bold text-violet-600">
          {{ strongestCompetency }}
        </div>
      </div>

    </div>

    <!-- TOP ALUMNOS -->

    <div class="bg-white rounded-3xl shadow p-6">

      <h2 class="text-2xl font-bold mb-6">
        Top 5 Estudiantes
      </h2>

      <table class="w-full">

        <thead>
          <tr class="border-b">
            <th class="text-left py-3">
              Alumno
            </th>

            <th class="text-left py-3">
              Nivel
            </th>

            <th class="text-left py-3">
              XP
            </th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="student in topStudents"
            :key="student.id"
            class="border-b"
          >
            <td class="py-3">
              {{ student.name }}
              {{ student.lastName }}
            </td>

            <td>
              {{ student.level || 1 }}
            </td>

            <td>
              {{ student.xp || 0 }}
            </td>
          </tr>

        </tbody>

      </table>

    </div>

    <!-- COMPETENCIAS -->

    <div class="bg-white rounded-3xl shadow p-6">

      <h2 class="text-2xl font-bold mb-6">
        Competencias Globales
      </h2>

      <div
        v-for="(value,key) in competencyTotals"
        :key="key"
        class="mb-5"
      >
        <div class="flex justify-between mb-1">
          <span>
            {{ formatLabel(key) }}
          </span>

          <span>
            {{ value }}
          </span>
        </div>

        <div class="bg-gray-200 rounded-full h-4">

          <div
            class="bg-violet-600 h-4 rounded-full"
            :style="{
              width:
                (value / highestScore) * 100 + '%'
            }"
          />

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

import { useStudentsStore } from '../../stores/students'
import { useResultsStore } from '../../stores/results'

const studentsStore = useStudentsStore()
const resultsStore = useResultsStore()

const students = studentsStore.students
const results = resultsStore.results

const totalXp = computed(() => {

  return students.reduce(
    (sum,s) => sum + (s.xp || 0),
    0
  )

})

const topStudents = computed(() => {

  return [...students]
    .sort(
      (a,b) =>
        (b.xp || 0) - (a.xp || 0)
    )
    .slice(0,5)

})

const competencyTotals = computed(() => {

  const totals = {
    criticalThinking: 0,
    teamwork: 0,
    empathy: 0,
    leadership: 0,
    resilience: 0
  }

  students.forEach(student => {

    if (!student.profile) return

    Object.keys(totals).forEach(key => {

      totals[key] +=
        student.profile[key] || 0

    })

  })

  return totals

})

const highestScore = computed(() => {

  return Math.max(
    ...Object.values(
      competencyTotals.value
    )
  )

})

const strongestCompetency = computed(() => {

  const entries = Object.entries(
    competencyTotals.value
  )

  const winner =
    entries.sort((a,b) => b[1]-a[1])[0]

  return formatLabel(winner[0])

})

const formatLabel = (key) => {

  const labels = {
    criticalThinking:'Pensamiento Crítico',
    teamwork:'Trabajo en Equipo',
    empathy:'Empatía',
    leadership:'Liderazgo',
    resilience:'Resiliencia'
  }

  return labels[key] || key

}
</script>