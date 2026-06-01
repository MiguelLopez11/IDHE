<template>
  <div class="space-y-8">

    <h1 class="text-4xl font-bold">
      Temporada Actual
    </h1>

    <div
      class="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-3xl p-10"
    >
      <h2 class="text-4xl font-bold mb-4">
        {{ season.name }}
      </h2>

      <p class="mb-6">
        {{ season.description }}
      </p>

      <div class="grid md:grid-cols-2 gap-6">

        <div>
          <div class="text-sm opacity-80">
            Inicio
          </div>

          <div class="text-xl font-bold">
            {{ season.startDate }}
          </div>
        </div>

        <div>
          <div class="text-sm opacity-80">
            Fin
          </div>

          <div class="text-xl font-bold">
            {{ season.endDate }}
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { useSeasonsStore } from '../../stores/seasons'

const seasonsStore = useSeasonsStore()

const season = seasonsStore.currentSeason
</script>