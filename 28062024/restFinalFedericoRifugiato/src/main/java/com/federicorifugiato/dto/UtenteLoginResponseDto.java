package com.federicorifugiato.dto;

import java.util.Date;

public class UtenteLoginResponseDto {
	private String token;
	private Date ttl;
	private Date tct;
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Date getTtl() {
		return ttl;
	}
	public void setTtl(Date ttl) {
		this.ttl = ttl;
	}
	public Date getTct() {
		return tct;
	}
	public void setTct(Date creation) {
		this.tct = creation;
	}
}
