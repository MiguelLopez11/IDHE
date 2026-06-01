<template>
    <div class="p-6 max-w-7xl mx-auto">

        <!-- Encabezado -->
        <div class="flex justify-between items-center mb-8">

            <div>
                <h1 class="text-4xl font-bold">
                    Retos y Juegos
                </h1>

                <p class="text-gray-500">
                    {{ filteredGames.length }} retos disponibles
                </p>
            </div>
            <div class="flex gap-3">

                <button @click="resetGames" class="bg-gray-600 text-white px-6 py-3 rounded-2xl">
                    Restablecer
                </button>

                <button @click="openCreateModal" class="bg-violet-600 text-white px-6 py-3 rounded-2xl">
                    Nuevo Reto
                </button>

            </div>

        </div>

        <!-- Filtros -->
        <div class="bg-white rounded-3xl shadow p-6 mb-6">

            <div class="grid md:grid-cols-2 gap-4">

                <div>
                    <label class="block mb-2 font-medium">
                        Categoría
                    </label>

                    <select v-model="selectedCategory" class="w-full border rounded-xl px-4 py-3">
                        <option value="">
                            Todas
                        </option>

                        <option v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </option>

                    </select>
                </div>

                <div>
                    <label class="block mb-2 font-medium">
                        Dificultad
                    </label>

                    <select v-model="selectedDifficulty" class="w-full border rounded-xl px-4 py-3">
                        <option value="">
                            Todas
                        </option>

                        <option value="Fácil">
                            Fácil
                        </option>

                        <option value="Intermedio">
                            Intermedio
                        </option>

                        <option value="Avanzado">
                            Avanzado
                        </option>

                    </select>
                </div>

            </div>

        </div>

        <!-- Tabla -->
        <div class="bg-white rounded-3xl shadow overflow-hidden">

            <table class="w-full">

                <thead class="bg-gray-50">
                    <tr>
                        <th class="p-4 text-left">
                            Título
                        </th>

                        <th class="p-4 text-left">
                            Categoría
                        </th>

                        <th class="p-4 text-left">
                            Dificultad
                        </th>

                        <th class="p-4 text-left">
                            Preguntas
                        </th>

                        <th class="p-4 text-center">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="game in filteredGames" :key="game.id" class="border-t hover:bg-gray-50">

                        <td class="p-4">
                            <div class="font-semibold">
                                {{ game.title }}
                            </div>

                            <div class="text-sm text-gray-500">
                                {{ game.description }}
                            </div>
                        </td>

                        <td class="p-4">
                            <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                {{ game.category || 'General' }}
                            </span>
                        </td>

                        <td class="p-4">

                            <span class="px-3 py-1 rounded-full text-sm" :class="{
                                'bg-green-100 text-green-700': game.difficulty === 'Fácil',
                                'bg-yellow-100 text-yellow-700': game.difficulty === 'Intermedio',
                                'bg-red-100 text-red-700': game.difficulty === 'Avanzado'
                            }">
                                {{ game.difficulty || 'Sin definir' }}
                            </span>

                        </td>

                        <td class="p-4">
                            {{ game.questions?.length || 0 }}
                        </td>

                        <td class="p-4 text-center">

                            <button @click="playGame(game.id)" class="mr-3 text-green-600 hover:text-green-800"
                                title="Jugar">
                                ▶️
                            </button>

                            <button @click="editGame(game)" class="mr-3 text-indigo-600 hover:text-indigo-800"
                                title="Editar">
                                ✏️
                            </button>

                            <button @click="deleteGame(game.id)" class="text-red-600 hover:text-red-800"
                                title="Eliminar">
                                🗑️
                            </button>

                        </td>

                    </tr>

                </tbody>

            </table>

            <div v-if="filteredGames.length === 0" class="text-center py-16 text-gray-500">
                No hay retos disponibles
            </div>

        </div>

        <!-- Modal -->
        <GameModal v-model="showModal" :game="selectedGame" @save="saveGame" />

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import GameModal from './GameModal.vue'
import { useGamesStore } from '../../stores/games'

const router = useRouter()
const store = useGamesStore()

const showModal = ref(false)
const selectedGame = ref(null)

const selectedCategory = ref('')
const selectedDifficulty = ref('')

const categories = computed(() => {

    return [
        ...new Set(
            store.games
                .map(g => g.category)
                .filter(Boolean)
        )
    ]

})

const filteredGames = computed(() => {

    return store.games.filter(game => {

        const categoryOk =
            !selectedCategory.value ||
            game.category === selectedCategory.value

        const difficultyOk =
            !selectedDifficulty.value ||
            game.difficulty === selectedDifficulty.value

        return categoryOk && difficultyOk

    })

})

const openCreateModal = () => {

    selectedGame.value = null
    showModal.value = true

}

const playGame = (id) => {

    router.push(`/game/${id}`)

}

const editGame = (game) => {

    selectedGame.value = { ...game }
    showModal.value = true

}

const saveGame = (game) => {

    if (game.id) {

        store.updateGame(game)

    } else {

        store.addGame(game)

    }

    showModal.value = false

}

const deleteGame = (id) => {

    if (confirm('¿Eliminar este reto?')) {

        store.deleteGame(id)

    }

}
const resetGames = () => {

    if (
        confirm(
            '¿Restablecer todos los juegos predeterminados?'
        )
    ) {

        store.resetGames()

    }

}
</script>