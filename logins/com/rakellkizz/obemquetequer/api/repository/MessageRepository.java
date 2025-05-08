package com.rakellkizz.obemtequer.api.repository;

import com.rakellkizz.obemtequer.api.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositório JPA responsável por realizar operações de acesso a dados para a
 * entidade Message. Herdando de JpaRepository, ele fornece métodos prontos para
 * CRUD (Create, Read, Update, Delete).
 */
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    // Pode-se adicionar métodos personalizados aqui, se necessário.
}
