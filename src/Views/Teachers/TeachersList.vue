<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold text-gray-900">Maestros</h1>
        <p class="text-gray-600">{{ store.teachers.length }} maestros registrados</p>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 bg-violet-600 text-white px-6 py-3.5 rounded-2xl font-semibold hover:bg-violet-700 transition"
      >
        <span class="text-xl">+</span> Nuevo Maestro
      </button>
    </div>

    <div class="bg-white rounded-3xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left">Maestro</th>
            <th class="px-6 py-4 text-left">Correo</th>
            <th class="px-6 py-4 text-left">Teléfono</th>
            <th class="px-6 py-4 text-left">Materia</th>
            <th class="px-6 py-4 text-left">Experiencia</th>
            <th class="px-6 py-4 text-center w-32">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr 
            v-for="teacher in store.teachers" 
            :key="teacher.id" 
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-5 font-medium">{{ teacher.name }} {{ teacher.lastName }}</td>
            <td class="px-6 py-5 text-gray-600">{{ teacher.email }}</td>
            <td class="px-6 py-5 text-gray-600">{{ teacher.phone }}</td>
            <td class="px-6 py-5">
              <span class="px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                {{ teacher.subject }}
              </span>
            </td>
            <td class="px-6 py-5 text-gray-600">{{ teacher.experience }} años</td>
            <td class="px-6 py-5 text-center space-x-4">
              <button @click="editTeacher(teacher)" class="text-indigo-600 hover:text-indigo-800 text-xl">✏️</button>
              <button @click="deleteTeacher(teacher.id)" class="text-red-600 hover:text-red-800 text-xl">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="store.teachers.length === 0" class="py-24 text-center text-gray-500">
        No hay maestros registrados
      </div>
    </div>
  </div>

  <TeacherModal
    v-model="showModal"
    :teacher="selectedTeacher"
    @save="saveTeacher"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useTeachersStore } from '../../stores/teachers'
import TeacherModal from './TeacherModal.vue'

const store = useTeachersStore()

const showModal = ref(false)
const selectedTeacher = ref(null)

const openCreateModal = () => {
  selectedTeacher.value = null
  showModal.value = true
}

const editTeacher = (teacher) => {
  selectedTeacher.value = { ...teacher }
  showModal.value = true
}

const saveTeacher = (teacherData) => {
  if (teacherData.id) {
    store.updateTeacher(teacherData)
  } else {
    store.addTeacher(teacherData)
  }
  showModal.value = false
}

const deleteTeacher = (id) => {
  store.deleteTeacher(id)
}
</script>