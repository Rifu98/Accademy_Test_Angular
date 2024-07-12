import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getLocalToken(): string {
    const token = localStorage.getItem('access_token');

    if (!token) {
      throw new Error('Token non trovato in localStorage');
    }

    return token;
  }

  setLocalToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  deleteLocalToken() {
    localStorage.removeItem('access_token');
  }

  setProperty(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getProperty(key: string): string {
    const value = localStorage.getItem(key);

    if (!value) {
      throw new Error('Propietà non trovata in localStorage');
    }

    return value;
  }

  deleteProperty(key: string) {
    localStorage.removeItem(key);
  }
}
