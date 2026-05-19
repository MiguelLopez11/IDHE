<!-- src/components/FormularioContacto.vue -->
<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div class=" w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white">
                <h1 class="text-3xl font-bold text-center">Registro de alumnos</h1>
                <p class="text-blue-100 text-center mt-2">Cuéntanos cómo podemos ayudarte</p>
            </div>

            <form @submit.prevent="enviarFormulario" class="px-8 py-10 space-y-8">
                <!-- Nombre -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                    <input v-model="form.nombre" type="text" required placeholder="Juan Pérez"
                        class="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg" />
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                    <input v-model="form.email" type="email" required placeholder="tu@email.com"
                        class="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg" />
                </div>
                <!-- edad -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                    <input v-model="form.edad" type="number" required placeholder="0"
                        class="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg" />
                </div>

                <!-- Mensaje -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Grado y grupo</label>
                    <input v-model="form.grado" required class="w-full px-5 py-4 rounded-3xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg resize-none"></input>
                </div>
                <!-- Botón -->
                <button type="submit" :disabled="loading"
                    class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-5 rounded-3xl text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-200 disabled:opacity-70 flex items-center justify-center gap-3">
                    <span v-if="loading"
                        class="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"></span>
                    {{ loading ? 'Enviando...' : 'Enviar mensaje' }}
                </button>
            </form>

            <!-- Mensaje de éxito -->
            <div v-if="enviado"
                class="mx-8 mb-8 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl p-6 text-center font-medium">
                ✅ ¡Formulario enviado con éxito! Te responderemos pronto.
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
    nombre: '',
    email: '',
    edad: '',
    grado: ''
})

const loading = ref(false)
const enviado = ref(false)

const enviarFormulario = async () => {
    loading.value = true

    // Simulación de envío (aquí iría tu fetch o axios)
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Datos enviados:', { ...form })

    // Resetear formulario
    form.nombre = ''
    form.email = ''
    form.tipo = ''
    form.mensaje = ''
    form.acepta = false

    enviado.value = true
    loading.value = false

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        enviado.value = false
    }, 5000)
}
</script>