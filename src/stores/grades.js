import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStudentsStore } from './students'
import { useSubjectsStore } from './subjects'

export const useGradesStore = defineStore('grades', () => {
  const grades = ref([])

  const studentsStore = useStudentsStore()
  const subjectsStore = useSubjectsStore()

  const addGrade = (gradeData) => {
    grades.value.push({
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...gradeData
    })
  }

  const updateGrade = (updatedGrade) => {
    const index = grades.value.findIndex(g => g.id === updatedGrade.id)
    if (index !== -1) {
      grades.value[index] = { ...updatedGrade }
    }
  }

  const deleteGrade = (id) => {
    grades.value = grades.value.filter(g => g.id !== id)
  }

  // Computed con datos completos
  const gradesWithDetails = computed(() => {
    return grades.value.map(grade => ({
      ...grade,
      student: studentsStore.students.find(s => s.id === grade.studentId),
      subject: subjectsStore.subjects.find(s => s.id === grade.subjectId)
    }))
  })

  const getStudentGrades = (studentId) => {
    return grades.value.filter(g => g.studentId === studentId)
  }

  return {
    grades,
    gradesWithDetails,
    addGrade,
    updateGrade,
    deleteGrade,
    getStudentGrades
  }
})