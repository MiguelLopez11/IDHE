<template>
  <div class="p-6 max-w-7xl mx-auto">

    <div class="mb-8">
      <h1 class="text-4xl font-bold">
        Perfiles Integrales
      </h1>

      <p class="text-gray-500">
        Desarrollo socioemocional y cognitivo de los estudiantes
      </p>
    </div>

    <div
      v-if="students.length === 0"
      class="bg-white rounded-3xl shadow p-12 text-center"
    >
      No hay estudiantes registrados.
    </div>

    <div
      v-else
      class="grid lg:grid-cols-2 gap-8"
    >

      <div
        v-for="student in students"
        :key="student.id"
        class="bg-white rounded-3xl shadow p-6"
      >

        <!-- Header -->

        <div class="flex justify-between items-start mb-4">

          <div>
            <h2 class="text-2xl font-bold">
              {{ student.name }}
              {{ student.lastName }}
            </h2>

            <p class="text-gray-500">
              {{ student.grade }}
            </p>
          </div>

          <div
            class="bg-violet-100 text-violet-700 px-4 py-2 rounded-full font-semibold"
          >
            Nivel {{ student.level || 1 }}
          </div>

        </div>

        <!-- XP -->

        <div class="mb-6">

          <div class="flex justify-between mb-2">

            <span class="font-medium">
              Experiencia
            </span>

            <span>
              {{ student.xp || 0 }} XP
            </span>

          </div>

          <div class="bg-gray-200 h-3 rounded-full">

            <div
              class="bg-violet-600 h-3 rounded-full"
              :style="{
                width: xpPercent(student) + '%'
              }"
            />

          </div>

        </div>

        <!-- Radar -->

        <ProfileRadar
          :profile="student.profile || defaultProfile"
        />

        <!-- Métricas -->

        <div class="grid grid-cols-2 gap-3 mt-6">

          <div class="border rounded-2xl p-3">
            <div class="text-gray-500 text-sm">
              Pensamiento Crítico
            </div>

            <div class="font-bold text-lg">
              {{ getScore(student,'criticalThinking') }}
            </div>
          </div>

          <div class="border rounded-2xl p-3">
            <div class="text-gray-500 text-sm">
              Trabajo en Equipo
            </div>

            <div class="font-bold text-lg">
              {{ getScore(student,'teamwork') }}
            </div>
          </div>

          <div class="border rounded-2xl p-3">
            <div class="text-gray-500 text-sm">
              Empatía
            </div>

            <div class="font-bold text-lg">
              {{ getScore(student,'empathy') }}
            </div>
          </div>

          <div class="border rounded-2xl p-3">
            <div class="text-gray-500 text-sm">
              Liderazgo
            </div>

            <div class="font-bold text-lg">
              {{ getScore(student,'leadership') }}
            </div>
          </div>

        </div>

        <!-- Fortaleza principal -->

        <div
          class="mt-6 p-4 bg-green-50 border border-green-200 rounded-2xl"
        >
          <div class="text-sm text-green-700">
            Competencia más desarrollada
          </div>

          <div class="font-bold text-green-900">
            {{ strongestSkill(student) }}
          </div>
        </div>

        <!-- Área de oportunidad -->

        <div
          class="mt-3 p-4 bg-orange-50 border border-orange-200 rounded-2xl"
        >
          <div class="text-sm text-orange-700">
            Área de oportunidad
          </div>

          <div class="font-bold text-orange-900">
            {{ weakestSkill(student) }}
          </div>
        </div>

        <!-- Botón -->

        <div class="mt-6">

          <button
            @click="viewProfile(student)"
            class="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-2xl font-semibold"
          >
            Ver Perfil Completo
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { useStudentsStore } from '../../stores/students.js'

import ProfileRadar from '../../components/ProfileRadar.vue'

const router = useRouter()

const studentsStore = useStudentsStore()

const students = studentsStore.students

const defaultProfile = {
  criticalThinking: 0,
  teamwork: 0,
  empathy: 0,
  leadership: 0,
  resilience: 0
}

const getScore = (student, key) => {

  if (!student.profile) return 0

  return student.profile[key] || 0

}

const xpPercent = (student) => {

  const xp = student.xp || 0

  return xp % 100

}

const labels = {
  criticalThinking: 'Pensamiento Crítico',
  teamwork: 'Trabajo en Equipo',
  empathy: 'Empatía',
  leadership: 'Liderazgo',
  resilience: 'Resiliencia'
}

const strongestSkill = (student) => {

  if (!student.profile) return 'Sin datos'

  const entries = Object.entries(student.profile)

  const best = entries.sort(
    (a,b) => b[1] - a[1]
  )[0]

  return labels[best[0]]
}

const weakestSkill = (student) => {

  if (!student.profile) return 'Sin datos'

  const entries = Object.entries(student.profile)

  const worst = entries.sort(
    (a,b) => a[1] - b[1]
  )[0]

  return labels[worst[0]]
}

const viewProfile = (student) => {

  router.push(`/profiles/${student.id}`)

}
</script>