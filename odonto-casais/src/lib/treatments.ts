/*
 * Conteúdo das páginas de tratamento (/tratamentos/[slug]).
 * Linguagem informativa: nada de promessa de resultado, prazo garantido ou preço.
 * Ao adicionar um tratamento aqui, ele entra automaticamente no sitemap, no rodapé
 * e nos links de "outros tratamentos".
 */

export type TreatmentSection = {
  heading: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

export type Treatment = {
  slug: string;
  /** Nome curto, usado em listas e links. */
  name: string;
  /** H1 da página. */
  heading: string;
  /** <title> completo (sem o template), até ~60 caracteres. */
  seoTitle: string;
  description: string;
  intro: string;
  sections: readonly TreatmentSection[];
  faq: readonly { question: string; answer: string }[];
  whatsappMessage: string;
};

export const treatments: readonly Treatment[] = [
  {
    slug: "implante-dentario",
    name: "Implantes e reabilitação oral",
    heading: "Implante dentário e reabilitação oral em Teófilo Otoni",
    seoTitle: "Implante Dentário em Teófilo Otoni | Odonto Casais",
    description:
      "Implantes dentários e reabilitação oral em Teófilo Otoni, MG, com planejamento individual e prótese fixa sobre implantes. Agende sua avaliação.",
    intro:
      "Para quem perdeu um ou mais dentes, o implante dentário é uma das formas de devolver a mastigação e a estética do sorriso. Na Odonto Casais, cada caso começa por uma avaliação e um planejamento individual.",
    sections: [
      {
        heading: "O que é o implante dentário",
        paragraphs: [
          "O implante é um pino, geralmente de titânio, instalado no osso da maxila ou da mandíbula para substituir a raiz do dente perdido. Sobre ele é fixada uma coroa ou uma prótese, que faz o papel do dente.",
          "Pode substituir um único dente, vários dentes ou servir de base para uma prótese fixa que repõe a arcada inteira.",
        ],
      },
      {
        heading: "Prótese fixa sobre implantes (protocolo)",
        paragraphs: [
          "Para pacientes que perderam todos os dentes, usam dentadura ou têm dentes severamente comprometidos, a reabilitação pode ser feita com uma prótese fixa apoiada sobre implantes, normalmente de 4 a 6 por arcada.",
          "Quando há indicação clínica, a prótese pode ser entregue entre 48 e 72 horas após a cirurgia. O prazo depende de cada caso e é definido na avaliação.",
        ],
      },
      {
        heading: "Quando pode ser indicado",
        items: [
          "Perda de um ou de vários dentes",
          "Dentadura que incomoda, machuca ou não fica firme",
          "Dentes muito comprometidos, com indicação de extração",
          "Dificuldade para mastigar por falta de dentes",
        ],
        paragraphs: [
          "A indicação depende da saúde geral, da quantidade de osso e das condições da gengiva, que são analisadas na avaliação, com exames de imagem quando necessário.",
        ],
      },
      {
        heading: "Como funciona o tratamento",
        items: [
          "Avaliação clínica e exames de imagem",
          "Planejamento da posição e do número de implantes",
          "Cirurgia de instalação, com anestesia local",
          "Confecção e instalação da prótese",
          "Consultas de acompanhamento",
        ],
      },
    ],
    faq: [
      {
        question: "Todo mundo pode colocar implante?",
        answer:
          "Não necessariamente. A indicação depende da saúde geral, da quantidade e da qualidade do osso, das condições da gengiva e de hábitos como o tabagismo. Isso é verificado na avaliação.",
      },
      {
        question: "A cirurgia de implante dói?",
        answer:
          "O procedimento é feito com anestesia local. Desconforto, inchaço ou sensibilidade nos dias seguintes podem acontecer e variam de pessoa para pessoa; o dentista orienta os cuidados e a medicação adequada.",
      },
      {
        question: "É possível ter dentes fixos em até 72 horas?",
        answer:
          "Em alguns casos de reabilitação com prótese fixa sobre implantes, quando há indicação clínica, a prótese pode ser entregue entre 48 e 72 horas após a cirurgia. Nem todos os casos permitem esse prazo.",
      },
      {
        question: "Quanto custa um implante dentário?",
        answer:
          "O valor depende do número de implantes, do tipo de prótese e da necessidade de procedimentos complementares. Por isso o orçamento é feito depois da avaliação.",
      },
      {
        question: "Quanto tempo dura um implante?",
        answer:
          "Com boa higiene, consultas de acompanhamento e cuidado com a saúde geral, o implante é pensado para durar muitos anos. A durabilidade depende de fatores individuais e não pode ser garantida.",
      },
    ],
    whatsappMessage: "Olá, gostaria de agendar uma avaliação para implante dentário na Odonto Casais.",
  },
  {
    slug: "facetas-e-lentes-de-contato-dental",
    name: "Facetas e lentes de contato dental",
    heading: "Facetas e lentes de contato dental em Teófilo Otoni",
    seoTitle: "Lentes de Contato Dental em Teófilo Otoni | Odonto Casais",
    description:
      "Facetas em porcelana e lentes de contato dental em Teófilo Otoni, MG, para corrigir cor, formato e alinhamento dos dentes. Agende sua avaliação.",
    intro:
      "Lâminas finas que corrigem cor, formato e alinhamento dos dentes. As facetas em porcelana são mais resistentes; as lentes de contato são ultrafinas e preservam ao máximo o dente natural.",
    sections: [
      {
        heading: "Diferença entre facetas e lentes de contato",
        paragraphs: [
          "As duas são lâminas coladas na face da frente dos dentes. As facetas em porcelana são um pouco mais espessas e resistentes; as lentes de contato dental são ultrafinas e, em muitos casos, exigem pouco ou nenhum desgaste do dente.",
          "A escolha depende do que precisa ser corrigido e das condições de cada dente, e é feita junto com o paciente na avaliação.",
        ],
      },
      {
        heading: "O que pode ser corrigido",
        items: [
          "Cor: manchas e escurecimentos que o clareamento não resolve",
          "Formato: dentes pequenos, desgastados ou com pequenas fraturas",
          "Alinhamento: pequenos desalinhamentos e espaços entre os dentes",
        ],
        paragraphs: [
          "Desalinhamentos maiores ou problemas de mordida podem precisar de ortodontia antes das lâminas.",
        ],
      },
      {
        heading: "Cuidados depois do tratamento",
        items: [
          "Escovação e fio dental todos os dias, como nos dentes naturais",
          "Evitar morder objetos duros, como canetas e unhas",
          "Consultas de revisão periódicas",
          "Uso de placa de proteção quando houver bruxismo",
        ],
      },
    ],
    faq: [
      {
        question: "Precisa desgastar o dente?",
        answer:
          "Depende. As lentes de contato costumam exigir desgaste mínimo ou nenhum; as facetas podem precisar de um preparo maior. O dentista avalia caso a caso.",
      },
      {
        question: "Lentes de contato dental mancham?",
        answer:
          "As lâminas de porcelana são resistentes a manchas, mas a higiene e as consultas de revisão continuam importantes, inclusive para a gengiva e para os dentes naturais.",
      },
      {
        question: "Quem tem bruxismo pode fazer?",
        answer:
          "O bruxismo precisa ser avaliado antes, porque o apertamento pode danificar as lâminas. Em alguns casos é indicado o uso de placa de proteção durante o sono.",
      },
      {
        question: "Quanto custa?",
        answer: "Depende do número de dentes, do material e do planejamento. O orçamento é passado depois da avaliação.",
      },
    ],
    whatsappMessage: "Olá, gostaria de saber mais sobre facetas e lentes de contato dental na Odonto Casais.",
  },
  {
    slug: "ortodontia",
    name: "Ortodontia",
    heading: "Ortodontia em Teófilo Otoni",
    seoTitle: "Ortodontia em Teófilo Otoni | Odonto Casais",
    description:
      "Ortodontia em Teófilo Otoni, MG: alinhamento dos dentes e correção da mordida, com acompanhamento contínuo. Agende sua avaliação na Odonto Casais.",
    intro: "Alinhamento funcional e estético da mordida, com acompanhamento contínuo ao longo do tratamento.",
    sections: [
      {
        heading: "Quando a ortodontia é indicada",
        items: [
          "Dentes tortos, apinhados ou com espaços entre si",
          "Mordida cruzada, aberta ou profunda",
          "Dificuldade de higienizar por causa da posição dos dentes",
          "Preparo para outros tratamentos, como facetas ou implantes",
        ],
      },
      {
        heading: "Como é o acompanhamento",
        paragraphs: [
          "O tratamento começa com a avaliação e a documentação ortodôntica, que orientam o planejamento e a escolha do aparelho. Depois da instalação, o paciente volta periodicamente para as manutenções.",
          "Ao final, é usada uma contenção para manter os dentes na nova posição.",
        ],
      },
    ],
    faq: [
      {
        question: "Adulto pode usar aparelho?",
        answer:
          "Sim. Não há idade máxima para a ortodontia, desde que dentes e gengiva estejam saudáveis. A avaliação mostra se há algo a tratar antes.",
      },
      {
        question: "Quanto tempo dura o tratamento?",
        answer:
          "Varia conforme o caso, a idade e a colaboração do paciente. Uma estimativa é passada depois da avaliação e da documentação ortodôntica.",
      },
      {
        question: "Com que frequência preciso voltar?",
        answer: "As manutenções costumam ser mensais, mas o intervalo é definido pelo dentista de acordo com o caso.",
      },
      {
        question: "Aparelho dói?",
        answer:
          "É comum sentir sensibilidade nos primeiros dias após a instalação e depois das manutenções. Isso costuma passar em poucos dias.",
      },
    ],
    whatsappMessage: "Olá, gostaria de saber mais sobre ortodontia na Odonto Casais.",
  },
  {
    slug: "endodontia",
    name: "Endodontia",
    heading: "Endodontia (tratamento de canal) em Teófilo Otoni",
    seoTitle: "Tratamento de Canal em Teófilo Otoni | Odonto Casais",
    description:
      "Tratamento de canal (endodontia) em Teófilo Otoni, MG, para aliviar a dor e preservar o dente natural. Agende sua avaliação na Odonto Casais.",
    intro: "Tratamento de canal com técnica precisa para aliviar a dor e preservar o dente natural.",
    sections: [
      {
        heading: "Quando o tratamento de canal é indicado",
        paragraphs: ["O canal é indicado quando a polpa, a parte interna do dente, está inflamada ou infeccionada. Alguns sinais comuns:"],
        items: [
          "Dor espontânea ou ao mastigar",
          "Sensibilidade prolongada ao quente ou ao frio",
          "Escurecimento do dente",
          "Inchaço ou bolinha na gengiva",
          "Cárie profunda ou trauma no dente",
        ],
      },
      {
        heading: "Como é feito",
        paragraphs: [
          "Com anestesia local, o dentista remove a polpa comprometida, limpa e desinfeta os canais e depois os preenche e veda. Radiografias acompanham cada etapa.",
          "Em seguida, o dente recebe uma restauração ou uma coroa para voltar a funcionar normalmente.",
        ],
      },
    ],
    faq: [
      {
        question: "Tratamento de canal dói?",
        answer:
          "É feito com anestesia local, para que o procedimento seja confortável. Sensibilidade nos dias seguintes pode ocorrer e é orientada pelo dentista.",
      },
      {
        question: "Quantas sessões são necessárias?",
        answer: "Pode ser feito em uma ou mais sessões, dependendo do dente e da presença de infecção.",
      },
      {
        question: "Não é melhor extrair o dente?",
        answer:
          "Sempre que possível, manter o dente natural é a primeira opção, e o tratamento de canal existe para isso. A extração é considerada quando o dente não pode ser recuperado.",
      },
      {
        question: "Preciso de coroa depois do canal?",
        answer:
          "Depende de quanto do dente foi perdido. Em muitos casos é indicada uma restauração reforçada ou uma coroa para proteger o dente.",
      },
    ],
    whatsappMessage: "Olá, gostaria de saber mais sobre tratamento de canal na Odonto Casais.",
  },
];

export function getTreatment(slug: string) {
  return treatments.find((item) => item.slug === slug);
}

export function getTreatmentPath(slug: string) {
  return `/tratamentos/${slug}`;
}
