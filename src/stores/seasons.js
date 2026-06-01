import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSeasonsStore = defineStore('seasons', () => {

  const currentSeason = ref({
    id: 1,
    name: 'Temporada Escolar 2026',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    description:
      'Desarrolla tus habilidades socioemocionales y cognitivas.'
  })

  return {
    currentSeason
  }

})