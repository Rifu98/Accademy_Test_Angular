package com.federicorifugiato.service;

import java.util.List;
import java.util.Optional;

import com.federicorifugiato.dto.CategoriaDto;
import com.federicorifugiato.exception.UnauthorizedException;
import com.federicorifugiato.model.Categoria;

import javassist.tools.rmi.ObjectNotFoundException;

public interface CategoriaService {

	List<CategoriaDto> trovaCategorie();
	void delete(int id) throws UnauthorizedException, ObjectNotFoundException, UnauthorizedException;
	void save(Categoria category);
	Optional<Categoria> getById(int id);
	Categoria getCategoriaByName(String name);
	CategoriaDto getCategoriaById(int id);
	void registraCategoria (CategoriaDto categoriaDto);
}
