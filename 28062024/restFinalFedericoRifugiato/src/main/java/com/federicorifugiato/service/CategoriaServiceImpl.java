package com.federicorifugiato.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.federicorifugiato.dao.CategoriaDao;
import com.federicorifugiato.dto.CategoriaDto;
import com.federicorifugiato.exception.UnauthorizedException;
import com.federicorifugiato.model.Categoria;

import javassist.tools.rmi.ObjectNotFoundException;

@Service
public class CategoriaServiceImpl implements CategoriaService {

  @Autowired
  private CategoriaDao categoriaDao;
  
  ModelMapper modelMapper = new ModelMapper();
  
  @Override
  public List<CategoriaDto> trovaCategorie() {
    List<Categoria> categorie = (List<Categoria>) categoriaDao.findAll();
    List<CategoriaDto> categorieDto = new ArrayList<>();
	
	categorie.forEach(c -> categorieDto.add(modelMapper.map(c, CategoriaDto.class)));
    
    return categorieDto;
  }

  @Override
  public void delete(int id) throws UnauthorizedException, ObjectNotFoundException {
    Optional<Categoria> categoriaOptional = categoriaDao.findById(id);
    
    if (categoriaOptional.isPresent()) {
      Categoria categoria = categoriaOptional.get();
      if (categoria.getCorsi().isEmpty()) {
        categoriaDao.delete(categoria);
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new ObjectNotFoundException(null);
    }
    
    
  }
  
  @Override
  public void save(Categoria category) {
   categoriaDao.save(category);
  }
  
  @Override
  public Optional<Categoria> getById(int id) {
   return categoriaDao.findById(id);
  }

	@Override
	public Categoria getCategoriaByName(String name) {
		   return categoriaDao.findByNomeCategoria(name);
	}

	@Override
	public CategoriaDto getCategoriaById(int id) {
		   Optional<Categoria> categoria = categoriaDao.findById(id);
		   if (categoria.isEmpty()) {
			   return null;
		   }
		   return modelMapper.map(categoria.get(), CategoriaDto.class);
	}

	@Override
	public void registraCategoria(CategoriaDto categoriaDto) {
		Categoria categoria = new Categoria();
		categoria.setId(categoriaDto.getId());
		categoria.setNomeCategoria(categoriaDto.getNomeCategoria());
		categoriaDao.save(categoria);
		
	}
}
