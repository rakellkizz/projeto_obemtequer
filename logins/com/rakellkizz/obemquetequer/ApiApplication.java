package com.obemtequer;
import java.util.Scanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principal da aplicação Spring Boot "O Bem Te Quer".
 *
 * Esta classe serve como ponto de entrada da aplicação. Ao ser executada,
 * ela inicializa o contexto do Spring, configura automaticamente os componentes
 * necessários e inicia o servidor web embutido (como Tomcat).
 *
 * A anotação {@code @SpringBootApplication} é uma meta-anotação que combina:
 * - {@code @Configuration}: Define a classe como uma fonte de beans do Spring.
 * - {@code @EnableAutoConfiguration}: Habilita a configuração automática com base no classpath.
 * - {@code @ComponentScan}: Habilita a varredura de componentes nos pacotes.
 *
 * Desenvolvido por Raquel 💛
 */
@SpringBootApplication
public class ApiApplication {

    /**
     * Método principal que inicializa a aplicação Spring Boot e simula uma
     * conversa empática com o(a) usuário(a) no terminal.
     *
     * @param args Argumentos de linha de comando (opcional).
     */
    public static void main(String[] args) {
        // Inicia o contexto Spring Boot
        SpringApplication.run(ApiApplication.class, args);

        // Simula uma conversa simples no terminal com empatia
        iniciarConversaEmpatica();
    }

    /**
     * Método auxiliar que conduz uma conversa acolhedora com o(a) usuário(a)
     * via terminal, baseado no sentimento informado.
     */
    public static void iniciarConversaEmpatica() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("✨ Bem-vinda(o) ao Bem Te Quer ✨");

        // Solicita o nome do(a) usuário(a)
        System.out.print("Qual é o seu nome? ");
        String nome = scanner.nextLine();

        // Solicita como o(a) usuário(a) está se sentindo
        System.out.print("Como você está se sentindo hoje, " + nome + "? ");
        String sentimento = scanner.nextLine().toLowerCase();

        // Gera e exibe uma resposta empática
        String resposta = analisarSentimento(sentimento, nome);
        System.out.println(resposta);
        System.out.println("\n🌼 Um abraço carinhoso do Bem Te Quer 🌼");

        scanner.close();
    }

    /**
     * Analisa o sentimento informado e retorna uma mensagem de acolhimento.
     *
     * @param sentimento Sentimento descrito pelo(a) usuário(a).
     * @param nome       Nome da pessoa, para personalizar a resposta.
     * @return Mensagem empática personalizada.
     */
    public static String analisarSentimento(String sentimento, String nome) {
        if (sentimento.contains("triste") || sentimento.contains("mal") || sentimento.contains("cansado") || sentimento.contains("sozinho")) {
            return "\nSinto muito por você estar se sentindo assim, " + nome + ".\nEstou aqui com você, e quero te lembrar que você não está sozinho(a). 💛";

        } else if (sentimento.contains("ansioso") || sentimento.contains("preocupado")) {
            return "\nRespira fundo comigo, " + nome + ". Tá tudo bem sentir isso.\nVocê está fazendo o seu melhor, e isso já é incrível. 🌿";

        } else if (sentimento.contains("feliz") || sentimento.contains("bem") || sentimento.contains("grato")) {
            return "\nQue maravilha ouvir isso, " + nome + "! 😄\nFico muito feliz por você estar se sentindo assim. Aproveite cada instante!";

        } else {
            return "\nObrigado por compartilhar, " + nome + ".\nSe quiser conversar mais, estou aqui, tá bem? 💙";
        }
    }
}
