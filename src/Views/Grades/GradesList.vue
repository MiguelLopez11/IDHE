<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold text-gray-900">Calificaciones</h1>
        <p class="text-gray-600">{{ gradesWithDetails.length }} calificaciones registradas</p>
      </div>
      <button @click="openCreateModal" class="flex items-center gap-2 bg-violet-600 text-white px-6 py-3.5 rounded-2xl font-semibold hover:bg-violet-700">
        <span class="text-xl">+</span> Nueva Calificación
      </button>
    </div>

    <div class="bg-white rounded-3xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left">Alumno</th>
            <th class="px-6 py-4 text-left">Materia</th>
            <th class="px-6 py-4 text-left">Calificación</th>
            <th class="px-6 py-4 text-left">Fecha</th>
            <th class="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="grade in gradesWithDetails" :key="grade.id" class="hover:bg-gray-50">
            <td class="px-6 py-5 font-medium">
              {{ grade.student?.name }} {{ grade.student?.lastName }}
            </td>
            <td class="px-6 py-5">{{ grade.subject?.name }}</td>
            <td class="px-6 py-5">
              <span class="px-4 py-1.5 rounded-full text-sm font-semibold"
                :class="grade.grade >= 9 ? 'bg-emerald-100 text-emerald-700' : 
                        grade.grade >= 7 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'">
                {{ grade.grade }}
              </span>
            </td>
            <td class="px-6 py-5 text-gray-600">{{ grade.date }}</td>
            <td class="px-6 py-5 text-center space-x-4">
              <button @click="editGrade(grade)" class="text-indigo-600 text-xl">✏️</button>
              <button @click="deleteGrade(grade.id)" class="text-red-600 text-xl">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <GradeModal v-model="showModal" :grade="selectedGrade" @save="saveGrade" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGradesStore } from '../../stores/grades'
import GradeModal from './GradeModal.vue'

const gradesStore = useGradesStore()
const gradesWithDetails = gradesStore.gradesWithDetails

const showModal = ref(false)
const selectedGrade = ref(null)

const openCreateModal = () => { selectedGrade.value = null; showModal.value = true }
const editGrade = (grade) => { selectedGrade.value = {...grade}; showModal.value = true }

const saveGrade = (data) => {
  if (data.id) gradesStore.updateGrade(data)
  else gradesStore.addGrade(data)
  showModal.value = false
}

const deleteGrade = (id) => {
  if (confirm('¿Eliminar esta calificación?')) gradesStore.deleteGrade(id)
}
</script>