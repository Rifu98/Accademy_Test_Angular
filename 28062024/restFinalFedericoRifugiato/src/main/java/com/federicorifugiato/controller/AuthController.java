package com.federicorifugiato.controller;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.federicorifugiato.dto.HashedPassword;
import com.federicorifugiato.dto.UtenteLoginDto;
import com.federicorifugiato.dto.UtenteLoginResponseDto;
import com.federicorifugiato.dto.UtenteRegistrationDto;
import com.federicorifugiato.enums.TipoRuolo;
import com.federicorifugiato.jwt.JWTTokenNeeded;
import com.federicorifugiato.jwt.Secured;
import com.federicorifugiato.model.Ruolo;
import com.federicorifugiato.model.Utente;
import com.federicorifugiato.service.UtenteService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/auth")
public class AuthController {
	
	@Autowired
	private UtenteService utenteService;


    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response registerUtente(@Valid UtenteRegistrationDto utenteDto) {
    	System.out.println(utenteDto);
		try {
			if(utenteService.existsUtenteByMail(utenteDto.getEmail())) {
				return Response.status(Status.CONFLICT).entity("già registrato").build();
			}

	        String hashedPassword = DigestUtils.sha256Hex(utenteDto.getPassword());
	        Utente utente = new Utente ();
	        utente.setCognome(utenteDto.getCognome());
	        utente.setNome(utenteDto.getNome());
	        utente.setPassword(hashedPassword);
	        utente.setEmail(utenteDto.getEmail());
	        List<Ruolo> ruoli = new ArrayList<>();
	        Ruolo ruolo = new Ruolo();
	        ruolo.setId(3);
	        ruolo.setTipologia(TipoRuolo.Utente);
	        ruoli.add(ruolo);
	        utente.setRuoli(ruoli);
	        
	        utenteService.registraUtente(utente);
			return Response.status(Status.OK).build();
		} catch (Exception e) {
			return Response.status(Status.EXPECTATION_FAILED).entity(e.getMessage()).build();
		}
    }

    @POST
    @Path("/verify-password")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response verifyPassword(UtenteLoginDto utenteDto) {
        try {
            String hashedPassword = DigestUtils.sha256Hex(utenteDto.getPassword());
            boolean isPasswordCorrect = utenteService.verifyPassword(utenteDto.getEmail(), hashedPassword);
            
            if (isPasswordCorrect) {
                return Response.status(Status.OK).entity(true).build();
            } else {
                return Response.status(Status.UNAUTHORIZED).entity(false).build();
            }
        } catch (Exception e) {
            return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/hash-password")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response hashPassword(String pass) {
        try {
            String hashedPassword = DigestUtils.sha256Hex(pass);
            return Response.status(Status.OK).entity(new HashedPassword(hashedPassword)).build();
        } catch (Exception e) {
            return Response.status(Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/isLogged")
    @JWTTokenNeeded
    @Secured (role = TipoRuolo.Utente)
    public Response isLogged() {
           return Response.status(Status.OK).build();
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response loginUtente(UtenteLoginDto utenteDto) {
        String hashedPassword = DigestUtils.sha256Hex(utenteDto.getPassword());
        utenteDto.setPassword(hashedPassword);
        Utente utente = utenteService.loginUtente(utenteDto);
        if (utente != null) {
            UtenteLoginResponseDto token = issueToken(utenteDto.getEmail());
            return Response.status(Status.OK).entity(token).build();
        }
        return Response.status(Status.BAD_REQUEST).build();
    }
    
	public UtenteLoginResponseDto issueToken (String email) {
	    
	      byte[] secret = "33trentinientraronoatrentotuttie33trotterellando1234567890".getBytes();
	      Key key = Keys.hmacShaKeyFor(secret);
	      
	      Utente informazioniUtente = utenteService.getUtenteByEmail(email);
	      Map<String, Object> map = new HashMap<>();
	      map.put("nome", informazioniUtente.getNome());
	      map.put("cognome", informazioniUtente.getCognome());
	      map.put("email", email);
	      
	      List <String> ruoli = new ArrayList<>();
	      for(Ruolo ruolo : informazioniUtente.getRuoli()) {
	    	  ruoli.add(ruolo.getTipologia().name());
	      }

	      map.put("ruoli", ruoli);

	      Date creation = new Date();
	      Date end = java.sql.Timestamp.valueOf(LocalDateTime.now().plusMinutes(15L));
	      
	      String tokenJwts = Jwts.builder()
	    		  .setClaims(map)
	    		  .setIssuer("http://localhost:8080")
	    		  .setIssuedAt(creation)
	    		  .setExpiration(end)
	    		  .signWith(key)
	    		  .compact();
	      
	      UtenteLoginResponseDto token = new UtenteLoginResponseDto();
	      
	      token.setToken(tokenJwts);
	      token.setTct(creation);
	      token.setTtl(end);
	      
	      return token;
		
	}

}
