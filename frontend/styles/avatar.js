/**
 * avatar.js
 * ------------------------------------------------------------------------------
 * Script responsável pela interatividade e acessibilidade dos avatares.
 *
 * Funcionalidades implementadas:
 * ✅ Fallback automático caso a imagem do avatar falhe
 * ✅ Destaque visual para o avatar selecionado
 * ✅ Navegação e seleção via teclado (acessibilidade)
 * ✅ Animação suave (fade-in) ao carregar a imagem
 *
 * Autor: Raquel G. de Souza | 2025
 * ------------------------------------------------------------------------------
 */

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os elementos com a classe 'avatar'
  const avatars = document.querySelectorAll('.avatar');

  avatars.forEach((avatar) => {
    const img = avatar.querySelector('img');
    const fallback = avatar.querySelector('.avatar-fallback');

    /** 
     * ================================
     * 🔁 Fallback automático para falha de imagem
     * ================================
     * Se a imagem não carregar corretamente, oculta a <img>
     * e exibe o fallback (iniciais, ícone ou texto)
     */
    if (img) {
      img.addEventListener('error', () => {
        img.style.display = 'none'; // Oculta imagem com erro
        if (fallback) {
          fallback.style.display = 'flex'; // Exibe fallback
        } else {
          console.warn('⚠️ Fallback não encontrado para o avatar:', avatar);
        }
      });

      /**
       * ✨ Animação de entrada suave ao carregar a imagem
       */
      img.addEventListener('load', () => {
        img.classList.add('fade-in'); // Classe CSS com keyframes
      });
    }

    /**
     * ================================
     * 🖱️ Destaque visual ao clicar
     * ================================
     * Ao clicar em um avatar, ele recebe a classe 'selected'
     * e os demais perdem (ex: para indicar seleção ativa)
     */
    avatar.addEventListener('click', () => {
      avatars.forEach((a) => a.classList.remove('selected'));
      avatar.classList.add('selected');
    });

    /**
     * ================================
     * ⌨️ Acessibilidade com teclado
     * ================================
     * Permite selecionar o avatar usando Enter ou Espaço
     */
    avatar.addEventListener('keydown', (event) => {
      const tecla = event.key;
      if (tecla === 'Enter' || tecla === ' ') {
        event.preventDefault(); // Evita scroll indesejado com espaço
        avatar.click(); // Dispara o clique programaticamente
      }
    });

    /**
     * ================================
     * ♿ Suporte adicional de acessibilidade
     * ================================
     * Define tabindex e role caso não estejam presentes,
     * garantindo navegação por teclado e leitura por leitores de tela
     */
    if (!avatar.hasAttribute('tabindex')) {
      avatar.setAttribute('tabindex', '0');
    }

    if (!avatar.hasAttribute('role')) {
      avatar.setAttribute('role', 'button');
    }
  });
});
