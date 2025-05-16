package com.rakellkizz.obemtequer;

import java.util.Scanner;

/**
 * Classe principal do projeto "O Bem Te Quer".
 * Simula uma conversa empática com o(a) usuário(a), oferecendo acolhimento
 * baseado no sentimento informado.
 *
 * Desenvolvido por Raquel 💛
 */
public class Main {

    /**
     * Método principal que inicia a conversa com o(a) usuário(a).
     *
     * @param args Argumentos de linha de comando (não utilizados aqui).
     */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Saudação inicial
        System.out.println("? Bem-vinda(o) ao Bem Te Quer ?");

        // Pergunta o nome da pessoa
        System.out.print("Qual é o seu nome? ");
        String nome = scanner.nextLine();

        // Pergunta como a pessoa está se sentindo
        System.out.print("Como você está se sentindo hoje, " + nome + "? ");
        String sentimento = scanner.nextLine().toLowerCase(); // converte para minúsculo para facilitar a análise

        // Analisa o sentimento e gera uma resposta empática
        String resposta = analisarSentimento(sentimento, nome);

        // Exibe a resposta ao usuário
        System.out.println(resposta);
        System.out.println("\n? Um abraço carinhoso do Bem Te Quer ?");

        // Fecha o scanner
        scanner.close();
    }

    /**
     * Analisa o conteúdo do sentimento informado e retorna uma mensagem acolhedora.
     *
     * @param sentimento Texto digitado pela pessoa sobre como ela está se sentindo.
     * @param nome       Nome da pessoa, usado para personalizar a mensagem.
     * @return Mensagem empática personalizada.
     */
    public static String analisarSentimento(String sentimento, String nome) {
        // Verifica se o sentimento tem palavras que indicam tristeza ou solidão
        if (sentimento.contains("triste") || sentimento.contains("mal") || sentimento.contains("cansado") || sentimento.contains("sozinho")) {
            return "\nSinto muito por você estar se sentindo assim, " + nome + ".\nEstou aqui com você, e quero te lembrar que você não está sozinho(a). 💛";

        // Verifica se a pessoa está ansiosa ou preocupada
        } else if (sentimento.contains("ansioso") || sentimento.contains("preocupado")) {
            return "\nRespira fundo comigo, " + nome + ". Tá tudo bem sentir isso.\nVocê está fazendo o seu melhor, e isso já é incrível. 🌿";

        // Verifica se a pessoa está feliz ou grata
        } else if (sentimento.contains("feliz") || sentimento.contains("bem") || sentimento.contains("grato")) {
            return "\nQue maravilha ouvir isso, " + nome + "! 😄\nFico muito feliz por você estar se sentindo assim. Aproveite cada instante!";

        // Resposta padrão para outros tipos de sentimento
        } else {
            return "\nObrigado por compartilhar, " + nome + ".\nSe quiser conversar mais, estou aqui, tá bem? 💙";
        }
    }
}
