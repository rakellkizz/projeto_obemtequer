package com.rakellkizz.obemtequer.api.dto;

/**
 * Data Transfer Object (DTO) utilizado para transportar dados entre o cliente
 * (frontend) e o backend durante a comunicação.
 *
 * Este objeto representa uma mensagem enviada pelo usuário.
 */
public class MessageDTO {

    // Nome ou identificador de quem enviou a mensagem
    private String sender;

    // Conteúdo textual da mensagem enviada
    private String content;

    // Getter para o remetente
    public String getSender() {
        return sender;
    }

    // Setter para o remetente
    public void setSender(String sender) {
        this.sender = sender;
    }

    // Getter para o conteúdo da mensagem
    public String getContent() {
        return content;
    }

    // Setter para o conteúdo da mensagem
    public void setContent(String content) {
        this.content = content;
    }
}
