import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Utente } from '../dto/Utente';
import { UtenteUpdate } from '../dto/UtenteUpdate';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfiloService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  url = "http://localhost:8080/api/";

  getProfilo(email: string): Observable<Utente> | null {
    try {
      const token = this.storageService.getLocalToken()
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + token)
      return this.http.get<Utente>(this.url + "utenti/" + email, { headers });
    } catch (error) {
      return null;
    }
  }
  updateProfilo(utente: UtenteUpdate) {
    try {
      const token = this.storageService.getLocalToken()
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + token)
      headers = headers.set('Content-Type', 'application/json')
      return this.http.put(this.url + "utenti/update", JSON.stringify(utente), { headers }).pipe(
        catchError(this.handleError)
      );
    } catch (error) {
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
