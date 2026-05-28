import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTeachersStore = defineStore('teachers', () => {
  const teachers = ref([
    {
      id: 1,
      name: 'Carlos',
      lastName: 'Ramírez López',
      email: 'carlos.ramirez@idhe.com',
      phone: '5512345678',
      subject: 'Matemáticas',
      experience: 8,
      grade: 'Secundaria'
    },
    {
      id: 2,
      name: 'Ana',
      lastName: 'Martínez García',
      email: 'ana.martinez@idhe.com',
      phone: '5587654321',
      subject: 'Historia',
      experience: 12,
      grade: 'Bachillerato'
    }
  ])

  const addTeacher = (teacher) => {
    const newTeacher = {
      ...teacher,
      id: Date.now()
    }
    teachers.value.push(newTeacher)
  }

  const updateTeacher = (updatedTeacher) => {
    const index = teachers.value.findIndex(t => t.id === updatedTeacher.id)
    if (index !== -1) {
      teachers.value[index] = { ...updatedTeacher }
    }
  }

  const deleteTeacher = (id) => {
    if (confirm('¿Estás seguro de eliminar este maestro?')) {
      teachers.value = teachers.value.filter(t => t.id !== id)
    }
  }

  return {
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher
  }
})