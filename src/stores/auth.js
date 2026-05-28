import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)

  const login = async (email, password) => {
    loading.value = true

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulación API

      // Credenciales de prueba
      if (email === 'admin@idhe.com' && password === '123456') {
        user.value = {
          id: 1,
          name: 'Miguel Lopez',
          email: email,
          role: 'admin',
          avatar: 'LO'
        }
        isAuthenticated.value = true

        localStorage.setItem('user', JSON.stringify(user.value))
        return { success: true }
      } else {
        throw new Error('Correo o contraseña incorrectos')
      }
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      // Simular llamada a API de logout si tuvieras
      await new Promise(resolve => setTimeout(resolve, 300))
      
      user.value = null
      isAuthenticated.value = false
      localStorage.removeItem('user')
    } finally {
      loading.value = false
    }
  }

  const loadUser = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    loadUser
  }
})