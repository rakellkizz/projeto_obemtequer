package com.rakellkizz.obemtequer.api.controller;

import com.rakellkizz.obemtequer.api.dto.MensagemDTO;
import com.rakellkizz.obemtequer.api.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller REST que simula uma resposta empática do chatbot.
 */
@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/responder")
    public String responder(@RequestBody MensagemDTO mensagemDTO) {
        String mensagem = mensagemDTO.getMensagem();
        return chatService.gerarResposta(mensagem);
    }
}
