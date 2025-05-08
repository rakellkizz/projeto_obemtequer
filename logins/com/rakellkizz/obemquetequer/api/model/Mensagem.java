package com.rakellkizz.obemquetequer.api.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * A classe Mensagem representa um documento da coleção "mensagens" no MongoDB.
 * Cada instância dessa classe corresponde a uma troca de mensagem entre o usuário e o chatbot.
 */
@Document(collection = "mensagens")
public class Mensagem {

    @Id
    private String id;

    private String mensagemUsuario;

    private String respostaBot;

    public Mensagem() {
        // Construtor vazio necessário para frameworks de persistência
    }

    public Mensagem(String mensagemUsuario, String respostaBot) {
        this.mensagemUsuario = mensagemUsuario;
        this.respostaBot = respostaBot;
    }

    public String getId() {
        return id;
    }

    public String getMensagemUsuario() {
        return mensagemUsuario;
    }

    public void setMensagemUsuario(String mensagemUsuario) {
        this.mensagemUsuario = mensagemUsuario;
    }

    public String getRespostaBot() {
        return respostaBot;
    }

    public void setRespostaBot(String respostaBot) {
        this.respostaBot = respostaBot;
    }
}
