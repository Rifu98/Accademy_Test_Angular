import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../dto/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {


  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api/";

  getCategorie(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url + "categoria");
  }
}
