<template>
  <div class="space-y-8">

    <h1 class="text-4xl font-bold">
      Recomendaciones Inteligentes
    </h1>

    <div
      v-for="student in recommendations"
      :key="student.id"
      class="bg-white rounded-3xl shadow p-8"
    >
      <div class="flex justify-between items-center mb-6">

        <div>
          <h2 class="text-2xl font-bold">
            {{ student.name }}
            {{ student.lastName }}
          </h2>

          <p class="text-gray-500">
            Nivel {{ student.level || 1 }}
          </p>
        </div>

        <div class="text-violet-600 font-bold">
          {{ student.xp || 0 }} XP
        </div>

      </div>

      <!-- Competencias bajas -->

      <div class="mb-6">

        <h3 class="font-bold mb-3 text-red-600">
          Áreas a fortalecer
        </h3>

        <div class="flex gap-2 flex-wrap">

          <span
            v-for="area in student.weaknesses"
            :key="area"
            class="px-3 py-2 bg-red-100 text-red-700 rounded-full"
          >
            {{ labels[area] }}
          </span>

        </div>

      </div>

      <!-- Juegos -->

      <div class="mb-6">

        <h3 class="font-bold mb-3">
          Juegos recomendados
        </h3>

        <ul class="space-y-2">

          <li
            v-for="game in student.games"
            :key="game"
          >
            🎮 {{ game }}
          </li>

        </ul>

      </div>

      <!-- Actividades -->

      <div>

        <h3 class="font-bold mb-3">
          Actividades sugeridas
        </h3>

        <ul class="space-y-2">

          <li
            v-for="activity in student.activities"
            :key="activity"
          >
            📚 {{ activity }}
          </li>

        </ul>

      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStudentsStore } from '../../stores/students'

const studentsStore = useStudentsStore()

const labels = {
  criticalThinking:'Pensamiento Crítico',
  teamwork:'Trabajo en Equipo',
  leadership:'Liderazgo',
  empathy:'Empatía',
  resilience:'Resiliencia'
}

const recommendations = computed(() => {

  return studentsStore.students.map(student => {

    const profile =
      student.profile || {}

    const weaknesses = []

    Object.entries(profile).forEach(
      ([key,value]) => {

        if(value < 40){

          weaknesses.push(key)

        }

      }
    )

    const games = []
    const activities = []

    weaknesses.forEach(area => {

      switch(area){

        case 'criticalThinking':

          games.push(
            'Detective Digital'
          )

          activities.push(
            'Analizar noticias falsas'
          )

          activities.push(
            'Resolver acertijos'
          )

          break

        case 'teamwork':

          games.push(
            'El Puente Roto'
          )

          activities.push(
            'Proyecto colaborativo'
          )

          break

        case 'leadership':

          games.push(
            'Expedición a Marte'
          )

          activities.push(
            'Dirigir un equipo'
          )

          break

        case 'empathy':

          games.push(
            'El Compañero Nuevo'
          )

          activities.push(
            'Dinámica de escucha activa'
          )

          break

        case 'resilience':

          games.push(
            'Expedición a Marte'
          )

          activities.push(
            'Retos progresivos'
          )

          break

      }

    })

    return {
      ...student,
      weaknesses,
      games:[...new Set(games)],
      activities:[...new Set(activities)]
    }

  })

})
</script>