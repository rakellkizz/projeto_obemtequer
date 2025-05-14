package com.rakellkizz.obetequer.api.MensagemDTO;

public class MensagemDTO {
    private String mensagem;

    // Construtor padrão
    public MensagemDTO() {}

    // Construtor com parâmetro
    public MensagemDTO(String mensagem) {
        this.mensagem = mensagem;
    }

    // Getter e Setter
    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
}
