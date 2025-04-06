console.log("Página carregada com amor 💕");
 
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contato-form');
  const respostaDiv = document.getElementById('resposta');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // evita o envio tradicional

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    // Aqui futuramente você pode mandar isso pro backend
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Mensagem:', mensagem);

    // Exibe uma mensagem temporária
    respostaDiv.innerHTML = `<p>Obrigada, ${nome}! Sua mensagem foi enviada com carinho ❤️</p>`;
    form.reset(); // limpa os campos
  });
});
