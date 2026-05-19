<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 flex items-center justify-center p-4">
    <div class="w-full max-w-[400px]">
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
        <!-- Header -->
        <div class="pt-10 pb-8 text-center">
          <div class="mx-auto w-20 h-20 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span class="text-white text-5xl font-bold">L</span>
          </div>
          <h1 class="mt-6 text-3xl font-bold text-gray-900">Bienvenido</h1>
          <p class="text-gray-600 mt-1">Inicia sesión en tu cuenta</p>
        </div>

        <form @submit.prevent="onSubmit" class="px-6 pb-10 space-y-6">
          <BaseInput
            v-model="form.email"
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            :error="errors.email"
            required
          />

          <BaseInput
            v-model="form.password"
            label="Contraseña"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            :error="errors.password"
            required
          >
            <template #append>
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="text-gray-400 hover:text-gray-600 text-xl"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </template>
          </BaseInput>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="form.rememberMe"
                type="checkbox"
                class="w-4 h-4 accent-violet-600"
              />
              Recordarme
            </label>
            <a href="#" class="text-violet-600 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-2xl text-lg shadow-lg hover:brightness-105 transition-all duration-200 disabled:opacity-70"
          >
            {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
          </button>
        </form>

        <div class="px-6 py-6 bg-gray-50 border-t text-center">
          <p class="text-sm text-gray-600">
            ¿No tienes cuenta? 
            <router-link to="/register" class="text-violet-600 font-semibold hover:text-violet-700">
              Regístrate
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseInput from '../components/BaseInput.vue'

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)
const loading = ref(false)

const onSubmit = async () => {
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  // Simple validation
  if (!form.email) errors.email = 'El correo es requerido'
  if (!form.password) errors.password = 'La contraseña es requerida'

  if (errors.email || errors.password) return

  loading.value = true

  try {
    // Aquí iría tu lógica real (API call + Pinia/Auth Store)
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Login exitoso', form)
    // router.push('/dashboard')
  } catch (error) {
    alert('Error al iniciar sesión')
  } finally {
    loading.value = false
  }
}
</script>