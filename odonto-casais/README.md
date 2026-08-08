# Odonto Casais

Site institucional premium para o consultório odontológico Odonto Casais, desenvolvido com foco em confiança, sofisticação, modernidade e conversão de novos pacientes.

## Stack

- Next.js 16 com App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide Icons
- Componentes no estilo shadcn/ui

## Direção visual

A identidade foi construída a partir da logo enviada. O sistema usa como referência principal:

- fundo escuro da marca como base conceitual para contrastes e seções premium
- tons claros e quentes derivados da logo para áreas de destaque
- tipografia limpa, com títulos em Poppins e texto em Plus Jakarta Sans
- bordas arredondadas, sombras suaves e muito espaço em branco
- animações discretas com fade, slide e scale

## Estrutura implementada

### Hero

- primeira dobra com visual grande e institucional
- chamada principal com foco em confiança
- botões para WhatsApp e tratamentos
- cards curtos de credibilidade
- imagem fictícia gerada em SVG para representar o consultório

### Sobre a clínica

- texto institucional fictício, escrito em português do Brasil
- blocos de estatísticas animadas
- imagem fictícia com linguagem visual coerente com a marca

### Diferenciais

- cards com ícones e microinterações
- foco em humanização, biossegurança, tecnologia e prevenção

### Serviços

- grid de serviços com CTA individual
- preparado para expansão em páginas internas no futuro

### Antes e depois

- slider comparativo com casos fictícios
- controle de comparação por range
- cards laterais para trocar o caso ativo

### Equipe

- cards com profissionais fictícios
- foto placeholder em SVG
- botão para futura navegação individual

### Vídeo institucional

- seção de player no estilo YouTube
- placeholder elegante para inserção futura de vídeo real

### Depoimentos

- carrossel controlado por estado
- avaliações fictícias com aparência realista

### FAQ

- accordion moderno com perguntas frequentes
- respostas pensadas para reduzir objeções antes do contato

### Chamada final

- bloco escuro de alta conversão
- botão grande para WhatsApp

### Contato

- telefones, e-mail, horário e endereço fictícios
- mini mapa visual como placeholder do Google Maps

### Rodapé

- logo
- links rápidos
- redes sociais
- direitos autorais

## SEO e metadados

O layout já inclui:

- title e description
- Open Graph
- Twitter Cards
- favicon em SVG
- robots.txt via route handler
- sitemap.xml via route handler
- schema orgânico preparado para evolução futura

## Como o site foi organizado

### Arquitetura principal

- `src/app/layout.tsx`: define fontes, metadados e estrutura global
- `src/app/page.tsx`: renderiza a página principal
- `src/components/site-home.tsx`: concentra a landing page e seus blocos interativos
- `src/components/ui/*`: componentes visuais base no estilo shadcn/ui
- `src/lib/placeholders.ts`: gera artes fictícias em SVG via data URI
- `src/lib/utils.ts`: utilitário `cn` para composição de classes

### Fluxo de conteúdo

1. Os dados principais ficam declarados em arrays dentro de `site-home.tsx`.
2. O layout consome esses dados para renderizar seções consistentes.
3. As imagens fictícias são geradas por `createIllustration`, evitando dependência externa.
4. O comportamento interativo é mantido no cliente com Framer Motion e estados locais.

### Personalização futura

Para trocar o conteúdo fictício por dados reais:

- substitua textos, nomes e contatos em `src/components/site-home.tsx`
- troque os placeholders SVG por fotografias reais quando houver material definitivo
- ajuste o domínio em `src/app/layout.tsx`, `src/app/robots.ts` e `src/app/sitemap.ts`
- conecte o botão do WhatsApp a um número válido
- evolua o vídeo institucional para um embed real do YouTube
- expanda os cards de serviços para páginas internas ou um blog

## Rodando o projeto

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Observação

O projeto foi criado dentro da subpasta `odonto-casais` porque o diretório raiz do workspace contém maiúsculas, o que impede o `create-next-app` de gerar o nome do pacote corretamente no npm.