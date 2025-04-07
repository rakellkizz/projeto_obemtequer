package com.model;

/**
 * Classe que representa uma mensagem simples contendo apenas um texto.
 *
 * Essa classe é usada como modelo de dados (DTO) para receber e enviar
 * mensagens através das requisições HTTP no sistema.
 */
public class Mensagem {

    /**
     * Conteúdo textual da mensagem.
     */
    private String texto;

    /**
     * Retorna o conteúdo da mensagem.
     *
     * @return texto da mensagem
     */
    public String getTexto() {
        return texto;
    }

    /**
     * Define o conteúdo da mensagem.
     *
     * @param texto texto da mensagem a ser definido
     */
    public void setTexto(String texto) {
        this.texto = texto;
    }
}
