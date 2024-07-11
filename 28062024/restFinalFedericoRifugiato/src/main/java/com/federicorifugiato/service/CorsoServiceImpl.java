package com.federicorifugiato.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.federicorifugiato.dao.CategoriaDao;
import com.federicorifugiato.dao.CorsoDao;
import com.federicorifugiato.dto.CorsoDto;
import com.federicorifugiato.exception.CategoriaNotFoundException;
import com.federicorifugiato.model.Categoria;
import com.federicorifugiato.model.Corso;

@Service
public class CorsoServiceImpl implements CorsoService{

	@Autowired
	private CorsoDao corsoDao;
	private CategoriaDao categoriaDao;
	
	private ModelMapper modelMapper = new ModelMapper();

	@Override
	public void registraCorso(CorsoDto corso) throws CategoriaNotFoundException {
		Corso newCorso = new Corso();
		Optional<Categoria> categoria = categoriaDao.findById(corso.getCategoria().getId());
		if (categoria.isEmpty()) {
			throw new CategoriaNotFoundException("Categoria non trovata");
		}
		newCorso.setCategoria(categoria.get());
		newCorso.setDescrizioneBreve(corso.getDescrizioneBreve());
		newCorso.setDescrizioneCompleta(corso.getDescrizioneCompleta());
		newCorso.setDurata(corso.getDurata());
		newCorso.setNomeCorso(corso.getNomeCorso());
		
		corsoDao.save(newCorso);
		
	}

	@Override
	public CorsoDto getCorsoById(int id) {
		Optional<Corso> corsoOptional = corsoDao.findById(id);
		if (corsoOptional.isEmpty()) {
			return null;
		}
		
		return modelMapper.map(corsoOptional.get(), CorsoDto.class);
	}

	@Override
	public List<CorsoDto> getCorsi() {
	
		List<Corso> corsi = (List<Corso>) corsoDao.findAll();
		List<CorsoDto> corsiDto = new ArrayList<>();
		
		corsi.forEach(c -> corsiDto.add(modelMapper.map(c, CorsoDto.class)));
		
		return corsiDto;
	}

	@Override
	public void cancellaCorso(int id) {
		
		Optional<Corso> corsoOptiion = corsoDao.findById(id);
		
		corsoDao.delete(corsoOptiion.get());
		
	}

	@Override
	public boolean existsCorsoById(int id) {
		
		return corsoDao.existsById(id);
	}

	@Override
	public void updateCorso(CorsoDto corso) throws CategoriaNotFoundException {
		
		Optional<Corso> optionalCorso = corsoDao.findById(corso.getId());
		
		if(optionalCorso.isPresent()) {
			Corso newCorso = optionalCorso.get();
			Optional<Categoria> categoria = categoriaDao.findById(corso.getCategoria().getId());
			if (categoria.isEmpty()) {
				throw new CategoriaNotFoundException("Categoria non trovata");
			}
			newCorso.setCategoria(categoria.get());
			newCorso.setDescrizioneBreve(corso.getDescrizioneBreve());
			newCorso.setDescrizioneCompleta(corso.getDescrizioneCompleta());
			newCorso.setDurata(corso.getDurata());
			newCorso.setNomeCorso(corso.getNomeCorso());
			
			corsoDao.save(newCorso);
			
		}
		
	}

	@Override
	public List<CorsoDto> getCorsiByCategoria(Categoria categoria) {
		List<Corso> corsi = corsoDao.findByCategoria(categoria);
		List<CorsoDto> corsiDto = new ArrayList<>();
		
		corsi.forEach(c -> corsiDto.add(modelMapper.map(c, CorsoDto.class)));
		return corsiDto;
	}

}
