export class UtenteSignup {
  nome: string;
  cognome: string;
  email: string;
  password: string;

  constructor(nome: string, cognome: string, email: string, password: string) {
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.password = password;
  }
}
