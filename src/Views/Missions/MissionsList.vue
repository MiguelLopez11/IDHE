<template>
  <div class="space-y-8">

    <h1 class="text-4xl font-bold">
      Misiones Semanales
    </h1>

    <div
      v-for="mission in missions"
      :key="mission.id"
      class="bg-white rounded-3xl shadow p-8"
    >
      <div class="flex justify-between items-center">

        <div>

          <h2 class="text-2xl font-bold">
            {{ mission.title }}
          </h2>

          <p class="text-gray-500">
            {{ mission.description }}
          </p>

        </div>

        <div
          class="bg-violet-100 text-violet-700 px-4 py-2 rounded-full font-bold"
        >
          +{{ mission.rewardXp }} XP
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { useMissionsStore } from '../../stores/missions'

const missionsStore = useMissionsStore()

const missions = missionsStore.missions
</script>