<template>
    <div v-if="game" class="max-w-4xl mx-auto">

        <!-- Pantalla inicial -->
        <div v-if="!started" class="bg-white rounded-3xl shadow p-8">
            <h1 class="text-4xl font-bold mb-4">
                {{ game.title }}
            </h1>

            <p class="text-gray-600 mb-6">
                {{ game.description }}
            </p>

            <label class="block mb-2 font-medium">
                Selecciona tu nombre
            </label>

            <select v-model="selectedStudent" class="w-full border rounded-2xl p-4 mb-6">
                <option value="">
                    Seleccionar alumno
                </option>

                <option v-for="student in studentsStore.students" :key="student.id" :value="student.id">
                    {{ student.name }} {{ student.lastName }}
                </option>
            </select>

            <button :disabled="!selectedStudent" @click="startGame"
                class="bg-violet-600 text-white px-6 py-3 rounded-2xl disabled:opacity-50">
                Iniciar misión
            </button>
        </div>

        <!-- Preguntas -->
        <div v-else-if="!finished" class="bg-white rounded-3xl shadow p-8">
            <div class="flex justify-between mb-6">
                <span class="font-semibold">
                    Pregunta {{ currentIndex + 1 }}
                    de {{ game.questions.length }}
                </span>

                <span class="text-gray-500">
                    {{ game.title }}
                </span>
            </div>

            <!-- Barra progreso -->
            <div class="w-full bg-gray-200 rounded-full h-3 mb-8">
                <div class="bg-violet-600 h-3 rounded-full transition-all" :style="{
                    width:
                        ((currentIndex + 1) /
                            game.questions.length) * 100 + '%'
                }"></div>
            </div>
            <div class="text-5xl mb-6">

                <span v-for="n in stars" :key="n">
                    ⭐
                </span>

            </div>
            <h2 class="text-2xl font-bold mb-8">
                {{ currentQuestion.question }}
            </h2>

            <div class="space-y-4">
                <button v-for="option in currentQuestion.options" :key="option.text" @click="answer(option)"
                    class="w-full text-left p-5 border rounded-2xl hover:bg-violet-50 hover:border-violet-500 transition">
                    {{ option.text }}
                </button>
            </div>
        </div>

        <!-- Resultado -->
        <div v-else class="bg-white rounded-3xl shadow p-8 text-center">
            <div class="text-7xl mb-4">
                🎉
            </div>

            <h1 class="text-4xl font-bold mb-4">
                ¡Misión completada!
            </h1>

            <p class="text-gray-600 mb-8">
                Ganaste {{ earnedXp }} XP
            </p>

            <div class="grid md:grid-cols-2 gap-4 text-left mb-8">
                <div v-for="(value, key) in scores" :key="key" class="border rounded-2xl p-4">
                    <div class="font-semibold">
                        {{ formatLabel(key) }}
                    </div>

                    <div class="text-violet-600 text-2xl font-bold">
                        +{{ value }}
                    </div>
                </div>
            </div>

            <button @click="$router.push('/profiles')" class="bg-violet-600 text-white px-8 py-3 rounded-2xl">
                Ver Perfil Integral
            </button>
        </div>

    </div>

    <div v-else class="text-center py-20">
        Juego no encontrado
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useGamesStore } from '../../stores/games'
import { useStudentsStore } from '../../stores/students'
import { useResultsStore } from '../../stores/results'

import { getLevelFromXp } from '../../utils/levelSystem'
import { useAchievementsStore } from '../../stores/achievements'
const route = useRoute()

const gamesStore = useGamesStore()
const studentsStore = useStudentsStore()
const resultsStore = useResultsStore()
const achievementsStore = useAchievementsStore()
const started = ref(false)
const finished = ref(false)

const selectedStudent = ref('')
const currentIndex = ref(0)

const earnedXp = ref(0)

const scores = ref({
    criticalThinking: 0,
    teamwork: 0,
    empathy: 0,
    leadership: 0,
    resilience: 0
})

const game = computed(() => {
    return gamesStore.games.find(
        g => g.id === Number(route.params.id)
    )
})

const currentQuestion = computed(() => {
    return game.value.questions[currentIndex.value]
})

const startGame = () => {
    started.value = true
}
const ensureStudentStructure = (student) => {

    if (!student.profile) {

        student.profile = {
            criticalThinking: 0,
            teamwork: 0,
            empathy: 0,
            leadership: 0,
            resilience: 0
        }

    }

    if (!student.badges) {
        student.badges = []
    }

    if (!student.xp) {
        student.xp = 0
    }

    if (!student.level) {
        student.level = 1
    }

}
const answer = (option) => {

    Object.keys(option.scores).forEach(key => {

        if (!scores.value[key]) {
            scores.value[key] = 0
        }

        scores.value[key] += option.scores[key]

    })

    if (
        currentIndex.value <
        game.value.questions.length - 1
    ) {

        currentIndex.value++

    } else {

        finishGame()

    }
}

const finishGame = () => {

  const student =
    studentsStore.students.find(
      s => s.id == selectedStudent.value
    )

  if (!student) return

  ensureStudentStructure(student)

  const competencyXp =
    Object.values(scores.value)
      .reduce((a, b) => a + b, 0)

  earnedXp.value =
    competencyXp +
    (game.value.xpReward || 0)

  Object.keys(scores.value)
    .forEach(key => {

      if (!student.profile[key]) {
        student.profile[key] = 0
      }

      student.profile[key] +=
        scores.value[key]

    })

  student.xp += earnedXp.value

  student.level =
    getLevelFromXp(student.xp)

  resultsStore.addResult({

    studentId: student.id,

    gameId: game.value.id,

    competencies: {
      ...scores.value
    },

    xp: earnedXp.value,

    completedAt: new Date()

  })

  checkBadges(student)

  checkAchievements(student)

  finished.value = true

}
const checkBadges = (student) => {

  const profile =
    student.profile

  if (
    profile.criticalThinking >= 100 &&
    !student.badges.includes(1)
  ) {
    student.badges.push(1)
  }

  if (
    profile.empathy >= 100 &&
    !student.badges.includes(2)
  ) {
    student.badges.push(2)
  }

  if (
    profile.leadership >= 100 &&
    !student.badges.includes(3)
  ) {
    student.badges.push(3)
  }

  if (
    profile.teamwork >= 100 &&
    !student.badges.includes(4)
  ) {
    student.badges.push(4)
  }

  if (
    profile.resilience >= 100 &&
    !student.badges.includes(5)
  ) {
    student.badges.push(5)
  }

}
const checkAchievements = (student) => {

    achievementsStore.unlockAchievement(
        student.id,
        {
            code: 'FIRST_GAME',
            title: '🎖 Primer Juego',
            description:
                'Completó su primera misión'
        }
    )

    if (
        student.profile.criticalThinking >= 100
    ) {

        achievementsStore.unlockAchievement(
            student.id,
            {
                code: 'CRITICAL_100',
                title: '🧠 Pensador Crítico',
                description:
                    '100 puntos de pensamiento crítico'
            }
        )

    }

    if (
        student.profile.teamwork >= 100
    ) {

        achievementsStore.unlockAchievement(
            student.id,
            {
                code: 'TEAMWORK_100',
                title: '🤝 Compañero Ejemplar',
                description:
                    '100 puntos de trabajo en equipo'
            }
        )

    }

    if (
        student.profile.leadership >= 100
    ) {

        achievementsStore.unlockAchievement(
            student.id,
            {
                code: 'LEADER_100',
                title: '👑 Líder Emergente',
                description:
                    '100 puntos de liderazgo'
            }
        )

    }

    if (student.level >= 5) {

        achievementsStore.unlockAchievement(
            student.id,
            {
                code: 'LEVEL_5',
                title: '⭐ Nivel 5',
                description:
                    'Alcanzó el nivel 5'
            }
        )

    }

}

const formatLabel = (text) => {

    const labels = {
        criticalThinking: 'Pensamiento Crítico',
        teamwork: 'Trabajo en Equipo',
        empathy: 'Empatía',
        leadership: 'Liderazgo',
        resilience: 'Resiliencia'
    }

    return labels[text] || text
}
const stars = computed(() => {

    if (
        earnedXp.value >= 200
    )
        return 3

    if (
        earnedXp.value >= 120
    )
        return 2

    return 1

})
</script>