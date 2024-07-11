import { Corso } from "./Corso";
import { Ruolo } from "./Ruolo";

export class UtenteUpdate {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  corsi: Corso[];
  ruoli: Ruolo[];

  constructor(nome: string, cognome: string, email: string, password: string, corsi: Corso[], ruoli: Ruolo[]) {

    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.password = password;
    this.corsi = corsi;
    this.ruoli = ruoli;
  }
}
