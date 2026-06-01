<template>
  <BaseModal :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)"
    :title="isEdit ? 'Editar Alumno' : 'Nuevo Alumno'" @confirm="handleSubmit" :loading="loading">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <BaseInput v-model="form.name" label="Nombre(s)" required />
      <BaseInput v-model="form.lastName" label="Apellidos" required />
      <BaseInput v-model="form.email" label="Correo electrónico" type="email" required />
      <BaseInput v-model="form.grade" label="Grado" required />

      <BaseInput v-model="form.group" label="Grupo" required />

      <div class="grid grid-cols-2 gap-4">
        <BaseInput v-model="form.age" label="Edad" type="number" required />
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseModal from '../../components/BaseModal.vue'
import BaseInput from '../../components/BaseInput.vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  student: { type: Object, default: null }
})

const emit = defineEmits(['update:modelValue', 'save'])

const isEdit = ref(false)
const loading = ref(false)

const form = ref({
  id: null,
  name: '',
  lastName: '',
  email: '',
  age: '',
  grade: ''
})

watch(() => props.student, (val) => {
  if (val) {
    form.value = { ...val }
    isEdit.value = true
  } else {
    form.value = { id: null, name: '', lastName: '', email: '', age: '', grade: '' }
    isEdit.value = false
  }
}, { immediate: true })

const handleSubmit = () => {
  loading.value = true
  setTimeout(() => {
    emit('save', { ...form.value })
    loading.value = false
    emit('update:modelValue', false)
  }, 500)
}
</script>