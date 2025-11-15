package com.rakellkizz.obemtequer.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principal responsável por iniciar a aplicação Spring Boot.
 *
 * A anotação {@code @SpringBootApplication} indica que esta é a classe de
 * entrada da aplicação e habilita o auto-config do Spring.
 * 
 * Ao ser executada, ela inicia todo o contexto da aplicação web.
 */
@SpringBootApplication
public class ApiApplication {

	/**
	 * Método principal (main) que inicializa a aplicação Spring Boot.
	 *
	 * @param args Argumentos passados pela linha de comando (opcional).
	 */
	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}
}
