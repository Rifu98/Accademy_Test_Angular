import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Corso } from '../dto/Corso';

@Injectable({
  providedIn: 'root'
})
export class CorsiService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api/";
  getCorsi(): Observable<Corso[]> {
    return this.http.get<Corso[]>(this.url + "corsi/all");
  }
  getCorso(id:number): Observable<Corso> {
    return this.http.get<Corso>(this.url + "corsi?id=" + id);
  }
}
