import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import { defaultGames } from '../data/GamesData'

export const useGamesStore = defineStore('games', () => {

  const STORAGE_KEY = 'games'

  const games = ref([])

  const savedGames =
    localStorage.getItem(STORAGE_KEY)

  if (savedGames) {

    games.value =
      JSON.parse(savedGames)

  } else {

    games.value =
      structuredClone(defaultGames)

  }

  watch(
    games,
    () => {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(games.value)
      )

    },
    { deep: true }
  )

  const addGame = (game) => {

    games.value.push({
      ...game,
      id: Date.now()
    })

  }

  const updateGame = (updatedGame) => {

    const index =
      games.value.findIndex(
        g => g.id === updatedGame.id
      )

    if (index !== -1) {

      games.value[index] =
        { ...updatedGame }

    }

  }

  const deleteGame = (id) => {

    const index =
      games.value.findIndex(
        g => g.id === id
      )

    if (index !== -1) {

      games.value.splice(index, 1)

    }

  }

  const resetGames = () => {

    games.value =
      structuredClone(defaultGames)

  }

  return {

    games,

    addGame,
    updateGame,
    deleteGame,

    resetGames

  }

})