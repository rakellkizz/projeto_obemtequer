package com.rakellkizz.obemtequer.api.service;

import com.rakellkizz.obemtequer.api.dto.MessageDTO;
import com.rakellkizz.obemtequer.api.model.Message;
import com.rakellkizz.obemtequer.api.repository.MessageRepository;
import org.springframework.stereotype.Service;

/**
 * Serviço responsável por processar as mensagens recebidas do usuário, gerar
 * uma resposta empática e persistir a interação no banco de dados.
 */
@Service
public class ChatService {

    private final MessageRepository repository;

    /**
     * Injeta o repositório responsável pelas operações de persistência de
     * mensagens.
     *
     * @param repository Instância de MessageRepository
     */
    public ChatService(MessageRepository repository) {
        this.repository = repository;
    }

    /**
     * Processa a mensagem recebida do frontend, gera uma resposta e salva no
     * banco.
     *
     * @param dto Objeto DTO contendo os dados da mensagem enviada pelo usuário
     * @return Objeto Message persistido no banco de dados, incluindo a resposta
     * gerada
     */
    public Message processarMensagem(MessageDTO dto) {
        // Converte o DTO (objeto de transferência) em uma entidade do domínio
        Message message = new Message();
        message.setSender(dto.getSender());      // Define o remetente da mensagem
        message.setContent(dto.getContent());    // Define o conteúdo enviado pelo usuário

        // Gera uma resposta empática fixa (futuramente pode ser substituída por IA/NLP)
        message.setResponse("Bem: estou aqui com você. Conte comigo para tudo. 💛");

        // Persiste a entidade no banco de dados e retorna o resultado
        return repository.save(message);
    }
}
