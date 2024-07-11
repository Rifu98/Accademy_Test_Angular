package com.federicorifugiato.service;

import java.util.List;

import com.federicorifugiato.dto.CorsoDto;
import com.federicorifugiato.exception.CategoriaNotFoundException;
import com.federicorifugiato.model.Categoria;

import jakarta.validation.Valid;

public interface CorsoService {

	void registraCorso(@Valid CorsoDto corsoDto) throws CategoriaNotFoundException;
	CorsoDto getCorsoById(int id);
	List<CorsoDto> getCorsi();
	void cancellaCorso(int id);
	boolean existsCorsoById(int id);
	void updateCorso(CorsoDto corso) throws CategoriaNotFoundException;
	List<CorsoDto> getCorsiByCategoria(Categoria categoria);
}
