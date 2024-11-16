export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "¿Qué es la diversificación en inversiones?",
    options: [
      "Invertir todo en una sola acción",
      "Distribuir inversiones en diferentes activos",
      "Vender todas las acciones a la vez",
      "Comprar solo bonos del gobierno"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "¿Qué significa 'bearish' en el mercado de valores?",
    options: [
      "El mercado está en alza",
      "El mercado está estable",
      "El mercado está en baja",
      "El mercado está cerrado"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    text: "¿Qué es un dividendo?",
    options: [
      "Un tipo de acción",
      "Una comisión bursátil",
      "Una distribución de ganancias a los accionistas",
      "Un tipo de bono"
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    text: "¿Qué es el índice S&P 500?",
    options: [
      "Una criptomoneda",
      "Un índice que agrupa las 500 empresas más grandes de EE.UU.",
      "Un tipo de bono gubernamental",
      "Una estrategia de trading"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "¿Qué es el interés compuesto?",
    options: [
      "Un tipo de préstamo bancario",
      "Intereses que se calculan sobre el capital inicial solamente",
      "Intereses que se calculan sobre el capital más los intereses acumulados",
      "Una tasa fija de retorno"
    ],
    correctAnswer: 2
  },
  {
    id: 6,
    text: "¿Qué es un ETF?",
    options: [
      "Un tipo de criptomoneda",
      "Un fondo que cotiza en bolsa y sigue un índice",
      "Una estrategia de inversión a largo plazo",
      "Un tipo de bono corporativo"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    text: "¿Qué es el análisis fundamental en inversiones?",
    options: [
      "Estudiar gráficos de precios históricos",
      "Analizar los estados financieros y el modelo de negocio de una empresa",
      "Seguir las recomendaciones de expertos en televisión",
      "Invertir basándose en rumores del mercado"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    text: "¿Qué es la liquidez en el contexto de inversiones?",
    options: [
      "La cantidad de dinero que tiene un inversor",
      "La facilidad con la que un activo puede convertirse en efectivo",
      "El valor total de las acciones en el mercado",
      "La cantidad de deuda que tiene una empresa"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    text: "¿Qué es el 'yield' o rendimiento de un bono?",
    options: [
      "El precio de compra del bono",
      "La tasa de interés que paga el bono",
      "La fecha de vencimiento del bono",
      "El valor nominal del bono"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    text: "¿Qué es una acción preferente?",
    options: [
      "Una acción que siempre aumenta de valor",
      "Una acción que da prioridad en el pago de dividendos",
      "La acción más cara de una empresa",
      "Una acción que solo pueden comprar los empleados de la empresa"
    ],
    correctAnswer: 1
  },
  {
    id: 11,
    text: "¿Qué es el 'short selling' o venta en corto?",
    options: [
      "Vender acciones rápidamente",
      "Vender acciones que no se poseen esperando que su precio baje",
      "Vender acciones a un precio más bajo que el de mercado",
      "Vender acciones en pequeñas cantidades"
    ],
    correctAnswer: 1
  },
  {
    id: 12,
    text: "¿Qué es la volatilidad en el mercado de valores?",
    options: [
      "La tendencia del mercado a subir",
      "La tendencia del mercado a bajar",
      "La medida de cuánto fluctúa el precio de un activo",
      "El volumen de acciones negociadas en un día"
    ],
    correctAnswer: 2
  },
  {
    id: 13,
    text: "¿Qué es un 'blue chip' en el mercado de valores?",
    options: [
      "Una acción de bajo precio",
      "Una empresa grande y financieramente sólida",
      "Un tipo de derivado financiero",
      "Una estrategia de inversión agresiva"
    ],
    correctAnswer: 1
  },
  {
    id: 14,
    text: "¿Qué es el 'market cap' o capitalización de mercado?",
    options: [
      "El precio más alto alcanzado por una acción",
      "El valor total de las acciones en circulación de una empresa",
      "El número total de acciones que posee un inversor",
      "El límite máximo de acciones que puede emitir una empresa"
    ],
    correctAnswer: 1
  },
  {
    id: 15,
    text: "¿Qué es un split de acciones?",
    options: [
      "La división de una empresa en dos",
      "La división de las acciones existentes en múltiples acciones",
      "La combinación de varias acciones en una",
      "La venta de todas las acciones de una empresa"
    ],
    correctAnswer: 1
  }
];