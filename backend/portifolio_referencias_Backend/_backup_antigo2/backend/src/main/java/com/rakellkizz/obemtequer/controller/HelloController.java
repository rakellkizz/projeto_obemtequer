package com.rakellkizz.obemtequer.controller;

import org.springframework.web.bind.annotation.*;
import com.rakellkizz.obemtequer.model.Mensagem;

/**
 * Controlador responsável por lidar com as mensagens recebidas pela API.
 *
 * Este endpoint permite que clientes enviem mensagens via método POST,
 * retornando uma confirmação com o conteúdo recebido.
 */
@RestController
@RequestMapping("/mensagens")

public class HelloController {

    /**
     * Recebe uma mensagem enviada via requisição POST no corpo da requisição.
     *
     * @param mensagem Objeto {@link Mensagem} contendo o texto enviado pelo
     *                 cliente.
     * @return Uma string confirmando o recebimento da mensagem.
     */
    @PostMapping
    public String receberMensagem(@RequestBody Mensagem mensagem) {
        return "Recebido: " + mensagem.getConteudo();
    }
}
