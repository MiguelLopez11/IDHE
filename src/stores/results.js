import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useResultsStore = defineStore('results', () => {

  const STORAGE_KEY = 'results'

  const results = ref([])

  const saved = localStorage.getItem(STORAGE_KEY)

  if(saved){
    results.value = JSON.parse(saved)
  }

  watch(results, () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(results.value)
    )
  }, { deep:true })

  const addResult = (result) => {

    result.id = Date.now()

    results.value.push(result)

  }

  return {
    results,
    addResult
  }

})