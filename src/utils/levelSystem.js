export const getLevelFromXp = (xp) => {

    let level = 1

    let requiredXp = 100

    let accumulatedXp = 0

    while (xp >= accumulatedXp + requiredXp) {

        accumulatedXp += requiredXp

        level++

        requiredXp += 50
    }

    return level
}

export const getXpForNextLevel = (level) => {

    let total = 0

    let required = 100

    for (let i = 1; i < level; i++) {

        total += required

        required += 50

    }

    return total + required
}