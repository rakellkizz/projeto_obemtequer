console.log("Página carregada com amor 💕");

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contato-form');
  const respostaDiv = document.getElementById('resposta');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // evita o envio tradicional

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !mensagem) {
      alert('Por favor, preencha todos os campos antes de enviar 💡');
      return;
    }

    // Aqui futuramente você pode mandar isso pro backend
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Mensagem:', mensagem);

    respostaDiv.innerHTML = `<p>🌟 Obrigada, ${nome}! Sua mensagem foi recebida com carinho.</p>`;
    form.reset(); // limpa os campos
  });
});

  