document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contato-form');
    const respostaDiv = document.getElementById('resposta');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Evita recarregar a página
  
      const nome = document.getElementById('nome').value;
      const mensagem = document.getElementById('mensagem').value;
  
      // Simula envio dos dados
      console.log('Nome:', nome);
      console.log('Mensagem:', mensagem);
  
      respostaDiv.innerHTML = `<p>🌟 Obrigada, ${nome}! Sua mensagem foi recebida com carinho.</p>`;
      form.reset(); // Limpa o formulário
    });
  });
  