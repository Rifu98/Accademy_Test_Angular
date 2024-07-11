package com.federicorifugiato.dto;

import com.federicorifugiato.enums.TipoRuolo;

public class UtenteRuoloDto {
    private int id;
    private TipoRuolo tipologia;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public TipoRuolo getTipologia() {
		return tipologia;
	}

	public void setTipologia(TipoRuolo tipologia) {
		this.tipologia = tipologia;
	}
    
}

