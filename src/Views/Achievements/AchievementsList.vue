<template>
  <div class="p-6 max-w-7xl mx-auto">

    <!-- Encabezado -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900">
        Logros
      </h1>

      <p class="text-gray-600 mt-2">
        Insignias y reconocimientos obtenidos por los alumnos
      </p>
    </div>

    <!-- Estado vacío -->
    <div v-if="achievements.length === 0" class="bg-white rounded-3xl shadow p-12 text-center">
      
      <div class="text-6xl mb-4">
        🏅
      </div>

      <h2 class="text-2xl font-bold mb-2">
        Aún no hay logros
      </h2>

      <p class="text-gray-500">
        Los alumnos desbloquearán logros conforme completen juegos y misiones.
      </p>
    </div>
    
    <!-- Lista -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      <div v-for="achievement in achievements" :key="achievement.id"
        class="bg-white rounded-3xl shadow hover:shadow-lg transition p-6">

        <!-- Icono -->
        <div class="text-5xl mb-4">
          🏅
        </div>

        <!-- Título -->
        <h2 class="text-xl font-bold mb-2">
          {{ achievement.title }}
        </h2>

        <!-- Descripción -->
        <p class="text-gray-600 mb-4">
          {{ achievement.description }}
        </p>

        <!-- Alumno -->
        <div class="border-t pt-4">

          <div class="text-sm text-gray-500">
            Alumno
          </div>

          <div class="font-semibold">
            {{ getStudentName(achievement.studentId) }}
          </div>

        </div>

        <!-- Fecha -->
        <div class="mt-4 text-xs text-gray-400">
          Desbloqueado:
          {{ formatDate(achievement.unlockedAt) }}
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

import {
  useAchievementsStore
} from '../../stores/achievements'

import {
  useStudentsStore
} from '../../stores/students'

const achievementsStore =
  useAchievementsStore()

const studentsStore =
  useStudentsStore()

const achievements = computed(() => {

  return [...achievementsStore.achievements]
    .sort(
      (a, b) =>
        new Date(b.unlockedAt) -
        new Date(a.unlockedAt)
    )

})
const studentRanking = computed(() => {

  return studentsStore.students
    .map(student => ({

      id: student.id,

      name:
        `${student.name} ${student.lastName}`,

      achievements:
        achievementsStore.achievements
          .filter(
            achievement =>
              achievement.studentId === student.id
          )
          .length

    }))
    .sort(
      (a, b) =>
        b.achievements -
        a.achievements
    )

})
const getStudentName = (studentId) => {

  const student =
    studentsStore.students.find(
      s => s.id === studentId
    )

  if (!student) {
    return 'Alumno eliminado'
  }

  return `${student.name} ${student.lastName}`

}

const formatDate = (date) => {

  if (!date) return ''

  return new Date(date)
    .toLocaleDateString(
      'es-MX',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }
    )

}
</script>