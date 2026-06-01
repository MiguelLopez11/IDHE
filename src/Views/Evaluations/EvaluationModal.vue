<template>
  <BaseModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :title="isEdit ? 'Editar Evaluación' : 'Nueva Evaluación'"
    @confirm="handleSubmit"
    :loading="loading"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">

      <!-- Alumno -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Alumno
        </label>

        <select
          v-model="form.studentId"
          class="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Seleccionar alumno</option>

          <option
            v-for="student in studentsStore.students"
            :key="student.id"
            :value="student.id"
          >
            {{ student.name }} {{ student.lastName }}
          </option>
        </select>
      </div>

      <!-- Test -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Evaluación
        </label>

        <select
          v-model="form.testId"
          class="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Seleccionar evaluación</option>

          <option
            v-for="test in testsStore.tests"
            :key="test.id"
            :value="test.id"
          >
            {{ test.name }}
          </option>
        </select>
      </div>

      <!-- Dimensiones -->
      <div
        v-for="dimension in selectedDimensions"
        :key="dimension"
      >
        <BaseInput
          v-model="form.scores[dimension]"
          :label="dimension"
          type="number"
        />
      </div>

    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

import BaseModal from '../../components/BaseModal.vue'
import BaseInput from '../../components/BaseInput.vue'

import { useStudentsStore } from '../../stores/students'
import { useTestsStore } from '../../stores/tests'

const studentsStore = useStudentsStore()
const testsStore = useTestsStore()

const props = defineProps({
  modelValue: Boolean,
  evaluation: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  'update:modelValue',
  'save'
])

const loading = ref(false)
const isEdit = ref(false)

const form = ref({
  id: null,
  studentId: '',
  testId: '',
  scores: {}
})

const selectedDimensions = computed(() => {

  const test = testsStore.tests.find(
    t => t.id === Number(form.value.testId)
  )

  return test?.dimensions || []

})

watch(
  () => form.value.testId,
  () => {

    const newScores = {}

    selectedDimensions.value.forEach(dimension => {

      newScores[dimension] =
        form.value.scores[dimension] || ''

    })

    form.value.scores = newScores
  }
)

watch(
  () => props.evaluation,
  (value) => {

    if(value){

      form.value = {
        id: value.id,
        studentId: value.studentId,
        testId: value.testId,
        scores: { ...value.scores }
      }

      isEdit.value = true

    }else{

      form.value = {
        id: null,
        studentId: '',
        testId: '',
        scores: {}
      }

      isEdit.value = false

    }

  },
  { immediate:true }
)

const handleSubmit = () => {

  loading.value = true

  setTimeout(() => {

    emit('save', {
      ...form.value
    })

    loading.value = false

    emit('update:modelValue', false)

  },500)

}
</script>