import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAchievementsStore = defineStore(
    'achievements',
    () => {

        const STORAGE_KEY = 'achievements'

        const achievements = ref([])
        const unlocked = ref([])
        const saved =
            localStorage.getItem(STORAGE_KEY)

        if (saved) {
            achievements.value =
                JSON.parse(saved)
        }

        watch(
            achievements,
            () => {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(achievements.value)
                )
            },
            { deep: true }
        )

        const unlockAchievement = (
            studentId,
            achievement
        ) => {

            const exists =
                achievements.value.find(
                    a =>
                        a.studentId === studentId &&
                        a.code === achievement.code
                )

            if (exists) return

            achievements.value.push({
                id: Date.now(),
                studentId,
                unlockedAt: new Date(),
                ...achievement
            })

        }

        return {
            achievements,
            unlockAchievement,
            unlocked
        }

    }
)