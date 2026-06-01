<template>
  <div class="max-w-6xl mx-auto p-6">

    <h1 class="text-4xl font-bold mb-6">
      Reporte Individual
    </h1>

    <select
      v-model="studentId"
      class="border rounded-2xl p-3 mb-8"
    >
      <option value="">
        Seleccionar alumno
      </option>

      <option
        v-for="student in studentsStore.students"
        :key="student.id"
        :value="student.id"
      >
        {{ student.name }} {{ student.lastName }}
      </option>
    </select>

    <div
      v-if="student"
      class="bg-white rounded-3xl shadow p-8"
    >
      <h2 class="text-3xl font-bold mb-2">
        {{ student.name }}
        {{ student.lastName }}
      </h2>

      <p class="text-gray-500 mb-8">
        Nivel {{ student.level || 1 }}
      </p>

      <div class="grid md:grid-cols-2 gap-4">

        <div
          v-for="(value,key) in student.profile"
          :key="key"
          class="border rounded-2xl p-4"
        >
          <div class="font-semibold">
            {{ key }}
          </div>

          <div class="text-3xl text-violet-600 font-bold">
            {{ value }}
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStudentsStore } from '../../stores/students'

const studentsStore = useStudentsStore()

const studentId = ref('')

const student = computed(() =>
  studentsStore.students.find(
    s => s.id === studentId.value
  )
)
</script>