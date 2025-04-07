package com.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador responsável por fornecer uma rota de teste/saudação da API.
 *
 * Esta classe contém um endpoint principal (GET /) que pode ser usado para verificar
 * se a API está online e funcionando corretamente.
 */
@RestController
public class MensagemController {

    /**
     * Endpoint de saudação inicial da API.
     *
     * @return Uma mensagem indicando que a API está ativa.
     */
    @GetMapping("/")
    public String hello() {
        return "API Obemtequer está no ar! 🌈";
    }

}
