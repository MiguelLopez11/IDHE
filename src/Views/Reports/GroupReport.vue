<template>
  <div class="max-w-7xl mx-auto p-6">

    <h1 class="text-4xl font-bold mb-8">
      Reporte Grupal
    </h1>

    <!-- FILTROS -->
    <div class="bg-white rounded-3xl shadow p-6 mb-8">

      <h2 class="text-xl font-semibold mb-4">
        Filtros
      </h2>

      <div class="grid md:grid-cols-2 gap-4">

        <div>
          <label class="block mb-2 font-medium">
            Grado
          </label>

          <select
            v-model="selectedGrade"
            class="w-full border rounded-2xl p-3"
          >
            <option value="">
              Todos los grados
            </option>

            <option
              v-for="grade in grades"
              :key="grade"
              :value="grade"
            >
              {{ grade }}
            </option>

          </select>
        </div>

        <div>
          <label class="block mb-2 font-medium">
            Grupo
          </label>

          <select
            v-model="selectedGroup"
            class="w-full border rounded-2xl p-3"
          >
            <option value="">
              Todos los grupos
            </option>

            <option
              v-for="group in groups"
              :key="group"
              :value="group"
            >
              {{ group }}
            </option>

          </select>
        </div>

      </div>

    </div>

    <!-- RESUMEN -->
    <div class="grid md:grid-cols-4 gap-4 mb-8">

      <div class="bg-white rounded-3xl shadow p-6">
        <div class="text-gray-500 text-sm">
          Alumnos
        </div>

        <div class="text-4xl font-bold text-violet-600">
          {{ filteredStudents.length }}
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow p-6">
        <div class="text-gray-500 text-sm">
          XP Promedio
        </div>

        <div class="text-4xl font-bold text-green-600">
          {{ averageXp }}
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow p-6">
        <div class="text-gray-500 text-sm">
          Nivel Promedio
        </div>

        <div class="text-4xl font-bold text-blue-600">
          {{ averageLevel }}
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow p-6">
        <div class="text-gray-500 text-sm">
          Competencia Líder
        </div>

        <div class="text-xl font-bold text-orange-600">
          {{ strongestCompetency }}
        </div>
      </div>

    </div>

    <!-- PROMEDIOS -->
    <div class="bg-white rounded-3xl shadow p-6 mb-8">

      <h2 class="text-2xl font-bold mb-6">
        Promedio de Competencias
      </h2>

      <div class="grid md:grid-cols-5 gap-4">

        <div
          v-for="item in competencyAverages"
          :key="item.name"
          class="border rounded-2xl p-4 text-center"
        >
          <div class="font-semibold mb-2">
            {{ item.label }}
          </div>

          <div class="text-3xl font-bold text-violet-600">
            {{ item.average }}
          </div>
        </div>

      </div>

    </div>

    <!-- TABLA -->
    <div class="bg-white rounded-3xl shadow overflow-hidden">

      <table class="w-full">

        <thead class="bg-gray-50">

          <tr>
            <th class="p-4 text-left">Alumno</th>
            <th class="p-4 text-center">Grado</th>
            <th class="p-4 text-center">Grupo</th>
            <th class="p-4 text-center">Nivel</th>
            <th class="p-4 text-center">XP</th>
          </tr>

        </thead>

        <tbody>

          <tr
            v-for="student in filteredStudents"
            :key="student.id"
            class="border-t"
          >
            <td class="p-4">
              {{ student.name }}
              {{ student.lastName }}
            </td>

            <td class="text-center">
              {{ student.grade }}
            </td>

            <td class="text-center">
              {{ student.group }}
            </td>

            <td class="text-center">
              {{ student.level || 1 }}
            </td>

            <td class="text-center">
              {{ student.xp || 0 }}
            </td>
          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStudentsStore } from '../../stores/students'

const studentsStore = useStudentsStore()

const selectedGrade = ref('')
const selectedGroup = ref('')

const grades = computed(() => {

  return [
    ...new Set(
      studentsStore.students
        .map(s => s.grade)
        .filter(Boolean)
    )
  ]

})

const groups = computed(() => {

  return [
    ...new Set(
      studentsStore.students
        .map(s => s.group)
        .filter(Boolean)
    )
  ]

})

const filteredStudents = computed(() => {

  return studentsStore.students.filter(student => {

    const gradeMatch =
      !selectedGrade.value ||
      student.grade === selectedGrade.value

    const groupMatch =
      !selectedGroup.value ||
      student.group === selectedGroup.value

    return gradeMatch && groupMatch

  })

})

const averageXp = computed(() => {

  if (!filteredStudents.value.length) return 0

  const total = filteredStudents.value.reduce(
    (sum, student) =>
      sum + (student.xp || 0),
    0
  )

  return Math.round(
    total / filteredStudents.value.length
  )

})

const averageLevel = computed(() => {

  if (!filteredStudents.value.length) return 0

  const total = filteredStudents.value.reduce(
    (sum, student) =>
      sum + (student.level || 1),
    0
  )

  return (
    total / filteredStudents.value.length
  ).toFixed(1)

})

const competencies = [
  {
    name: 'criticalThinking',
    label: 'Pensamiento Crítico'
  },
  {
    name: 'teamwork',
    label: 'Trabajo en Equipo'
  },
  {
    name: 'leadership',
    label: 'Liderazgo'
  },
  {
    name: 'empathy',
    label: 'Empatía'
  },
  {
    name: 'resilience',
    label: 'Resiliencia'
  }
]

const competencyAverages = computed(() => {

  return competencies.map(comp => {

    const total =
      filteredStudents.value.reduce(
        (sum, student) =>
          sum +
          (
            student.profile?.[comp.name]
            || 0
          ),
        0
      )

    const average =
      filteredStudents.value.length
        ? Math.round(
            total /
            filteredStudents.value.length
          )
        : 0

    return {
      ...comp,
      average
    }

  })

})

const strongestCompetency = computed(() => {

  const best =
    competencyAverages.value.sort(
      (a,b) => b.average - a.average
    )[0]

  return best?.label || '-'

})
</script>