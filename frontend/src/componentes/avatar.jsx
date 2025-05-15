// Avatar.jsx
// Componente visual reutilizável para exibir um avatar de usuário com fallback e acessibilidade.

/**
 * Importa a biblioteca React e as propriedades necessárias do componente.
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente funcional Avatar
 *
 * Exibe uma imagem de avatar com suporte para:
 * - Fallback em caso de erro no carregamento da imagem
 * - Texto alternativo acessível
 * - Estilização personalizável via Tailwind
 *
 * @param {string} src - URL da imagem do avatar
 * @param {string} alt - Texto alternativo para acessibilidade
 * @param {string} size - Tamanho do avatar (ex: 'w-10 h-10', 'w-16 h-16')
 * @param {string} fallback - Texto (ex: iniciais) para mostrar caso a imagem não carregue
 */
const Avatar = ({ src, alt, size = 'w-12 h-12', fallback = '?' }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold uppercase ${size}`}
      role="img"
      aria-label={alt}
    >
      {imgError || !src ? (
        // Mostra texto fallback caso a imagem falhe ao carregar
        <span>{fallback}</span>
      ) : (
        <img
          src={src}
          alt={alt}
          className="rounded-full object-cover w-full h-full"
          onError={() => setImgError(true)} // Marca erro se a imagem não carregar
        />
      )}
    </div>
  );
};

/**
 * Validação das props esperadas pelo componente
 */
Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string,
  fallback: PropTypes.string,
};

/**
 * Exporta o componente Avatar para uso em outros lugares da aplicação
 */
export default Avatar;
