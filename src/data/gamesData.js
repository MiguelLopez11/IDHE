// src/data/GamesData.js

export const defaultGames = [
  {
    id: 1,
    title: 'El Puente Roto',
    description: 'Tu equipo debe cruzar un río utilizando pocos recursos.',

    category: 'Pensamiento Crítico',
    difficulty: 'Intermedio',

    requiredLevel: 1,
    xpReward: 100,
    estimatedMinutes: 10,

    questions: [
      {
        question: '¿Qué harías primero?',
        options: [
          {
            text: 'Analizar los recursos disponibles',
            scores: {
              criticalThinking: 20,
              leadership: 5
            }
          },
          {
            text: 'Preguntar ideas al equipo',
            scores: {
              teamwork: 20,
              empathy: 10
            }
          },
          {
            text: 'Intentar cruzar inmediatamente',
            scores: {
              resilience: 10
            }
          }
        ]
      }
    ]
  },

  {
    id: 2,
    title: 'Detective Digital',
    description: 'Debes descubrir si una noticia es verdadera o falsa.',

    category: 'Pensamiento Crítico',
    difficulty: 'Avanzado',

    requiredLevel: 2,
    xpReward: 150,
    estimatedMinutes: 12,

    questions: [
      {
        question: 'Una noticia afirma algo sorprendente. ¿Qué haces?',
        options: [
          {
            text: 'Verificar la fuente',
            scores: {
              criticalThinking: 25
            }
          },
          {
            text: 'Compartirla',
            scores: {}
          },
          {
            text: 'Buscar otras fuentes',
            scores: {
              criticalThinking: 20
            }
          }
        ]
      }
    ]
  }
]