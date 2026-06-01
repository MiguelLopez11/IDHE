<template>
  <div class="space-y-8">

    <div>
      <h1 class="text-4xl font-bold">
        Mapa de Talento
      </h1>

      <p class="text-gray-500">
        Clasificación automática basada en competencias desarrolladas.
      </p>
    </div>

    <!-- Resumen -->

    <div class="grid md:grid-cols-5 gap-4">

      <div
        v-for="card in talentStats"
        :key="card.type"
        class="bg-white rounded-3xl shadow p-6 text-center"
      >
        <div class="text-5xl mb-3">
          {{ card.icon }}
        </div>

        <div class="font-bold">
          {{ card.name }}
        </div>

        <div class="text-3xl font-bold text-violet-600 mt-2">
          {{ card.count }}
        </div>
      </div>

    </div>

    <!-- Tabla -->

    <div class="bg-white rounded-3xl shadow overflow-hidden">

      <table class="w-full">

        <thead class="bg-gray-50">
          <tr>
            <th class="p-4 text-left">
              Alumno
            </th>

            <th class="p-4 text-left">
              Talento Principal
            </th>

            <th class="p-4 text-left">
              Nivel
            </th>

            <th class="p-4 text-left">
              XP
            </th>

            <th class="p-4 text-left">
              Descripción
            </th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="student in classifiedStudents"
            :key="student.id"
            class="border-t"
          >

            <td class="p-4">
              {{ student.name }}
              {{ student.lastName }}
            </td>

            <td class="p-4">
              <span
                class="px-4 py-2 rounded-full bg-violet-100 text-violet-700"
              >
                {{ student.talent.icon }}
                {{ student.talent.name }}
              </span>
            </td>

            <td class="p-4">
              {{ student.level || 1 }}
            </td>

            <td class="p-4">
              {{ student.xp || 0 }}
            </td>

            <td class="p-4 text-gray-600">
              {{ student.talent.description }}
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStudentsStore } from '../../stores/students'

const studentsStore = useStudentsStore()

const TALENTS = {
  criticalThinking: {
    name: 'Analítico',
    icon: '🧠',
    description:
      'Destaca resolviendo problemas y analizando información.'
  },

  teamwork: {
    name: 'Colaborativo',
    icon: '🤝',
    description:
      'Trabaja eficazmente con otras personas.'
  },

  leadership: {
    name: 'Líder',
    icon: '👑',
    description:
      'Influye positivamente en grupos y equipos.'
  },

  empathy: {
    name: 'Empático',
    icon: '❤️',
    description:
      'Comprende y apoya emocionalmente a otros.'
  },

  resilience: {
    name: 'Resiliente',
    icon: '🔥',
    description:
      'Supera dificultades y se adapta a cambios.'
  }
}

const classifiedStudents = computed(() => {

  return studentsStore.students.map(student => {

    const profile = student.profile || {}

    const competencies = {
      criticalThinking:
        profile.criticalThinking || 0,

      teamwork:
        profile.teamwork || 0,

      leadership:
        profile.leadership || 0,

      empathy:
        profile.empathy || 0,

      resilience:
        profile.resilience || 0
    }

    const strongest =
      Object.entries(competencies)
        .sort((a,b) => b[1] - a[1])[0][0]

    return {
      ...student,
      talent: TALENTS[strongest]
    }

  })

})

const talentStats = computed(() => {

  const counters = {
    Analítico:0,
    Colaborativo:0,
    Líder:0,
    Empático:0,
    Resiliente:0
  }

  classifiedStudents.value.forEach(student => {
    counters[student.talent.name]++
  })

  return [
    {
      type:'analitico',
      icon:'🧠',
      name:'Analíticos',
      count:counters['Analítico']
    },
    {
      type:'colaborativo',
      icon:'🤝',
      name:'Colaborativos',
      count:counters['Colaborativo']
    },
    {
      type:'lider',
      icon:'👑',
      name:'Líderes',
      count:counters['Líder']
    },
    {
      type:'empatico',
      icon:'❤️',
      name:'Empáticos',
      count:counters['Empático']
    },
    {
      type:'resiliente',
      icon:'🔥',
      name:'Resilientes',
      count:counters['Resiliente']
    }
  ]

})
</script>