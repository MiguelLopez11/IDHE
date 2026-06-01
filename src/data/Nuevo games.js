import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import { defaultGames }
from '../data/gamesData'

export const useGamesStore =
defineStore('games', () => {

  const STORAGE_KEY = 'games'

  const games = ref([])

  const saved =
    localStorage.getItem(
      STORAGE_KEY
    )

  if (saved) {

    games.value =
      JSON.parse(saved)

  } else {

    games.value =
      defaultGames

  }

  watch(
    games,
    () => {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          games.value
        )
      )

    },
    { deep: true }
  )

  const addGame = (game) => {

    game.id = Date.now()

    games.value.push(game)

  }

  const updateGame = (updated) => {

    const index =
      games.value.findIndex(
        g => g.id === updated.id
      )

    if (index !== -1) {

      games.value[index] =
        updated

    }

  }

  const deleteGame = (id) => {

    const index =
      games.value.findIndex(
        g => g.id === id
      )

    if (index !== -1) {

      games.value.splice(
        index,
        1
      )

    }

  }

  return {

    games,

    addGame,

    updateGame,

    deleteGame

  }

})