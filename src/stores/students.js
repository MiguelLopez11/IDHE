import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useStudentsStore = defineStore('students', () => {
  const students = ref([])

  const STORAGE_KEY = 'students'

  const loadFromStorage = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) students.value = JSON.parse(saved)
  }

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students.value))
  }

  loadFromStorage()
  watch(students, saveToStorage, { deep: true })

  // CRUD Mejorado
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
    const index = students.value.findIndex(s => s.id === id)
    if (index !== -1) {
      students.value.splice(index, 1)   // ← Cambiamos a splice (más reactivo)
    }
  }

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent
  }
})