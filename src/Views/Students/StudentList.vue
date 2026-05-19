<!-- src/components/UsuariosRegistrados.vue -->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Encabezado -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900">Usuarios Registrados</h1>
          <p class="text-gray-500 mt-1">
            Total: <span class="font-semibold text-indigo-600">{{ usuariosFiltrados.length }}</span> usuarios
          </p>
        </div>

        <!-- Botón Agregar -->
        <button
          @click="agregarUsuario"
          class="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-3xl font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg shadow-indigo-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo usuario
        </button>
      </div>

      <!-- Barra de búsqueda y filtros -->
      <div class="bg-white rounded-3xl shadow p-6 mb-8 flex flex-col md:flex-row gap-4">
        <div class="flex-1 relative">
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar por nombre o email..."
            class="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent focus:border-indigo-300 rounded-3xl outline-none text-lg transition-all"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Filtro por estado -->
        <select
          v-model="filtroEstado"
          class="px-6 py-4 bg-gray-50 border border-transparent focus:border-indigo-300 rounded-3xl outline-none text-lg min-w-[200px]"
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <!-- Tabla de usuarios -->
      <div class="bg-white rounded-3xl shadow overflow-hidden">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 border-b">
              <th class="px-8 py-5 text-left font-medium text-gray-500">ID</th>
              <th class="px-8 py-5 text-left font-medium text-gray-500">Nombre</th>
              <th class="px-8 py-5 text-left font-medium text-gray-500">Email</th>
              <th class="px-8 py-5 text-left font-medium text-gray-500">Fecha de registro</th>
              <th class="px-8 py-5 text-left font-medium text-gray-500">Rol</th>
              <th class="px-8 py-5 text-left font-medium text-gray-500">Estado</th>
              <th class="px-8 py-5 text-center font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr
              v-for="usuario in usuariosFiltrados"
              :key="usuario.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-8 py-6 font-mono text-gray-400">#{{ usuario.id.toString().padStart(4, '0') }}</td>
              <td class="px-8 py-6 font-semibold text-gray-900">{{ usuario.nombre }}</td>
              <td class="px-8 py-6 text-gray-600">{{ usuario.email }}</td>
              <td class="px-8 py-6 text-gray-500">{{ usuario.fechaRegistro }}</td>
              <td class="px-8 py-6">
                <span
                  class="inline-flex px-4 py-1 rounded-2xl text-sm font-medium"
                  :class="{
                    'bg-purple-100 text-purple-700': usuario.rol === 'Admin',
                    'bg-blue-100 text-blue-700': usuario.rol === 'Usuario',
                    'bg-amber-100 text-amber-700': usuario.rol === 'Moderador'
                  }"
                >
                  {{ usuario.rol }}
                </span>
              </td>
              <td class="px-8 py-6">
                <span
                  class="inline-flex items-center gap-2 px-4 py-1 rounded-2xl text-sm font-medium"
                  :class="usuario.estado === 'activo'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'"
                >
                  <span class="w-2 h-2 rounded-full"
                    :class="usuario.estado === 'activo' ? 'bg-emerald-500' : 'bg-red-500'"></span>
                  {{ usuario.estado === 'activo' ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-8 py-6 text-center">
                <div class="flex items-center justify-center gap-3">
                  <button
                    @click="verUsuario(usuario)"
                    class="text-indigo-600 hover:text-indigo-700 transition-colors px-3 py-2 rounded-2xl hover:bg-indigo-50"
                  >
                    👁️
                  </button>
                  <button
                    @click="editarUsuario(usuario)"
                    class="text-amber-600 hover:text-amber-700 transition-colors px-3 py-2 rounded-2xl hover:bg-amber-50"
                  >
                    ✏️
                  </button>
                  <button
                    @click="eliminarUsuario(usuario)"
                    class="text-red-600 hover:text-red-700 transition-colors px-3 py-2 rounded-2xl hover:bg-red-50"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mensaje si no hay resultados -->
        <div v-if="usuariosFiltrados.length === 0" class="py-20 text-center text-gray-400">
          No se encontraron usuarios con esos criterios.
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Datos de ejemplo (puedes reemplazarlos con una llamada a tu API)
const usuarios = ref([
  {
    id: 1,
    nombre: "Ana García",
    email: "ana.garcia@email.com",
    fechaRegistro: "2026-04-12",
    rol: "Admin",
    estado: "activo"
  },
  {
    id: 2,
    nombre: "Carlos Mendoza",
    email: "carlos.m@email.com",
    fechaRegistro: "2026-04-10",
    rol: "Usuario",
    estado: "activo"
  },
  {
    id: 3,
    nombre: "Laura Torres",
    email: "laura.torres@email.com",
    fechaRegistro: "2026-04-08",
    rol: "Moderador",
    estado: "inactivo"
  },
  {
    id: 4,
    nombre: "Diego Ramírez",
    email: "diego.r@email.com",
    fechaRegistro: "2026-04-05",
    rol: "Usuario",
    estado: "activo"
  },
  {
    id: 5,
    nombre: "Sofía Morales",
    email: "sofia.morales@email.com",
    fechaRegistro: "2026-04-01",
    rol: "Admin",
    estado: "activo"
  },
  {
    id: 6,
    nombre: "Javier López",
    email: "javier.lopez@email.com",
    fechaRegistro: "2026-03-28",
    rol: "Usuario",
    estado: "inactivo"
  }
])

const busqueda = ref('')
const filtroEstado = ref('')

// Usuarios filtrados (búsqueda + filtro de estado)
const usuariosFiltrados = computed(() => {
  return usuarios.value.filter(usuario => {
    const coincideBusqueda =
      usuario.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.value.toLowerCase())

    const coincideEstado = !filtroEstado.value || usuario.estado === filtroEstado.value

    return coincideBusqueda && coincideEstado
  })
})

// Acciones (simuladas)
const verUsuario = (usuario) => {
  alert(`👁️ Viendo detalles de: ${usuario.nombre}\nEmail: ${usuario.email}`)
}

const editarUsuario = (usuario) => {
  const nuevoNombre = prompt('Editar nombre:', usuario.nombre)
  if (nuevoNombre) {
    usuario.nombre = nuevoNombre
    alert('✅ Usuario actualizado')
  }else{
    alert('no agregaste ningun nombre')
  }
}

const eliminarUsuario = (usuario) => {
  if (confirm(`¿Eliminar al usuario ${usuario.nombre}?`)) {
    usuarios.value = usuarios.value.filter(u => u.id !== usuario.id)
    alert('🗑️ Usuario eliminado')
  }
}

const agregarUsuario = () => {
  alert('➕ Aquí podrías abrir un modal con el formulario de registro (como el que te hice antes)')
  // Ejemplo: podrías importar y mostrar el FormularioContacto o crear uno nuevo
}
</script>