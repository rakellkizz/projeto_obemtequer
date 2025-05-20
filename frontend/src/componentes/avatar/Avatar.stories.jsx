// src/componentes/avatar/Avatar.stories.jsx

/**
 * Storybook - Avatar
 * Este arquivo define as histórias interativas do componente Avatar.
 * Ele permite documentar, testar e visualizar variações do componente diretamente na interface do Storybook.
 */

import React from 'react';
// ✅ Caminho corrigido para refletir a nova estrutura de pastas
import Avatar from './Avatar'; // Importa o componente Avatar localizado no mesmo diretório

// 🔧 Configuração padrão do Storybook para o componente Avatar
export default {
  title: 'Componentes/Avatar',  // Caminho hierárquico exibido na UI do Storybook
  component: Avatar,            // O componente base utilizado nas histórias
  tags: ['autodocs'],           // Habilita geração automática de documentação (se configurado)
  argTypes: {
    src: {
      control: 'text',
      description: 'URL da imagem exibida no avatar',
    },
    alt: {
      control: 'text',
      description: 'Texto alternativo para acessibilidade',
    },
    fallback: {
      control: 'text',
      description: 'Texto de fallback caso a imagem falhe',
    },
    size: {
      control: { type: 'select' },
      options: ['w-12 h-12', 'w-16 h-16', 'w-24 h-24', 'w-32 h-32'],
      description: 'Tamanho do avatar definido por classes utilitárias do Tailwind CSS',
    },
  },
};

// 📌 Template base utilizado como molde para cada variação do componente
const Template = (args) => <Avatar {...args} />;

// 📷 Avatar padrão com imagem
export const Padrao = Template.bind({});
Padrao.args = {
  src: '/assets/victor_01_sem_fundo.png',
  alt: 'Victor',
  fallback: 'VC',
  size: 'w-16 h-16',
};

// ❌ Avatar sem imagem (exibe fallback)
export const SemImagem = Template.bind({});
SemImagem.args = {
  src: '',
  alt: 'Fallback de usuário',
  fallback: '??',
  size: 'w-16 h-16',
};

// 🔍 Avatar com tamanho grande
export const Grande = Template.bind({});
Grande.args = {
  src: '/assets/raquel.png',
  alt: 'Raquel',
  fallback: 'R',
  size: 'w-24 h-24',
};

// 🧩 Avatar com tamanho pequeno
export const Pequeno = Template.bind({});
Pequeno.args = {
  src: '/assets/icone_pequeno.png',
  alt: 'Ícone',
  fallback: 'I',
  size: 'w-12 h-12',
};
