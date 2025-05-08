package com.rakellkizz.obemtequer.api.model;

import jakarta.persistence.*;

/**
 * Entidade JPA que representa uma mensagem trocada entre o usuário e o sistema
 * empático. Persistida no banco de dados H2.
 */
@Entity
public class Message {

    // Identificador único da mensagem (chave primária)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nome ou identificador do remetente da mensagem
    private String sender;

    // Conteúdo enviado pelo usuário
    private String content;

    // Resposta gerada pelo sistema
    private String response;

    // --- Getters e Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
