<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold text-gray-900">Alumnos</h1>
        <p class="text-gray-600">{{ students.length }} estudiantes registrados</p>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 bg-violet-600 text-white px-6 py-3.5 rounded-2xl font-semibold hover:bg-violet-700 transition"
      >
        <span class="text-xl">+</span> Nuevo Alumno
      </button>
    </div>

    <div class="bg-white rounded-3xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left">Alumno</th>
            <th class="px-6 py-4 text-left">Correo</th>
            <th class="px-6 py-4 text-left">Edad</th>
            <th class="px-6 py-4 text-left">Grado</th>
            <th class="px-6 py-4 text-center w-32">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr 
            v-for="student in students" 
            :key="student.id" 
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-5 font-medium">{{ student.name }} {{ student.lastName }}</td>
            <td class="px-6 py-5 text-gray-600">{{ student.email }}</td>
            <td class="px-6 py-5 text-gray-600">{{ student.age }} años</td>
            <td class="px-6 py-5">
              <span class="px-4 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                {{ student.grade }}
              </span>
            </td>
            <td class="px-6 py-5 text-center space-x-4">
              <button @click="editStudent(student)" class="text-indigo-600 hover:text-indigo-800 text-xl">✏️</button>
              <button @click="deleteStudent(student.id)" class="text-red-600 hover:text-red-800 text-xl">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="students.length === 0" class="py-24 text-center text-gray-500">
        No hay alumnos registrados
      </div>
    </div>
  </div>

  <StudentModal
    v-model="showModal"
    :student="selectedStudent"
    @save="saveStudent"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useStudentsStore } from '../../stores/students'
import StudentModal from './StudentModal.vue'

const store = useStudentsStore()

const students = store.students
const showModal = ref(false)
const selectedStudent = ref(null)

const openCreateModal = () => {
  selectedStudent.value = null
  showModal.value = true
}

const editStudent = (student) => {
  selectedStudent.value = { ...student }
  showModal.value = true
}

const saveStudent = (studentData) => {
  if (studentData.id) {
    store.updateStudent(studentData)
  } else {
    store.addStudent(studentData)
  }
}

const deleteStudent = (id) => {
  if (confirm('¿Estás seguro de eliminar este alumno?')) {
    store.deleteStudent(id)
  }
}
</script>