<template>
    <div
        class="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 flex items-center justify-center p-4">
        <div class="w-full max-w-[400px]">
            <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
                <!-- Header -->
                <div class="pt-10 pb-8 text-center">
                    <div
                        class="mx-auto w-20 h-20 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span class="text-white text-5xl font-bold">L</span>
                    </div>
                    <h1 class="mt-6 text-3xl font-bold text-gray-900">Crear cuenta</h1>
                    <p class="text-gray-600 mt-1">Únete a nosotros hoy</p>
                </div>

                <form @submit.prevent="onSubmit" class="px-6 pb-10 space-y-6">
                    <BaseInput v-model="form.fullName" label="Nombre completo" type="text" placeholder="Juan Pérez"
                        :error="errors.fullName" required />

                    <BaseInput v-model="form.email" label="Correo electrónico" type="email" placeholder="tu@email.com"
                        :error="errors.email" required />

                    <!-- Contraseña -->
                    <BaseInput v-model="form.password" label="Contraseña" :type="showPassword ? 'text' : 'password'"
                        placeholder="••••••••" :error="errors.password" required>
                        <template #append>
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl">
                                {{ showPassword ? '🙈' : '👁️' }}
                            </button>
                        </template>
                    </BaseInput>

                    <!-- Confirmar Contraseña -->
                    <BaseInput v-model="form.confirmPassword" label="Confirmar contraseña"
                        :type="showConfirmPassword ? 'text' : 'password'" placeholder="••••••••"
                        :error="errors.confirmPassword" required>
                        <template #append>
                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl">
                                {{ showConfirmPassword ? '🙈' : '👁️' }}
                            </button>
                        </template>
                    </BaseInput>

                    <label class="flex items-start gap-3 cursor-pointer">
                        <input v-model="form.acceptTerms" type="checkbox" class="w-5 h-5 mt-0.5 accent-violet-600"
                            required />
                        <span class="text-sm text-gray-600">
                            Acepto los
                            <a href="#" class="text-violet-600 hover:underline">Términos</a>
                            y la
                            <a href="#" class="text-violet-600 hover:underline">Política de Privacidad</a>
                        </span>
                    </label>

                    <button type="submit" :disabled="loading"
                        class="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-2xl text-lg shadow-lg hover:brightness-105 transition-all disabled:opacity-70">
                        {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
                    </button>
                </form>

                <div class="px-6 py-6 bg-gray-50 border-t text-center">
                    <p class="text-sm text-gray-600">
                        ¿Ya tienes cuenta?
                        <router-link to="/login" class="text-violet-600 font-semibold hover:text-violet-700">
                            Inicia sesión
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
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
})

const errors = reactive({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)

const onSubmit = async () => {
    // Reset errors
    Object.keys(errors).forEach(key => errors[key] = '')

    if (!form.fullName) errors.fullName = 'El nombre es requerido'
    if (!form.email) errors.email = 'El correo es requerido'
    if (!form.password) errors.password = 'La contraseña es requerida'
    if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden'
    }
    if (!form.acceptTerms) {
        alert('Debes aceptar los términos y condiciones')
        return
    }

    if (Object.values(errors).some(err => err)) return

    loading.value = true

    try {
        await new Promise(resolve => setTimeout(resolve, 1600))
        console.log('Registro exitoso', form)
        // router.push('/login')
    } catch (error) {
        alert('Error al registrar usuario')
    } finally {
        loading.value = false
    }
}
</script>