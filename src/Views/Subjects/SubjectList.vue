<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold text-gray-900">Materias</h1>
        <p class="text-gray-600">{{ subjects.length }} materias registradas</p>
      </div>
      <button 
        @click="openCreateModal"
        class="flex items-center gap-2 bg-violet-600 text-white px-6 py-3.5 rounded-2xl font-semibold hover:bg-violet-700 transition"
      >
        <span class="text-xl">+</span> Nueva Materia
      </button>
    </div>

    <div class="bg-white rounded-3xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left">Materia</th>
            <th class="px-6 py-4 text-left">Nivel</th>
            <th class="px-6 py-4 text-left">Horas Semanales</th>
            <th class="px-6 py-4 text-left">Maestros Asignados</th>
            <th class="px-6 py-4 text-center w-32">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="subject in subjectsWithTeachers" :key="subject.id" class="hover:bg-gray-50">
            <td class="px-6 py-5 font-medium">{{ subject.name }}</td>
            <td class="px-6 py-5">{{ subject.level }}</td>
            <td class="px-6 py-5">{{ subject.hours }} hrs</td>
            <td class="px-6 py-5">
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="teacher in subject.teachers" 
                  :key="teacher.id"
                  class="px-3 py-1 bg-violet-100 text-violet-700 text-xs rounded-full"
                >
                  {{ teacher.name }} {{ teacher.lastName }}
                </span>
                <span v-if="subject.teachers.length === 0" class="text-gray-400 text-sm italic">
                  Sin maestro asignado
                </span>
              </div>
            </td>
            <td class="px-6 py-5 text-center space-x-4">
              <button @click="editSubject(subject)" class="text-indigo-600 hover:text-indigo-800 text-xl">✏️</button>
              <button @click="deleteSubject(subject.id)" class="text-red-600 hover:text-red-800 text-xl">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <SubjectModal 
      v-model="showModal" 
      :subject="selectedSubject" 
      @save="saveSubject" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSubjectsStore } from '../../stores/subjects'
import SubjectModal from './SubjectModal.vue'

const subjectsStore = useSubjectsStore()

const {
  subjects,
  subjectsWithTeachers
} = storeToRefs(subjectsStore)

const showModal = ref(false)
const selectedSubject = ref(null)

const openCreateModal = () => {
  selectedSubject.value = null
  showModal.value = true
}

const editSubject = (subject) => {
  selectedSubject.value = {
    id: subject.id,
    name: subject.name,
    level: subject.level,
    hours: subject.hours,
    teacherIds: [...subject.teacherIds]
  }

  showModal.value = true
}

const saveSubject = (subjectData) => {

  console.log('Guardando:', subjectData)

  if (subjectData.id) {
    subjectsStore.updateSubject(subjectData)
  } else {
    subjectsStore.addSubject(subjectData)
  }

  showModal.value = false
}

const deleteSubject = (id) => {
  if (confirm('¿Eliminar esta materia?')) {
    subjectsStore.deleteSubject(id)
  }
}
</script>