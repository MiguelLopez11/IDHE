<template>

  <div class="p-6 max-w-7xl mx-auto">

    <div class="flex justify-between items-center mb-8">

      <div>
        <h1 class="text-4xl font-bold text-gray-900">
          Evaluaciones Integrales
        </h1>

        <p class="text-gray-600">
          {{ resultsStore.results.length }}
          evaluaciones registradas
        </p>
      </div>

      <button
        @click="openCreateModal"
        class="flex items-center gap-2 bg-violet-600 text-white px-6 py-3.5 rounded-2xl font-semibold hover:bg-violet-700 transition"
      >
        <span class="text-xl">+</span>
        Nueva Evaluación
      </button>

    </div>

    <div class="bg-white rounded-3xl shadow overflow-hidden">

      <table class="w-full">

        <thead class="bg-gray-50">

          <tr>
            <th class="px-6 py-4 text-left">
              Alumno
            </th>

            <th class="px-6 py-4 text-left">
              Evaluación
            </th>

            <th class="px-6 py-4 text-left">
              Resultado
            </th>

            <th class="px-6 py-4 text-center w-32">
              Acciones
            </th>
          </tr>

        </thead>

        <tbody class="divide-y divide-gray-100">

          <tr
            v-for="result in resultsStore.results"
            :key="result.id"
            class="hover:bg-gray-50"
          >

            <td class="px-6 py-5">

              {{ getStudentName(result.studentId) }}

            </td>

            <td class="px-6 py-5">

              {{ getTestName(result.testId) }}

            </td>

            <td class="px-6 py-5">

              <span
                class="px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-medium"
              >
                {{ result.total.toFixed(1) }}
              </span>

            </td>

            <td class="px-6 py-5 text-center space-x-4">

              <button
                @click="editEvaluation(result)"
                class="text-indigo-600 hover:text-indigo-800 text-xl"
              >
                ✏️
              </button>

              <button
                @click="deleteEvaluation(result.id)"
                class="text-red-600 hover:text-red-800 text-xl"
              >
                🗑️
              </button>

            </td>

          </tr>

        </tbody>

      </table>

      <div
        v-if="resultsStore.results.length === 0"
        class="py-24 text-center text-gray-500"
      >
        No hay evaluaciones registradas
      </div>

    </div>

    <EvaluationModal
      v-model="showModal"
      :evaluation="selectedEvaluation"
      @save="saveEvaluation"
    />

  </div>

</template>

<script setup>
import { ref } from 'vue'

import EvaluationModal from './EvaluationModal.vue'

import { useResultsStore } from '../../stores/results'
import { useStudentsStore } from '../../stores/students'
import { useTestsStore } from '../../stores/tests'

const resultsStore = useResultsStore()
const studentsStore = useStudentsStore()
const testsStore = useTestsStore()

const showModal = ref(false)
const selectedEvaluation = ref(null)

const openCreateModal = () => {

  selectedEvaluation.value = null

  showModal.value = true

}

const editEvaluation = (evaluation) => {

  selectedEvaluation.value = {
    ...evaluation
  }

  showModal.value = true

}

const saveEvaluation = (evaluationData) => {

  if(evaluationData.id){

    resultsStore.updateResult(
      evaluationData
    )

  }else{

    resultsStore.addResult(
      evaluationData
    )

  }

  showModal.value = false

}

const deleteEvaluation = (id) => {

  if(confirm('¿Eliminar evaluación?')){

    resultsStore.deleteResult(id)

  }

}

const getStudentName = (id) => {

  const student =
    studentsStore.students.find(
      s => s.id === id
    )

  return student
    ? `${student.name} ${student.lastName}`
    : 'Sin alumno'

}

const getTestName = (id) => {

  const test =
    testsStore.tests.find(
      t => t.id === id
    )

  return test
    ? test.name
    : 'Sin evaluación'

}
</script>