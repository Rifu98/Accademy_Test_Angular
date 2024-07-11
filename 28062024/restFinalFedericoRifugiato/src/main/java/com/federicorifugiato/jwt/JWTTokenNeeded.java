                            package com.federicorifugiato.jwt;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.ws.rs.NameBinding;

@NameBinding
@Retention(RetentionPolicy.RUNTIME) //specifica che l'annotation personalizzada secured deve essere convertita in runtime
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface JWTTokenNeeded {
	
}
