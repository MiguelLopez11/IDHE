<template>
  <BaseModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :title="isEdit ? 'Editar Reto' : 'Nuevo Reto'"
    @confirm="handleSubmit"
  >

    <form class="space-y-5">

      <BaseInput
        v-model="form.title"
        label="Título"
        required
      />

      <BaseInput
        v-model="form.description"
        label="Descripción"
        required
      />

      <!-- Categoría -->
      <div>
        <label class="block mb-2 font-medium">
          Categoría
        </label>

        <select
          v-model="form.category"
          class="w-full border rounded-xl px-4 py-3"
        >
          <option>Pensamiento Crítico</option>
          <option>Socioemocional</option>
          <option>Liderazgo</option>
          <option>Trabajo en Equipo</option>
          <option>Resiliencia</option>
        </select>
      </div>

      <!-- Dificultad -->
      <div>
        <label class="block mb-2 font-medium">
          Dificultad
        </label>

        <select
          v-model="form.difficulty"
          class="w-full border rounded-xl px-4 py-3"
        >
          <option>Fácil</option>
          <option>Intermedio</option>
          <option>Avanzado</option>
        </select>
      </div>

      <div class="grid grid-cols-3 gap-4">

        <BaseInput
          v-model="form.requiredLevel"
          label="Nivel requerido"
          type="number"
        />

        <BaseInput
          v-model="form.xpReward"
          label="XP"
          type="number"
        />

        <BaseInput
          v-model="form.estimatedMinutes"
          label="Minutos"
          type="number"
        />

      </div>

      <!-- Preguntas -->

      <div class="border-t pt-4">

        <div class="flex justify-between items-center mb-4">

          <h3 class="font-bold text-lg">
            Preguntas
          </h3>

          <button
            type="button"
            @click="addQuestion"
            class="bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            + Pregunta
          </button>

        </div>

        <div
          v-for="(question,index) in form.questions"
          :key="index"
          class="border rounded-2xl p-4 mb-4"
        >

          <BaseInput
            v-model="question.question"
            label="Pregunta"
          />

          <div class="mt-4">

            <div
              v-for="(option,optIndex) in question.options"
              :key="optIndex"
              class="border rounded-xl p-3 mb-3"
            >

              <BaseInput
                v-model="option.text"
                label="Opción"
              />

              <div class="grid grid-cols-5 gap-2 mt-3">

                <BaseInput
                  v-model="option.scores.criticalThinking"
                  label="Crítico"
                  type="number"
                />

                <BaseInput
                  v-model="option.scores.teamwork"
                  label="Equipo"
                  type="number"
                />

                <BaseInput
                  v-model="option.scores.empathy"
                  label="Empatía"
                  type="number"
                />

                <BaseInput
                  v-model="option.scores.leadership"
                  label="Liderazgo"
                  type="number"
                />

                <BaseInput
                  v-model="option.scores.resilience"
                  label="Resiliencia"
                  type="number"
                />

              </div>

              <button
                type="button"
                @click="removeOption(index,optIndex)"
                class="mt-3 text-red-600"
              >
                Eliminar opción
              </button>

            </div>

            <button
              type="button"
              @click="addOption(index)"
              class="bg-blue-600 text-white px-3 py-2 rounded-xl"
            >
              + Opción
            </button>

          </div>

          <button
            type="button"
            @click="removeQuestion(index)"
            class="mt-4 text-red-600"
          >
            Eliminar pregunta
          </button>

        </div>

      </div>

    </form>

  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

import BaseModal from '../../components/BaseModal.vue'
import BaseInput from '../../components/BaseInput.vue'

const props = defineProps({
  modelValue: Boolean,
  game: Object
})

const emit = defineEmits([
  'update:modelValue',
  'save'
])

const isEdit = computed(() =>
  !!form.value.id
)

const emptyGame = () => ({
  id: null,
  title: '',
  description: '',
  category: 'Pensamiento Crítico',
  difficulty: 'Fácil',
  requiredLevel: 1,
  xpReward: 100,
  estimatedMinutes: 10,
  questions: []
})

const form = ref(
  emptyGame()
)

watch(
  () => props.game,
  value => {

    if (value) {

      form.value =
        JSON.parse(
          JSON.stringify(value)
        )

    } else {

      form.value =
        emptyGame()

    }

  },
  { immediate: true }
)

const addQuestion = () => {

  form.value.questions.push({
    question: '',
    options: []
  })

}

const removeQuestion = (index) => {

  form.value.questions.splice(
    index,
    1
  )

}

const addOption = (questionIndex) => {

  form.value.questions[
    questionIndex
  ].options.push({

    text: '',

    scores: {
      criticalThinking: 0,
      teamwork: 0,
      empathy: 0,
      leadership: 0,
      resilience: 0
    }

  })

}

const removeOption = (
  questionIndex,
  optionIndex
) => {

  form.value.questions[
    questionIndex
  ].options.splice(
    optionIndex,
    1
  )

}

const handleSubmit = () => {

  emit(
    'save',
    JSON.parse(
      JSON.stringify(form.value)
    )
  )

}
</script>