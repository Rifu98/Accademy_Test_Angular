package com.federicorifugiato.service;

import java.util.List;

import com.federicorifugiato.model.Categoria;
import com.federicorifugiato.model.Corso;

public interface CustomizedCourseRepository {
	 
	 public List<Corso> findByNameAndCategoryId(String name, Categoria category);

	}
