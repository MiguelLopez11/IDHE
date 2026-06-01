<template>
  <div class="space-y-8">

    <h1 class="text-4xl font-bold">
      Insignias
    </h1>

    <div
      v-for="student in students"
      :key="student.id"
      class="bg-white rounded-3xl shadow p-8"
    >
      <div class="flex justify-between mb-6">

        <div>
          <h2 class="text-2xl font-bold">
            {{ student.name }}
            {{ student.lastName }}
          </h2>

          <p class="text-gray-500">
            Nivel {{ student.level || 1 }}
          </p>
        </div>

        <div>
          {{ student.badges?.length || 0 }}
          insignias
        </div>

      </div>

      <div class="grid md:grid-cols-3 gap-4">

        <div
          v-for="badge in getStudentBadges(student)"
          :key="badge.id"
          class="border rounded-2xl p-5 text-center"
        >
          <div class="text-5xl mb-3">
            {{ badge.icon }}
          </div>

          <div class="font-bold">
            {{ badge.name }}
          </div>

          <div class="text-sm text-gray-500 mt-2">
            {{ badge.description }}
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { useStudentsStore } from '../../stores/students'
import { useBadgesStore } from '../../stores/badges'

const studentsStore = useStudentsStore()
const badgesStore = useBadgesStore()

const students = studentsStore.students

const getStudentBadges = (student) => {

  return badgesStore.badges.filter(
    badge =>
      student.badges?.includes(badge.id)
  )

}
</script>