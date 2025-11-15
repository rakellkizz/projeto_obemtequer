// ========================================================================================
// 📄 frasesVoz.js – Frases prontas (strings) e geradoras (funções) para o Login por Voz
// Compatível com:
//   1) import FrasesVoz from '../Acessibilidade/frasesVoz'           (default)
//   2) import { FrasesVoz } from '../Acessibilidade/frasesVoz'       (nomeado)
//   3) import * as frases from '../Acessibilidade/frasesVoz'         (namespace)
// E mantém seus exports nomeados originais.
// ========================================================================================

// ------------------------------
// ✅ Exports nomeados originais
// ------------------------------
export const deletar =
  '❌ Palavra mágica apagada. Diga "gravar" para cadastrar outra ou "voltar" para retornar.';

export const nenhumaSalva =
  'Você ainda não tem palavras salvas. Diga "gravar" para cadastrar uma nova.';

export const historico = (lista = []) =>
  `Últimas palavras salvas: ${lista.join(', ')}. Para usar uma delas, diga "gravar" e repita a palavra duas vezes.`;

export const gravarConfirmar = (palavra = '') =>
  `Você disse: "${palavra}". Por favor, repita para confirmar.`;

export const boasVindasSemPalavra =
  'Bem-vinda! Vamos cadastrar sua palavra mágica. Diga sua nova palavra depois do sinal.';

export const comandosDisponiveis =
  'Comandos disponíveis: "gravar", "trocar senha", "deletar", "histórico" e "voltar".';

export const sucessoConfirmacao =
  'Palavra confirmada e gravada com sucesso. Acessando o sistema...';

export const erroConfirmacao =
  'As duas palavras não conferem. Diga "gravar" para tentar novamente, ou "voltar" para sair.';

export const navegandoVoltar = 'Voltando à tela inicial.';

export const boasVindasComPalavra =
  'Bem-vinda! Diga sua palavra mágica para entrar. Se quiser trocar, diga "gravar".';

export const palavraCorreta = 'Perfeito! Palavra correta. Acessando...';

export const palavraIncorreta = 'Palavra incorreta. Tente novamente.';

export const palavraIncorreta2 =
  'Palavra incorreta novamente. Voltando ao menu de opções. Diga "gravar" para cadastrar outra palavra, ou "histórico" para ouvir as últimas salvas.';

// ------------------------------
// ✅ Objeto compatível com LoginMagico.jsx
// Mapeia seus textos para as chaves esperadas em LoginMagico:
//   - naoConfigurado, pedirPalavra, sucessoGravacao, aceita, incorreta, voltando
// ------------------------------
export const FrasesVoz = {
  loginMagico: {
    // quando não há palavra cadastrada
    naoConfigurado: boasVindasSemPalavra,

    // quando já há palavra e o sistema pede para falar
    pedirPalavra: boasVindasComPalavra,

    // quando o usuário grava/confirmou com sucesso
    sucessoGravacao: sucessoConfirmacao,

    // quando reconhece a palavra e libera acesso
    aceita: palavraCorreta,

    // quando não reconhece / está incorreta
    incorreta: palavraIncorreta,

    // quando o usuário fala "voltar"
    voltando: navegandoVoltar,
  },

  // (Opcional) você pode aproveitar seus outros textos agrupados aqui também:
  comandosDisponiveis,
  mensagens: {
    deletar,
    nenhumaSalva,
    erroConfirmacao,
    historico,
    gravarConfirmar,
    palavraIncorreta2,
  },
};

// ✅ Export default para permitir `import FrasesVoz from ...`
export default FrasesVoz;

// ========================================================================================
// FIM – frasesVoz.js
// ========================================================================================
