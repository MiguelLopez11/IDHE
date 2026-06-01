import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMissionsStore = defineStore('missions', () => {

  const missions = ref([
    {
      id: 1,
      title: 'Pensador de la Semana',
      description: 'Obtén 50 puntos de pensamiento crítico',
      rewardXp: 100,
      type: 'criticalThinking',
      target: 50
    },
    {
      id: 2,
      title: 'Trabajo en Equipo',
      description: 'Obtén 50 puntos de colaboración',
      rewardXp: 100,
      type: 'teamwork',
      target: 50
    },
    {
      id: 3,
      title: 'Jugador Activo',
      description: 'Completa 3 juegos',
      rewardXp: 150,
      type: 'games',
      target: 3
    }
  ])

  return {
    missions
  }

})