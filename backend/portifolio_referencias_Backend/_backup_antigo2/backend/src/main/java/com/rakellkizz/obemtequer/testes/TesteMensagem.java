package com.rakellkizz.obemtequer.testes;

import com.rakellkizz.obemtequer.model.Mensagem;

/**
 * Classe de teste para verificar o funcionamento da classe de modelo
 * {@link Mensagem}.
 * 
 * Esta classe cria uma instância de Mensagem e imprime seus valores no console.
 * Ideal para testes rápidos durante o desenvolvimento.
 * 
 * @author Raquel
 */
public class TesteMensagem {

    /**
     * Método principal que executa os testes simples da classe Mensagem.
     * 
     * @param args argumentos da linha de comando (não utilizados aqui).
     */
    public static void main(String[] args) {
        // Criando um objeto Mensagem com conteúdo e autor
        Mensagem m = new Mensagem("Você é especial!", "IA Empática");

        // Exibindo os dados da mensagem
        System.out.println("Conteúdo: " + m.getConteudo()); // Deve mostrar o conteúdo
        System.out.println("Autor: " + m.getAutor()); // Deve mostrar o autor
        System.out.println(m); // Mostra o objeto inteiro (se toString() estiver implementado)
    }
}
