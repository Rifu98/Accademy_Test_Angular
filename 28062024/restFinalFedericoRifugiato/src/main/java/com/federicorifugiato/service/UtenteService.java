package com.federicorifugiato.service;

import java.util.List;

import com.federicorifugiato.dto.UtenteDto;
import com.federicorifugiato.dto.UtenteLoginDto;
import com.federicorifugiato.dto.UtenteUpdateDto;
import com.federicorifugiato.model.Utente;

import jakarta.validation.Valid;

public interface UtenteService {

	void registraUtente(Utente utente);
	List<UtenteDto> getUtenti();
	public boolean existsUtenteByMail (String mail);
	Utente getUtenteByEmail(String email);
	Utente loginUtente(UtenteLoginDto utenteDto);
	void updateUtente(@Valid UtenteUpdateDto user);
	UtenteDto getUtenteDtoByEmail(String email);
	void cancellaUtenteByEmail(String email);
	boolean verifyPassword(String email, String hashedPassword);
}
