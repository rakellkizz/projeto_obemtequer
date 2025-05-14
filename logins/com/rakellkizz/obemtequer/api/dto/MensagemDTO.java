<<<<<<< HEAD:logins/com/rakellkizz/obemtequer/api/dto/MensagemDTO.java
package com.rakellkizz.obetequer.api.MensagemDTO;
=======
package com.rakellkizz.obemtequer.api.MensagemDTO;
>>>>>>> d6a04a7dafe13281adf0e5e4346554f78b0cfb72:logins/com/rakellkizz/obemquetequer/api/dto/MensagemDTO.java

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
