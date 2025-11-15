package com.rakellkizz.obemtequer.api.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principal responsável por inicializar a aplicação Spring Boot.
 *
 * A anotação @SpringBootApplication ativa a configuração automática do Spring,
 * o escaneamento de componentes (Component Scan), e a configuração do Spring
 * Boot.
 *
 * Esta aplicação oferece suporte ao chatbot "Obem Te Quer" por meio de APIs
 * RESTful.
 */
@SpringBootApplication(scanBasePackages = "com.rakellkizz.obemtequer.api")
public class ObemTeQuerApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ObemTeQuerApiApplication.class, args);
    }
}
