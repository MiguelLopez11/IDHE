<template>

    <div class="bg-white rounded shadow">

        <table class="w-full">

            <thead>
                <tr>
                    <th>Alumno</th>
                    <th>Evaluación</th>
                    <th>Resultado</th>
                    <th>Acciones</th>



                </tr>

            </thead>

            <tbody>

                <tr v-for="result in resultsStore.results" :key="result.id">

                    <td>
                        {{ getStudent(result.studentId) }}
                    </td>

                    <td>
                        {{ getTest(result.testId) }}
                    </td>

                    <td>

                        <span class="px-3 py-1 rounded bg-green-100 text-green-700">
                            {{ result.total.toFixed(0) }}
                        </span>

                    </td>
                    <td class="space-x-3">

                        <button @click="$emit('edit', result)" class="text-indigo-600 hover:text-indigo-800">
                            ✏️
                        </button>

                        <button @click="removeResult(result.id)" class="text-red-600 hover:text-red-800">
                            🗑️
                        </button>

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</template>

<script setup>
import { useResultsStore } from '../../stores/results'
import { useStudentsStore } from '../../stores/students'
import { useTestsStore } from '../../stores/tests'

const resultsStore = useResultsStore()
const studentsStore = useStudentsStore()
const testsStore = useTestsStore()

const getStudent = (id) => {

    const student =
        studentsStore.students.find(
            s => s.id === id
        )

    return student
        ? `${student.name} ${student.lastName}`
        : 'N/A'
}

const getTest = (id) => {

    return testsStore.tests.find(
        t => t.id === id
    )?.name
}
const emit = defineEmits([
    'edit'
])
const removeResult = (id) => {

    if (confirm('¿Eliminar evaluación?')) {

        resultsStore.deleteResult(id)

    }

}
</script>