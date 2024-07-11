package com.federicorifugiato.dao;

import org.springframework.data.repository.CrudRepository;

import com.federicorifugiato.model.Categoria;

public interface CategoriaDao  extends CrudRepository<Categoria, Integer>{

	Categoria findByNomeCategoria(String name);

}
