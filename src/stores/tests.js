import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTestsStore = defineStore('tests', () => {

  const tests = ref([
    {
      id: 1,
      name: 'Pensamiento Crítico',
      dimensions: [
        'Análisis',
        'Argumentación',
        'Resolución de Problemas'
      ]
    },
    {
      id: 2,
      name: 'Competencias Socioemocionales',
      dimensions: [
        'Empatía',
        'Autocontrol',
        'Trabajo en Equipo'
      ]
    },
    {
      id: 3,
      name: 'Proyecto de Vida',
      dimensions: [
        'Metas',
        'Planeación',
        'Toma de Decisiones'
      ]
    }
  ])

  return {
    tests
  }
})