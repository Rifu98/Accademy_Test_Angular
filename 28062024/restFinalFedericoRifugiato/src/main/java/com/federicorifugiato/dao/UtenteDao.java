package com.federicorifugiato.dao;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.federicorifugiato.model.Utente;

public interface UtenteDao extends CrudRepository<Utente, Integer>{

	boolean existsByEmail(String mail);
	Optional<Utente> findByEmail(String mail);
}
