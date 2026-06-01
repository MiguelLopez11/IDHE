<template>
  <BaseModal :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)"
    :title="isEdit ? 'Editar Materia' : 'Nueva Materia'" @confirm="handleSubmit">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <BaseInput v-model="form.name" label="Nombre de la Materia" required />
      <BaseInput v-model="form.level" label="Nivel" required />
      <BaseInput v-model="form.hours" label="Horas Semanales" type="number" required />

      <!-- Asignar Maestros -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">Maestros que imparten esta materia</label>

        <select v-model="selectedTeacherId" @change="assignTeacher"
          class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-violet-500">
          <option value="">Seleccionar maestro...</option>
          <option v-for="teacher in availableTeachers" :key="teacher.id" :value="teacher.id">
            {{ teacher.name }} {{ teacher.lastName }}
          </option>
        </select>

        <div class="flex flex-wrap gap-2 mt-4">
          <span v-for="(teacher, index) in currentTeachers" :key="index"
            class="bg-violet-100 text-violet-700 px-4 py-2 rounded-2xl text-sm flex items-center gap-2">
            {{ teacher.name }} {{ teacher.lastName }}
            <button type="button" @click="removeTeacher(teacher.id)"
              class="ml-1 text-red-500 hover:text-red-700">×</button>
          </span>
        </div>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useTeachersStore } from '../../stores/teachers'
import BaseModal from '../../components/BaseModal.vue'
import BaseInput from '../../components/BaseInput.vue'

const props = defineProps({ modelValue: Boolean, subject: Object })
const emit = defineEmits(['update:modelValue', 'save'])

const teachersStore = useTeachersStore()

const selectedTeacherId = ref('')
const isEdit = ref(false)

const form = ref({
  id: null,
  name: '',
  level: '',
  hours: '',
  teacherIds: []
})

const currentTeachers = computed(() => {
  return form.value.teacherIds.map(id =>
    teachersStore.teachers.find(t => t.id === id)
  ).filter(Boolean)
})

const availableTeachers = computed(() => {
  return teachersStore.teachers.filter(t =>
    !form.value.teacherIds.includes(t.id)
  )
})

watch(() => props.subject, (val) => {
  if (val) {
    form.value = { ...val, teacherIds: [...(val.teacherIds || [])] }
    isEdit.value = true
  } else {
    form.value = { id: null, name: '', level: '', hours: '', teacherIds: [] }
    isEdit.value = false
  }
}, { immediate: true })

const assignTeacher = () => {
  if (selectedTeacherId.value) {
    form.value.teacherIds.push(Number(selectedTeacherId.value))
    selectedTeacherId.value = ''
  }
}

const removeTeacher = (teacherId) => {
  form.value.teacherIds = form.value.teacherIds.filter(id => id !== teacherId)
}

const handleSubmit = () => {

  console.log('Enviando formulario')

  emit('save', {
    ...form.value
  })

  emit('update:modelValue', false)
}
</script>