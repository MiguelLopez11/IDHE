import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useStudentsStore = defineStore('students', () => {
  const students = ref([])

  const STORAGE_KEY = 'students'

  // Cargar desde localStorage
  const loadFromStorage = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      students.value = JSON.parse(saved)
    }
  }

  // Guardar en localStorage
  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students.value))
  }

  // Cargar al iniciar
  loadFromStorage()

  // Guardar automáticamente cada vez que cambie
  watch(students, saveToStorage, { deep: true })

  // Acciones CRUD
  const addStudent = (student) => {
    student.id = Date.now()
    students.value.push(student)
  }

  const updateStudent = (updatedStudent) => {
    const index = students.value.findIndex(s => s.id === updatedStudent.id)
    if (index !== -1) {
      students.value[index] = { ...updatedStudent }
    }
  }

  const deleteStudent = (id) => {
    students.value = students.value.filter(s => s.id !== id)
  }

  const getStudentById = (id) => {
    return students.value.find(s => s.id === id)
  }

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById
  }
})