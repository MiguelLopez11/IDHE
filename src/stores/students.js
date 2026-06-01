import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const createDefaultProfile = () => ({
  criticalThinking: 0,
  teamwork: 0,
  empathy: 0,
  leadership: 0,
  resilience: 0
})

const normalizeStudent = (student) => ({
  xp: 0,
  level: 1,
  badges: [],
  profile: createDefaultProfile(),
  ...student
})

export const useStudentsStore = defineStore('students', () => {

  const STORAGE_KEY = 'students'

  const students = ref([
    normalizeStudent({
      id: 1,
      name: 'María',
      lastName: 'López',
      email: 'maria.lopez@escuela.com',
      age: 17,
      grade: '6° Semestre'
    }),

    normalizeStudent({
      id: 2,
      name: 'Carlos',
      lastName: 'García',
      email: 'carlos.garcia@escuela.com',
      age: 16,
      grade: '4° Semestre'
    }),

    normalizeStudent({
      id: 3,
      name: 'Andrés',
      lastName: 'Vargas',
      email: 'andres.vargas@escuela.com',
      age: 16,
      grade: '4° Semestre'
    })
  ])

  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved) {

    students.value =
      JSON.parse(saved)
        .map(normalizeStudent)

  }

  watch(
    students,
    () => {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students.value)
      )

    },
    { deep: true }
  )

  const addStudent = (student) => {

    students.value.push(
      normalizeStudent({
        ...student,
        id: Date.now()
      })
    )

  }

  const updateStudent = (updatedStudent) => {

    const index =
      students.value.findIndex(
        s => s.id === updatedStudent.id
      )

    if (index !== -1) {

      students.value[index] =
        normalizeStudent(updatedStudent)

    }

  }

  const updateProfile = (
    studentId,
    competencies
  ) => {

    const student =
      students.value.find(
        s => s.id === studentId
      )

    if (!student) return

    Object.keys(competencies)
      .forEach(key => {

        if (!student.profile[key]) {
          student.profile[key] = 0
        }

        student.profile[key] +=
          competencies[key]

      })

  }

  const deleteStudent = (id) => {

    const index =
      students.value.findIndex(
        s => s.id === id
      )

    if (index !== -1) {

      students.value.splice(index, 1)

    }

  }

  return {
    students,
    addStudent,
    updateStudent,
    updateProfile,
    deleteStudent
  }

})