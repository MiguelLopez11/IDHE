import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBadgesStore = defineStore(
  'badges',
  () => {

    const badges = ref([
      {
        id:1,
        name:'Pensador Estratégico',
        icon:'🧠',
        description:'100 puntos en pensamiento crítico'
      },
      {
        id:2,
        name:'Embajador de la Empatía',
        icon:'❤️',
        description:'100 puntos en empatía'
      },
      {
        id:3,
        name:'Líder del Grupo',
        icon:'👑',
        description:'100 puntos en liderazgo'
      },
      {
        id:4,
        name:'Maestro de la Colaboración',
        icon:'🤝',
        description:'100 puntos en trabajo en equipo'
      },
      {
        id:5,
        name:'Espíritu Inquebrantable',
        icon:'🔥',
        description:'100 puntos en resiliencia'
      }
    ])

    return {
      badges
    }

  }
)