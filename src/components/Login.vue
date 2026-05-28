<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  rememberMe: true
})

const errors = reactive({
  email: '',
  password: '',
  general: ''
})

const showPassword = ref(false)

const onSubmit = async () => {
  errors.email = ''
  errors.password = ''
  errors.general = ''

  if (!form.email) {
    errors.email = 'El correo electrónico es requerido'
    return
  }
  if (!form.password) {
    errors.password = 'La contraseña es requerida'
    return
  }

  try {
    await authStore.login(form.email, form.password)
    router.push('/') // Redirige al dashboard
  } catch (error) {
    errors.general = error.message
  }
}
</script>