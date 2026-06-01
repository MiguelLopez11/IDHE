<template>
    <div class="p-6 max-w-7xl mx-auto">

        <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900">
                Ranking General
            </h1>

            <p class="text-gray-600">
                Clasificación global de estudiantes
            </p>
        </div>

        <div class="bg-white rounded-3xl shadow overflow-hidden">

            <table class="w-full">

                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-4 text-left">
                            Posición
                        </th>

                        <th class="px-6 py-4 text-left">
                            Alumno
                        </th>

                        <th class="px-6 py-4 text-center">
                            Nivel
                        </th>

                        <th class="px-6 py-4 text-center">
                            XP
                        </th>

                        <th class="px-6 py-4 text-center">
                            Logros
                        </th>

                        <th class="px-6 py-4 text-center">
                            Puntaje Total
                        </th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="(student, index) in ranking" :key="student.id" class="border-b hover:bg-gray-50">
                        <td class="px-6 py-5 text-xl font-bold">

                            <span v-if="index === 0">
                                🥇
                            </span>

                            <span v-else-if="index === 1">
                                🥈
                            </span>

                            <span v-else-if="index === 2">
                                🥉
                            </span>

                            <span v-else>
                                {{ index + 1 }}
                            </span>

                        </td>

                        <td class="px-6 py-5 font-medium">
                            {{ student.name }}
                        </td>

                        <td class="px-6 py-5 text-center">
                            {{ student.level }}
                        </td>

                        <td class="px-6 py-5 text-center text-violet-600 font-bold">
                            {{ student.xp }}
                        </td>

                        <td class="px-6 py-5 text-center">
                            {{ student.achievements }}
                        </td>

                        <td class="px-6 py-5 text-center font-bold text-green-600">
                            {{ student.totalScore }}
                        </td>
                    </tr>

                </tbody>

            </table>

            <div v-if="ranking.length === 0" class="p-10 text-center text-gray-500">
                No hay estudiantes registrados
            </div>

        </div>

    </div>
</template>

<script setup>
import { computed } from 'vue'

import { useStudentsStore } from '../../stores/students'
import { useAchievementsStore } from '../../stores/achievements'

const studentsStore = useStudentsStore()
const achievementsStore = useAchievementsStore()

const ranking = computed(() => {

    return studentsStore.students

        .map(student => {

            const achievementCount =
                achievementsStore.achievements.filter(
                    a => a.studentId === student.id
                ).length

            const xp = student.xp || 0

            const level = student.level || 1

            return {

                id: student.id,

                name:
                    `${student.name} ${student.lastName}`,

                xp,

                level,

                achievements: achievementCount,

                totalScore:
                    xp +
                    (level * 100) +
                    (achievementCount * 50)

            }

        })

        .sort(
            (a, b) =>
                b.totalScore - a.totalScore
        )

})
</script>