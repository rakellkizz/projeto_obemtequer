package com.rakellkizz.obemtequer.api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller REST que simula uma resposta empática do chatbot.
 */
@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*") // Libera requisições do frontend
public class ChatController {

    @PostMapping("/responder")
    public String responder(@RequestBody String mensagem) {
        // TODO: conectar com lógica de IA, NLP, ou HuggingFace futuramente
        return "Bem: estou aqui com você. Conte comigo para tudo. 💛";
    }
}
