<template>
  <div
    v-if="student"
    class="max-w-7xl mx-auto p-6 space-y-8"
  >

    <!-- Header -->

    <div
      class="bg-white rounded-3xl shadow p-8"
    >

      <div class="flex justify-between items-start">

        <div>

          <h1 class="text-4xl font-bold">
            {{ student.name }}
            {{ student.lastName }}
          </h1>

          <p class="text-gray-500 mt-2">
            {{ student.grade }}
          </p>

        </div>

        <div
          class="bg-violet-100 text-violet-700 px-5 py-3 rounded-2xl font-bold"
        >
          Nivel {{ student.level || 1 }}
        </div>

      </div>

      <div class="mt-6">

        <div class="flex justify-between mb-2">
          <span>Experiencia</span>
          <span>{{ student.xp || 0 }} XP</span>
        </div>

        <div class="bg-gray-200 h-4 rounded-full">

          <div
            class="bg-violet-600 h-4 rounded-full"
            :style="{
              width:(student.xp || 0) % 100 + '%'
            }"
          />

        </div>

      </div>

    </div>

    <!-- Radar -->

    <div
      class="bg-white rounded-3xl shadow p-8"
    >

      <h2 class="text-2xl font-bold mb-6">
        Perfil Integral
      </h2>

      <ProfileRadar
        :profile="student.profile || defaultProfile"
      />

    </div>

    <!-- Competencias -->

    <div
      class="grid md:grid-cols-2 gap-6"
    >

      <div
        class="bg-green-50 border border-green-200 rounded-3xl p-6"
      >

        <h3
          class="font-bold text-green-800 mb-4"
        >
          Fortalezas
        </h3>

        <ul class="space-y-2">

          <li
            v-for="skill in strengths"
            :key="skill"
          >
            ✅ {{ skill }}
          </li>

        </ul>

      </div>

      <div
        class="bg-orange-50 border border-orange-200 rounded-3xl p-6"
      >

        <h3
          class="font-bold text-orange-800 mb-4"
        >
          Áreas de oportunidad
        </h3>

        <ul class="space-y-2">

          <li
            v-for="skill in opportunities"
            :key="skill"
          >
            📌 {{ skill }}
          </li>

        </ul>

      </div>

    </div>

    <!-- Logros -->

    <div
      class="bg-white rounded-3xl shadow p-8"
    >

      <h2 class="text-2xl font-bold mb-6">
        Logros Desbloqueados
      </h2>

      <div
        v-if="studentAchievements.length"
        class="grid md:grid-cols-3 gap-4"
      >

        <div
          v-for="achievement in studentAchievements"
          :key="achievement.id"
          class="border rounded-2xl p-4"
        >
          <div class="text-4xl mb-2">
            {{ achievement.icon }}
          </div>

          <div class="font-bold">
            {{ achievement.title }}
          </div>

          <div class="text-sm text-gray-500">
            {{ achievement.description }}
          </div>
        </div>

      </div>

      <div v-else>
        Sin logros desbloqueados
      </div>

    </div>

    <!-- Historial -->

    <div
      class="bg-white rounded-3xl shadow p-8"
    >

      <h2 class="text-2xl font-bold mb-6">
        Historial de Juegos
      </h2>

      <table class="w-full">

        <thead>

          <tr class="border-b">

            <th class="text-left py-3">
              Juego
            </th>

            <th class="text-left py-3">
              XP
            </th>

            <th class="text-left py-3">
              Fecha
            </th>

          </tr>

        </thead>

        <tbody>

          <tr
            v-for="result in studentResults"
            :key="result.id"
            class="border-b"
          >

            <td class="py-3">
              {{ getGameName(result.gameId) }}
            </td>

            <td>
              {{ result.xp }}
            </td>

            <td>
              {{ formatDate(result.completedAt) }}
            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <!-- Recomendaciones -->

    <div
      class="bg-blue-50 border border-blue-200 rounded-3xl p-8"
    >

      <h2
        class="text-2xl font-bold text-blue-800 mb-4"
      >
        Recomendaciones
      </h2>

      <ul class="space-y-3">

        <li
          v-for="recommendation in recommendations"
          :key="recommendation"
        >
          💡 {{ recommendation }}
        </li>

      </ul>

    </div>

  </div>

  <div
    v-else
    class="text-center py-20"
  >
    Alumno no encontrado
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import ProfileRadar from '../../components/ProfileRadar.vue'

import { useStudentsStore } from '../../stores/students.js'
import { useResultsStore } from '../../stores/results.js'
import { useGamesStore } from '../../stores/games.js'
import { useAchievementsStore } from '../../stores/achievements.js'

const route = useRoute()

const studentsStore = useStudentsStore()
const resultsStore = useResultsStore()
const gamesStore = useGamesStore()
const achievementsStore = useAchievementsStore()

const defaultProfile = {
  criticalThinking: 0,
  teamwork: 0,
  empathy: 0,
  leadership: 0,
  resilience: 0
}

const student = computed(() =>
  studentsStore.students.find(
    s => s.id === Number(route.params.id)
  )
)

const studentResults = computed(() =>
  resultsStore.results.filter(
    r => r.studentId === student.value?.id
  )
)

const studentAchievements = computed(() =>
  achievementsStore.unlocked.filter(
    a => a.studentId === student.value?.id
  )
)

const getGameName = (gameId) => {

  const game = gamesStore.games.find(
    g => g.id === gameId
  )

  return game?.title || 'Juego'
}

const labels = {
  criticalThinking:'Pensamiento Crítico',
  teamwork:'Trabajo en Equipo',
  empathy:'Empatía',
  leadership:'Liderazgo',
  resilience:'Resiliencia'
}

const strengths = computed(() => {

  if (!student.value?.profile) return []

  return Object.entries(
    student.value.profile
  )
  .sort((a,b)=>b[1]-a[1])
  .slice(0,2)
  .map(x => labels[x[0]])

})

const opportunities = computed(() => {

  if (!student.value?.profile) return []

  return Object.entries(
    student.value.profile
  )
  .sort((a,b)=>a[1]-b[1])
  .slice(0,2)
  .map(x => labels[x[0]])

})

const recommendations = computed(() => {

  const rec = []

  if (!student.value?.profile) return rec

  if ((student.value.profile.empathy || 0) < 50) {
    rec.push(
      'Realizar juegos orientados a empatía y convivencia.'
    )
  }

  if ((student.value.profile.teamwork || 0) < 50) {
    rec.push(
      'Participar en actividades colaborativas.'
    )
  }

  if ((student.value.profile.resilience || 0) < 50) {
    rec.push(
      'Fortalecer resiliencia mediante retos progresivos.'
    )
  }

  return rec

})

const formatDate = (date) => {
  return new Date(date)
    .toLocaleDateString()
}
</script>