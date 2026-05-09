<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
    <!-- Navbar - CORREGIDA PARA MÓVIL -->
    <nav class="bg-white dark:bg-zinc-900 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <div class="w-9 h-9 bg-violet-600 rounded-2xl flex items-center justify-center text-white text-3xl">📘</div>
          <h1 class="text-3xl font-bold tracking-tighter">IDHE</h1>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-8 font-medium">
          <a href="#features" class="hover:text-violet-600 transition-colors">Características</a>
          <a href="#como-funciona" class="hover:text-violet-600 transition-colors">Cómo funciona</a>
          <a href="#galeria" class="hover:text-violet-600 transition-colors">Galería</a>
        </div>

        <!-- Botones de Auth - CORREGIDOS PARA MÓVIL -->
        <div class="flex items-center gap-2">
          <!-- Botón Iniciar sesión -->
          <button 
            @click="showLoginModal = true"
            class="hidden sm:flex px-4 py-2 text-sm font-semibold border border-zinc-300 dark:border-zinc-700 rounded-3xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap">
            Iniciar sesión
          </button>
          
          <!-- Botón Registrarse (siempre visible) -->
          <button 
            @click="showRegisterModal = true"
            class="px-5 py-2 text-sm font-semibold bg-violet-600 text-white rounded-3xl hover:bg-violet-700 transition-colors whitespace-nowrap">
            Registrarse gratis
          </button>

          <!-- Hamburger -->
          <button @click="toggleMobileMenu" class="md:hidden p-2 ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6h12v12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white dark:bg-zinc-900 border-t px-4 py-6 flex flex-col gap-4 text-lg font-medium">
        <a href="#features" @click="mobileMenuOpen = false" class="py-3">Características</a>
        <a href="#como-funciona" @click="mobileMenuOpen = false" class="py-3">Cómo funciona</a>
        <a href="#galeria" @click="mobileMenuOpen = false" class="py-3">Galería</a>
        <div class="pt-4 border-t flex flex-col gap-3">
          <button @click="showLoginModal = true; mobileMenuOpen = false" 
                  class="w-full py-4 text-center border border-zinc-300 dark:border-zinc-700 rounded-3xl font-semibold">
            Iniciar sesión
          </button>
          <button @click="showRegisterModal = true; mobileMenuOpen = false" 
                  class="w-full py-4 text-center bg-violet-600 text-white rounded-3xl font-semibold">
            Registrarse gratis
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero - CORREGIDO PARA MÓVIL -->
    <header class="max-w-7xl mx-auto px-4 pt-8 pb-12 md:pt-16 md:pb-20 grid md:grid-cols-2 gap-10 items-center">
      <div class="order-2 md:order-1">
        <div class="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300 px-5 py-2 rounded-3xl text-sm font-medium mb-6">
          ✨ Proyecto Escolar 2026
        </div>
        
        <!-- Título con tamaño responsivo (evita que se pegue el texto) -->
        <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-none tracking-tighter mb-6">
          Gestiona tus proyectos<br>escolares con IA
        </h2>
        
        <p class="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-lg">
          IDHE es la plataforma que organiza equipos, asigna tareas inteligentes y mide el progreso de tus proyectos escolares en tiempo real.
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
          <button 
            @click="showRegisterModal = true"
            class="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-3xl text-lg flex items-center justify-center gap-3 transition-all">
            Empezar gratis
            <span class="text-2xl">→</span>
          </button>
          <button 
            @click="showLoginModal = true"
            class="px-8 py-4 border-2 border-zinc-300 dark:border-zinc-700 font-semibold rounded-3xl text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
            Ya tengo cuenta
          </button>
        </div>
      </div>

      <!-- Imagen Hero + Badge flotante -->
      <div class="order-1 md:order-2 relative">
        <img 
          src="https://picsum.photos/id/1015/900/700" 
          alt="IDHE - Plataforma de proyectos escolares"
          class="rounded-3xl shadow-2xl w-full aspect-video object-cover">
        
        <!-- Badge de progreso (igual que en tu captura) -->
        <div class="absolute -bottom-4 left-6 sm:left-8 bg-white dark:bg-zinc-900 px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-4 text-sm">
          <div class="text-4xl">🚀</div>
          <div>
            <p class="font-semibold text-zinc-900 dark:text-white">Progreso del equipo</p>
            <p class="text-emerald-600 font-medium">92% completado • IA</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Resto de secciones (igual que antes, ya responsivas) -->
    <section id="features" class="max-w-7xl mx-auto px-4 py-20 bg-white dark:bg-zinc-900">
      <div class="text-center mb-12">
        <h3 class="text-4xl font-bold mb-4">¿Qué hace IDHE?</h3>
        <p class="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">Todo lo necesario para que tus proyectos escolares sean más fáciles y eficientes</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-zinc-50 dark:bg-zinc-950 p-8 rounded-3xl hover:shadow-xl transition-shadow">
          <div class="text-5xl mb-6">🤖</div>
          <h4 class="text-2xl font-semibold mb-3">Tareas con IA</h4>
          <p class="text-zinc-600 dark:text-zinc-400">La inteligencia artificial genera y distribuye tareas automáticamente según las fortalezas de cada miembro.</p>
        </div>
        <div class="bg-zinc-50 dark:bg-zinc-950 p-8 rounded-3xl hover:shadow-xl transition-shadow">
          <div class="text-5xl mb-6">👥</div>
          <h4 class="text-2xl font-semibold mb-3">Colaboración en equipo</h4>
          <p class="text-zinc-600 dark:text-zinc-400">Chat en tiempo real, archivos compartidos y roles claros para cada integrante.</p>
        </div>
        <div class="bg-zinc-50 dark:bg-zinc-950 p-8 rounded-3xl hover:shadow-xl transition-shadow">
          <div class="text-5xl mb-6">📊</div>
          <h4 class="text-2xl font-semibold mb-3">Seguimiento en vivo</h4>
          <p class="text-zinc-600 dark:text-zinc-400">Tableros visuales y reportes automáticos para profesores y estudiantes.</p>
        </div>
      </div>
    </section>

    <!-- Galería -->
    <section id="galeria" class="max-w-7xl mx-auto px-4 py-20">
      <h3 class="text-4xl font-bold text-center mb-12">Así se ve IDHE</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <img src="https://picsum.photos/id/1016/700/500" alt="Dashboard IDHE" class="rounded-3xl shadow-xl hover:scale-105 transition-transform">
        <img src="https://picsum.photos/id/201/700/500" alt="Tablero de tareas" class="rounded-3xl shadow-xl hover:scale-105 transition-transform">
        <img src="https://picsum.photos/id/870/700/500" alt="Chat y colaboración" class="rounded-3xl shadow-xl hover:scale-105 transition-transform">
      </div>
    </section>

    <!-- CTA Final -->
    <div class="max-w-4xl mx-auto bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-3xl mx-4 p-12 md:p-16 text-center my-12">
      <h3 class="text-4xl font-bold mb-4">¿Listo para revolucionar tus proyectos escolares?</h3>
      <p class="text-xl mb-10">Crea tu cuenta gratis y empieza a usar IDHE hoy</p>
      <button 
        @click="showRegisterModal = true"
        class="px-12 py-5 bg-white text-violet-700 font-bold text-xl rounded-3xl hover:scale-105 transition-transform">
        Crear cuenta gratis →
      </button>
    </div>

    <!-- Modales (sin cambios, solo más compactos) -->
    <div v-if="showLoginModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4" @click.self="showLoginModal = false">
      <div class="bg-white dark:bg-zinc-800 rounded-3xl p-8 w-full max-w-md">
        <h4 class="text-2xl font-bold mb-6">Iniciar sesión</h4>
        <input v-model="email" type="email" placeholder="Correo electrónico" class="w-full px-5 py-4 rounded-2xl border mb-4 dark:bg-zinc-900">
        <input v-model="password" type="password" placeholder="Contraseña" class="w-full px-5 py-4 rounded-2xl border mb-6 dark:bg-zinc-900">
        <button @click="fakeLogin" class="w-full py-4 bg-violet-600 text-white font-semibold rounded-2xl">Entrar</button>
        <p class="text-center text-sm text-zinc-500 mt-6">¿No tienes cuenta? <span @click="switchToRegister" class="text-violet-600 cursor-pointer">Regístrate aquí</span></p>
      </div>
    </div>

    <div v-if="showRegisterModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4" @click.self="showRegisterModal = false">
      <div class="bg-white dark:bg-zinc-800 rounded-3xl p-8 w-full max-w-md">
        <h4 class="text-2xl font-bold mb-6">Crear cuenta gratis</h4>
        <input v-model="name" type="text" placeholder="Nombre completo" class="w-full px-5 py-4 rounded-2xl border mb-4 dark:bg-zinc-900">
        <input v-model="email" type="email" placeholder="Correo escolar" class="w-full px-5 py-4 rounded-2xl border mb-4 dark:bg-zinc-900">
        <input v-model="password" type="password" placeholder="Contraseña" class="w-full px-5 py-4 rounded-2xl border mb-6 dark:bg-zinc-900">
        <button @click="fakeRegister" class="w-full py-4 bg-violet-600 text-white font-semibold rounded-2xl">Registrarme</button>
        <p class="text-center text-sm text-zinc-500 mt-6">¿Ya tienes cuenta? <span @click="switchToLogin" class="text-violet-600 cursor-pointer">Inicia sesión</span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const email = ref('')
const password = ref('')
const name = ref('')

const toggleMobileMenu = () => { mobileMenuOpen.value = !mobileMenuOpen.value }

const fakeLogin = () => {
  alert('✅ ¡Bienvenido de vuelta a IDHE! (demo)')
  showLoginModal.value = false
}

const fakeRegister = () => {
  alert('🎉 ¡Cuenta creada con éxito en IDHE! (demo)')
  showRegisterModal.value = false
}

const switchToRegister = () => {
  showLoginModal.value = false
  showRegisterModal.value = true
}

const switchToLogin = () => {
  showRegisterModal.value = false
  showLoginModal.value = true
}
</script>