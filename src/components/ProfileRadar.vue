<template>
  <div class="bg-white rounded-3xl shadow p-6">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

const chartCanvas = ref(null)

let chart = null

const renderChart = () => {

  if (chart) {
    chart.destroy()
  }

  chart = new Chart(
    chartCanvas.value,
    {
      type: 'radar',

      data: {
        labels: [
          'Pensamiento Crítico',
          'Trabajo en Equipo',
          'Empatía',
          'Liderazgo',
          'Resiliencia'
        ],

        datasets: [
          {
            label: 'Perfil Integral',

            data: [
              props.profile.criticalThinking || 0,
              props.profile.teamwork || 0,
              props.profile.empathy || 0,
              props.profile.leadership || 0,
              props.profile.resilience || 0
            ]
          }
        ]
      },

      options: {

        responsive: true,

        scales: {
          r: {
            beginAtZero: true
          }
        }
      }
    }
  )

}

onMounted(renderChart)

watch(
  () => props.profile,
  renderChart,
  { deep: true }
)
</script>