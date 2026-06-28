/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LinkItem } from './types';

export const BIO_DATA = {
  name: 'SAMYRA MOREIRA',
  email: 'samyramoreira75@gmail.com',
  avatar: 'https://yt3.googleusercontent.com/1_-Ry5iCO8Ud7DFdCXaHpKRIMW8BvCuglPfhol-OUHRS_H9KBFlI6WhP1qwNEr8JUWWFJKpmusc=s160-c-k-c0x00ffffff-no-rj',
  instagramUrl: 'https://instagram.com/samyramoreira',
  tiktokUrl: 'https://tiktok.com/@samyramoreira',
};

export const SOCIAL_LINKS: LinkItem[] = [
  {
    id: 'shopmyfits',
    title: 'Afiliação Como mudei Meu Corpo',
    subtitle: 'Compre meus looks e conjuntos fitness',
    url: 'https://dashboard.kiwify.com/join/affiliate/K0fYV6Ts',
    iconName: 'ShoppingBag',
    image: 'https://scontent-gru2-1.xx.fbcdn.net/v/t1.15752-9/729003826_1374473857974655_6827511599003851738_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=1BoPCFNtLfMQ7kNvwFl0d15&_nc_oc=AdrD6NvaCwMJjxDcbuTUvjCcUM0tJsHfQq_-b-X7ocGT3eNZXQ9-G7imtF6k-tsf816iYtMiMFwQ9kv1wlj5LvZT&_nc_zt=23&_nc_ht=scontent-gru2-1.xx&_nc_ss=7b6a8&oh=03_Q7cD5gF2DY5pt38R79Gj2-VaHol3Xg5FMehomfw-ILUa74dT3Q&oe=6A68239E',
  },
  {
    id: 'tiktok',
    title: 'Afiliação Guia do Glow UP',
    subtitle: 'Treinos, rotina diária e receitas fit',
    url: 'https://dashboard.kiwify.com/join/affiliate/TMV1ruD0',
    iconName: 'Video',
    image: 'https://scontent-gru1-2.xx.fbcdn.net/v/t1.15752-9/728333671_1760382132080075_6071192769964366362_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=k4HUm-VaGBQQ7kNvwGUGoN0&_nc_oc=Adr1Wmtn2YyQa-rty8OuMTjraHiY89WnG97K7_MjGWsE0cNdt22velFbWghBBDFT_JT_bHHAqPvwIHjwklho46UA&_nc_zt=23&_nc_ht=scontent-gru1-2.xx&_nc_ss=7b6a8&oh=03_Q7cD5gGzOHPgevqa7p5XMn8qyRQV1LLFYHn8n5exJRbsR85J5w&oe=6A6822FB',
  },
];

export const MENTORSHIP_DETAILS = {
  title: 'Mentoria Individual 1-on-1',
  tagline: 'Transforme seu corpo, mente e hábitos de forma sustentável.',
  description: 'Um acompanhamento de elite totalmente personalizado, adaptado à sua rotina intensa. Juntos vamos construir a sua melhor versão física e mental.',
  benefits: [
    {
      title: 'Treino Customizado',
      description: 'Cronograma completo de musculação e cardio, planejado exclusivamente para os seus objetivos e limitações.'
    },
    {
      title: 'Plano Alimentar Inteligente',
      description: 'Cardápio focado em comida de verdade, sem restrições extremas, garantindo energia para o seu dia.'
    },
    {
      title: 'Suporte Diário Exclusivo',
      description: 'Acesso direto ao meu WhatsApp pessoal para tirar dúvidas, ajustar estratégias e manter a motivação lá em cima.'
    },
    {
      title: 'Check-ins Semanais',
      description: 'Análise detalhada de fotos, peso e medidas toda semana para garantir que você esteja evoluindo constantemente.'
    }
  ],
  testimonials: [
    {
      name: 'Mariana S.',
      result: '-8kg em 3 meses',
      text: 'A mentoria da Samyra mudou minha relação com a comida e os treinos. Me sinto mais confiante do que nunca!'
    },
    {
      name: 'Beatriz R.',
      result: 'Definição muscular',
      text: 'O suporte via WhatsApp faz toda a diferença. O plano é prático e se encaixa perfeitamente na minha rotina corrida.'
    }
  ]
};
