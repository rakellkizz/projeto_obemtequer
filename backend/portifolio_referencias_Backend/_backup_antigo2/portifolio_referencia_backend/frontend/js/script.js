// Exibe uma mensagem no console informando que a página foi carregada com sucesso
console.log("Página carregada com amor 💕");

// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function () {

  // Seleciona o formulário de contato pelo ID
  const form = document.getElementById('contato-form');

  // Seleciona a div onde será exibida a resposta após o envio
  const respostaDiv = document.getElementById('resposta');

  // Adiciona um ouvinte de evento para quando o formulário for enviado
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

    // Coleta os valores digitados pelo usuário, removendo espaços extras
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !mensagem) {
      alert('Por favor, preencha todos os campos antes de enviar 💡');
      return; // Interrompe o processo se algum campo estiver vazio
    }

    // Aqui você poderá futuramente fazer uma requisição para o backend (API)
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Mensagem:', mensagem);

    // Exibe uma resposta carinhosa ao usuário na tela
    respostaDiv.innerHTML = `<p>🌟 Obrigada, ${nome}! Sua mensagem foi recebida com carinho 💖</p>`;

    // Lim
