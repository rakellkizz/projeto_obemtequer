// src/componentes/avatar/Avatar.jsx
// Componente visual reutilizável para exibir um avatar de usuário com suporte a fallback, acessibilidade e status online.

/**
 * Importações principais:
 * - React: biblioteca base para construção de componentes
 * - useState: hook para gerenciar o estado de erro da imagem
 * - PropTypes: validação de tipos das props recebidas
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Componente funcional: Avatar
 *
 * Props:
 * @param {string}  src      - URL da imagem do avatar
 * @param {string}  alt      - Texto alternativo para acessibilidade (obrigatório)
 * @param {string}  fallback - Texto exibido quando a imagem não carrega (ex: iniciais)
 * @param {string}  size     - Classes Tailwind para tamanho (ex: 'w-12 h-12')
 * @param {boolean} online   - Se verdadeiro, exibe o indicador de status online
 */
const Avatar = ({
  src,
  alt,
  fallback = '?',
  size = 'w-12 h-12',
  online = false,
}) => {
  // Estado para controlar falhas no carregamento da imagem
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold uppercase ${size}`}
      role="img"
      aria-label={alt}
      tabIndex={0} // Torna o componente acessível via teclado
    >
      {/* Se a imagem falhar ou não existir, exibe o texto de fallback */}
      {imgError || !src ? (
        <span>{fallback}</span>
      ) : (
        <img
          src={src}
          alt={alt}
          className="rounded-full object-cover w-full h-full transition-opacity duration-500 ease-in fade-in"
          onError={() => setImgError(true)} // Atualiza estado em caso de erro
        />
      )}

      {/* Indicador de status online */}
      {online && (
        <span
          className="absolute bottom-0 right-0 block w-3 h-3 rounded-full bg-green-500 border-2 border-white"
          title="Online"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

/**
 * Define os tipos esperados para cada prop do componente Avatar
 */
Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  fallback: PropTypes.string,
  size: PropTypes.string,
  online: PropTypes.bool,
};

/**
 * Exporta o componente para ser utilizado em outras partes da aplicação
 */
export default Avatar;
