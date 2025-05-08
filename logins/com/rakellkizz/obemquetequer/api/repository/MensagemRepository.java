package com.rakellkizz.obemquetequer.api.repository;

import com.rakellkizz.obemquetequer.api.model.Mensagem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Interface de repositório MongoDB para armazenar e recuperar mensagens de chat.
 */
@Repository
public interface MensagemRepository extends MongoRepository<Mensagem, String> {
    // Métodos personalizados podem ser adicionados aqui, se necessário
}
//     */
//     public void setMensagemUsuario(String mensagemUsuario) {