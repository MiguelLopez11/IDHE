import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useTeachersStore } from './teachers'

export const useSubjectsStore = defineStore('subjects', () => {
  const subjects = ref([
    { 
      id: 1, 
      name: 'Matemáticas', 
      level: 'Secundaria', 
      hours: 5,
      teacherIds: [1] 
    },
    { 
      id: 2, 
      name: 'Historia', 
      level: 'Secundaria', 
      hours: 4,
      teacherIds: [2] 
    },
    { 
      id: 3, 
      name: 'Física', 
      level: 'Bachillerato', 
      hours: 6,
      teacherIds: [1] 
    },
    { 
      id: 4, 
      name: 'Literatura', 
      level: 'Secundaria', 
      hours: 4,
      teacherIds: [] 
    },
  ])

  const teachersStore = useTeachersStore()

  // Computed: Materias con información completa del maestro
  const subjectsWithTeachers = computed(() => {
    return subjects.value.map(subject => ({
      ...subject,
      teachers: subject.teacherIds.map(id => 
        teachersStore.teachers.find(t => t.id === id)
      ).filter(Boolean) // Elimina nulls
    }))
  })

 const addSubject = (subject) => {
  subjects.value.push({
    ...subject,
    id: Date.now()
  })
}

 const updateSubject = (updated) => {

  const index = subjects.value.findIndex(
    s => s.id === updated.id
  )

  if (index !== -1) {

    subjects.value[index] = {
      id: updated.id,
      name: updated.name,
      level: updated.level,
      hours: updated.hours,
      teacherIds: [...updated.teacherIds]
    }

  }
}

const deleteSubject = (id) => {

  const index = subjects.value.findIndex(
    s => s.id === id
  )

  if (index !== -1) {
    subjects.value.splice(index, 1)
  }
}

  // Agregar/Quitar maestro a una materia
  const assignTeacherToSubject = (subjectId, teacherId) => {
    const subject = subjects.value.find(s => s.id === subjectId)
    if (subject && !subject.teacherIds.includes(teacherId)) {
      subject.teacherIds.push(teacherId)
    }
  }

  const removeTeacherFromSubject = (subjectId, teacherId) => {
    const subject = subjects.value.find(s => s.id === subjectId)
    if (subject) {
      subject.teacherIds = subject.teacherIds.filter(id => id !== teacherId)
    }
  }

  return {
    subjects,
    subjectsWithTeachers,
    addSubject,
    updateSubject,
    deleteSubject,
    assignTeacherToSubject,
    removeTeacherFromSubject
  }
})