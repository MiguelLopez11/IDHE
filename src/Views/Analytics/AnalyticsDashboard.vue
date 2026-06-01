<template>
  <div class="space-y-8">

    <h1 class="text-4xl font-bold">
      Analítica Institucional
    </h1>

    <!-- KPIs -->

    <div class="grid md:grid-cols-4 gap-6">

      <div class="bg-white p-6 rounded-3xl shadow">
        <div class="text-sm text-gray-500">
          Alumnos
        </div>

        <div class="text-4xl font-bold">
          {{ students.length }}
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow">
        <div class="text-sm text-gray-500">
          Juegos completados
        </div>

        <div class="text-4xl font-bold">
          {{ results.length }}
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow">
        <div class="text-sm text-gray-500">
          Logros
        </div>

        <div class="text-4xl font-bold">
          {{ achievements.length }}
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow">
        <div class="text-sm text-gray-500">
          XP Promedio
        </div>

        <div class="text-4xl font-bold">
          {{ averageXp }}
        </div>
      </div>

    </div>

    <!-- Competencias -->

    <div class="bg-white rounded-3xl shadow p-8">

      <h2 class="text-2xl font-bold mb-6">
        Competencias Globales
      </h2>

      <div class="space-y-5">

        <div
          v-for="item in competencies"
          :key="item.name"
        >
          <div class="flex justify-between mb-2">
            <span>{{ item.label }}</span>
            <span>{{ item.value }}</span>
          </div>

          <div class="bg-gray-200 rounded-full h-3">

            <div
              class="bg-violet-600 h-3 rounded-full"
              :style="{
                width:item.value+'%'
              }"
            ></div>

          </div>

        </div>

      </div>

    </div>

    <!-- Top alumnos -->

    <div class="bg-white rounded-3xl shadow p-8">

      <h2 class="text-2xl font-bold mb-6">
        Top Estudiantes
      </h2>

      <table class="w-full">

        <thead>
          <tr>
            <th>#</th>
            <th>Alumno</th>
            <th>Nivel</th>
            <th>XP</th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="(student,index) in topStudents"
            :key="student.id"
          >
            <td>{{ index+1 }}</td>

            <td>
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

    <!-- Riesgo -->

    <div class="bg-white rounded-3xl shadow p-8">

      <h2 class="text-2xl font-bold mb-6 text-red-600">
        Estudiantes en Riesgo
      </h2>

      <div
        v-for="student in riskStudents"
        :key="student.id"
        class="border rounded-2xl p-4 mb-3"
      >
        {{ student.name }}
        {{ student.lastName }}
      </div>

      <div
        v-if="riskStudents.length===0"
        class="text-green-600"
      >
        No se detectan estudiantes en riesgo.
      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

import { useStudentsStore } from '../../stores/students'
import { useResultsStore } from '../../stores/results'
import { useAchievementsStore } from '../../stores/achievements'

const studentsStore = useStudentsStore()
const resultsStore = useResultsStore()
const achievementsStore = useAchievementsStore()

const students = studentsStore.students
const results = resultsStore.results
const achievements = achievementsStore.unlocked

const averageXp = computed(() => {

  if (!students.length) return 0

  const total = students.reduce(
    (sum,s) => sum + (s.xp || 0),
    0
  )

  return Math.round(total / students.length)

})

const competencies = computed(() => {

  const names = [
    'criticalThinking',
    'teamwork',
    'leadership',
    'empathy',
    'resilience'
  ]

  return names.map(name => {

    const total = students.reduce(
      (sum,s) =>
        sum +
        (s.profile?.[name] || 0),
      0
    )

    const average =
      students.length
      ? Math.round(total / students.length)
      : 0

    const labels = {
      criticalThinking:'Pensamiento Crítico',
      teamwork:'Trabajo en Equipo',
      leadership:'Liderazgo',
      empathy:'Empatía',
      resilience:'Resiliencia'
    }

    return {
      name,
      label: labels[name],
      value: average
    }

  })

})

const topStudents = computed(() => {

  return [...students]
    .sort((a,b)=>
      (b.xp||0)-(a.xp||0)
    )
    .slice(0,5)

})

const riskStudents = computed(() => {

  return students.filter(student => {

    const profile =
      student.profile || {}

    const avg =
      (
        (profile.criticalThinking || 0)+
        (profile.teamwork || 0)+
        (profile.leadership || 0)+
        (profile.empathy || 0)+
        (profile.resilience || 0)
      ) / 5

    return avg < 20

  })

})
</script>