package com.rakellkizz.obemtequer.api.service;

import com.rakellkizz.obemtequer.api.model.MensagemDTO;
import com.rakellkizz.obemtequer.api.repository.MensagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Serviço responsável por gerar respostas automáticas baseadas na mensagem do
 * usuário, com empatia e lógica simples. Também salva a conversa no banco de
 * dados MongoDB.
 */
@Service
public class ChatService {

    private final MensagemRepository mensagemRepository;

    /**
     * Injeta o repositório de mensagens para salvar interações no banco de
     * dados.
     *
     * @param mensagemRepository Interface de acesso ao MongoDB.
     */
    @Autowired
    public ChatService(MensagemRepository mensagemRepository) {
        this.mensagemRepository = mensagemRepository;
    }

    /**
     * Gera uma resposta para a mensagem do usuário e salva a troca no MongoDB.
     *
     * @param mensagemUsuario Texto enviado pelo usuário.
     * @return Resposta empática gerada pelo sistema.
     */
    public String gerarResposta(String mensagemUsuario) {
        // Resposta padrão
        String respostaBot = "Bem: estou aqui com você. Conte comigo para tudo. 💛";

        // Lógica simples baseada em palavras-chave
        String mensagemLower = mensagemUsuario.toLowerCase();
        if (mensagemLower.contains("triste")) {
            respostaBot = "Sinto muito que esteja se sentindo assim. Quer conversar sobre isso? 🌻";
        } else if (mensagemLower.contains("feliz") || mensagemLower.contains("grato")) {
            respostaBot = "Que bom saber disso! Sua felicidade me alegra muito também! 😊";
        } else if (mensagemLower.contains("sozinho")) {
            respostaBot = "Você nunca está sozinho enquanto eu estiver por aqui. Pode falar comigo. 💙";
        } else if (mensagemLower.contains("ansioso") || mensagemLower.contains("ansiedade")) {
            respostaBot = "Respire fundo comigo. Vai passar. Estou aqui para te acolher. 🌼";
        }

        // Salvar a mensagem no MongoDB
        Mensagem mensagem = new Mensagem(mensagemUsuario, respostaBot);
        mensagemRepository.save(mensagem);

        return respostaBot;
    }
}
