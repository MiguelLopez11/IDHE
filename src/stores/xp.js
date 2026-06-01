import { defineStore } from 'pinia'

export const useXpStore = defineStore(
  'xp',
  () => {

    const calculateLevel =
      xp => Math.floor(xp / 100) + 1

    return {
      calculateLevel
    }

  }
)