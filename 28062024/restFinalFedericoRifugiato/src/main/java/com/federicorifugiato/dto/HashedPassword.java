package com.federicorifugiato.dto;

public class HashedPassword {
	private String value;
	
	public HashedPassword(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
