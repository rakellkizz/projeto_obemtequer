package com.rakellkizz.obemquetequer.api.repository;

import com.rakellkizz.obemquetequer.api.model.Sentimento;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SentimentoRepository extends MongoRepository<Sentimento, String> {
    // Métodos personalizados aqui (se quiser)
}
// package com.rakellkizz.obemquetequer.api.repository;
//
// import com.rakellkizz.obemquetequer.api.model.Sentimento;
// import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.stereotype.Repository;
//
// @Repository  
// public interface SentimentoRepository extends MongoRepository<Sentimento, String> {
//     // Métodos personalizados aqui (se quiser)   