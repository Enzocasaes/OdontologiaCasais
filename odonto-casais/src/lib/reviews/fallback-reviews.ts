import type { ReviewsResult } from "./types";

export const fallbackReviewsResult: ReviewsResult = {
  summary: {
    averageRating: 4.9,
    totalReviews: 150,
    profileUrl: "https://www.google.com/maps",
  },
  reviews: [
    {
      id: "fallback-1",
      authorName: "Hernane Rodrigues",
      rating: 5,
      relativeTime: "há 1 mês",
      time: 1783464405,
      text: "Excelente atendimento e profissionalismo. Indico sem sobra de dúvidas. Dra. Iana super atenciosa e com a mão super leve (detalhe importante kkk)",
    },
    {
      id: "fallback-2",
      authorName: "Deizi Lima",
      rating: 5,
      relativeTime: "há 2 anos",
      time: 1718491605,
      text: "Ótimo atendimento e acompanhamento após extração. É essencial contar com profissionais que se preocupam com o nosso bem-estar durante todo o processo de recuperação.",
    },
    {
      id: "fallback-3",
      authorName: "Marivania Ferreira",
      rating: 5,
      relativeTime: "há 2 anos",
      time: 1716245205,
      text: "Ótimo atendimento, excelentes profissionais, tratam o paciente com atenção!",
    },
    {
      id: "fallback-4",
      authorName: "Pedro Henrique Oliveira Rodrigues",
      rating: 5,
      relativeTime: "há 2 anos",
      time: 1712789205,
      text: "Atendimento incrível! Desde a recepção até os dentistas! Parabéns pelo profissionalismo!!",
    },
    {
      id: "fallback-5",
      authorName: "Luana Barbosa",
      rating: 5,
      relativeTime: "há 2 anos",
      time: 1709333205,
      text: "Excelente atendimento e localização, ambiente climatizado, limpo e com profissionais qualificados!",
    },
    {
      id: "fallback-6",
      authorName: "Evanildo Martins",
      rating: 5,
      relativeTime: "há 3 anos",
      time: 1691448870,
      text: "Ótima equipe fomos muito bem atendidos meu filho faz tratamento ortodontico com resultados maravilhosos!",
    },
  ],
};
