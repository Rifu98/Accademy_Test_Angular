package com.federicorifugiato.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.federicorifugiato.model.Categoria;
import com.federicorifugiato.model.Corso;

public interface CorsoDao extends CrudRepository<Corso, Integer>{

	List<Corso> findByCategoria(Categoria categoria);

}
