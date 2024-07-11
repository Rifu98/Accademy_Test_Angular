package com.federicorifugiato.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.federicorifugiato.dto.CategoriaDto;
import com.federicorifugiato.dto.CorsoDto;
import com.federicorifugiato.exception.UnauthorizedException;
import com.federicorifugiato.model.Categoria;
import com.federicorifugiato.service.CategoriaServiceImpl;
import com.federicorifugiato.service.CorsoServiceImpl;

import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import javassist.tools.rmi.ObjectNotFoundException;

@Path("/categoria")
public class CategoriaController {
	  
	  @Autowired
	  private CategoriaServiceImpl categoriaService;
	  
	  @Autowired
	  private CorsoServiceImpl corsoService;
	  
	  @GET
	  @Path("/")
	  @Produces(MediaType.APPLICATION_JSON)
	  public Response getAllCategory() {
	    
	    try {

	      List<CategoriaDto> list = categoriaService.trovaCategorie();
	      
	      return Response.status(Response.Status.OK).entity(list).build();
	      
	    } catch(Exception e) {
	      return Response.status(Response.Status.BAD_REQUEST).build();
	    }
	    
	  }
	  @GET
	  @Path("/{id}")
	  @Produces(MediaType.APPLICATION_JSON)
	  public Response getCategoryById(@PathParam("id") int id) {
	      CategoriaDto categoria =categoriaService.getCategoriaById(id);
	      if (categoria == null) {
		      return Response.status(Response.Status.BAD_REQUEST).build();
	      }
	      return Response.status(Response.Status.OK).entity(categoria).build();
	    
	  }
	  @DELETE
	  @Path("/{id}")
	  public Response deleteCategory(@PathParam("id") int id) {
	    try {
	      categoriaService.delete(id);
	      return Response.status(Response.Status.OK).build();
	    } catch (ObjectNotFoundException e) {
	      return Response.status(Response.Status.NOT_FOUND).build();
	    } catch(UnauthorizedException e) {
	      return Response.status(Response.Status.FORBIDDEN).build();
	    }
	    
	  }
	  @DELETE
	  @Path("/delete/{id}")
	  public Response deleteCategoryAndCorsi(@PathParam("id") int id) {
	    try {
	    	Optional<Categoria> categoria = categoriaService.getById(id);
	    	if(categoria.isEmpty()) {
	  	      return Response.status(Response.Status.NOT_FOUND).build();
	    	}
	    	categoriaService.delete(id);
	    	List<CorsoDto> corsi = corsoService.getCorsiByCategoria(categoria.get());
	    	corsi.forEach(c -> {
	    		corsoService.cancellaCorso(c.getId());
	    	});
	      return Response.status(Response.Status.OK).build();
	    } catch (ObjectNotFoundException e) {
	      return Response.status(Response.Status.NOT_FOUND).build();
	    } catch(UnauthorizedException e) {
	      return Response.status(Response.Status.FORBIDDEN).build();
	    }
	    
	  }
	  
	  @POST
	  @Path("/")
	  @Produces(MediaType.APPLICATION_JSON)
	  public Response addCategoria(CategoriaDto categoria) {
		  try {
			  categoriaService.registraCategoria(categoria);
			  return Response.status(Response.Status.OK).build();
		  } catch (Exception e) {
			  return Response.status(Response.Status.BAD_REQUEST).build();
		  }
	  }

}
