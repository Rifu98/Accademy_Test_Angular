package com.federicorifugiato.dto;

import java.util.List;
public class UtenteDto {
	
    private int id;
    private String nome;
    private String cognome;
    private String email;
    private String password;
    private List<CorsoDto> corsi;
    private List<UtenteRuoloDto> ruoli;
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCognome() {
		return cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<CorsoDto> getCorsi() {
		return corsi;
	}

	public void setCorsi(List<CorsoDto> corsi) {
		this.corsi = corsi;
	}

	public List<UtenteRuoloDto> getRuoli() {
		return ruoli;
	}

	public void setRuoli(List<UtenteRuoloDto> ruoli) {
		this.ruoli = ruoli;
	}
    
}
