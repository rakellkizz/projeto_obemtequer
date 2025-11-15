package com.rakellkizz.obemtequer.model;

/**
 * Classe que representa uma mensagem empática, contendo um conteúdo e o nome do
 * autor.
 * Pode ser usada para exibir mensagens motivacionais, de apoio ou acolhimento.
 * 
 * @author Raquel
 */
public class Mensagem {

    // Conteúdo principal da mensagem (texto da fala empática)
    private String conteudo;

    // Nome do autor da mensagem (pode ser uma pessoa ou IA)
    private String autor;

    /**
     * Construtor da classe Mensagem.
     *
     * @param conteudo Texto da mensagem a ser exibida.
     * @param autor    Nome da pessoa (ou sistema) que escreveu a mensagem.
     */
    public Mensagem(String conteudo, String autor) {
        this.conteudo = conteudo;
        this.autor = autor;
    }

    /**
     * Obtém o conteúdo da mensagem.
     *
     * @return Texto com o conteúdo da mensagem.
     */
    public String getConteudo() {
        return conteudo;
    }

    /**
     * Atualiza o conteúdo da mensagem.
     *
     * @param conteudo Novo texto da mensagem.
     */
    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    /**
     * Obtém o nome do autor da mensagem.
     *
     * @return Nome do autor.
     */
    public String getAutor() {
        return autor;
    }

    /**
     * Define ou atualiza o autor da mensagem.
     *
     * @param autor Nome do novo autor.
     */
    public void setAutor(String autor) {
        this.autor = autor;
    }

    /**
     * Retorna uma representação textual da mensagem.
     * Útil para exibir no console ou logs de debug.
     *
     * @return Texto formatado com conteúdo e autor.
     */
    @Override
    public String toString() {
        return "Mensagem{" +
                "conteudo='" + conteudo + '\'' +
                ", autor='" + autor + '\'' +
                '}';
    }
}
