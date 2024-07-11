import { Corso } from "./Corso";
import { Ruolo } from "./Ruolo";

export class Utente {
    private _id: number;
    private _nome: string;
    private _cognome: string;
    private _email: string;
    private _password: string;
    private _corsi: Corso[];
    private _ruoli: Ruolo[];

    constructor(id: number, nome: string, cognome: string, email: string, password: string, corsi: Corso[], ruoli: Ruolo[]) {
        this._id = id;
        this._nome = nome;
        this._cognome = cognome;
        this._email = email;
        this._password = password;
        this._corsi = corsi;
        this._ruoli = ruoli;
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(nome: string) {
        this._nome = nome;
    }

    public get cognome(): string {
        return this._cognome;
    }

    public set cognome(cognome: string) {
        this._cognome = cognome;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }

    public get corsi(): Corso[] {
        return this._corsi;
    }

    public set corsi(corsi: Corso[]) {
        this._corsi = corsi;
    }

    public get ruoli(): Ruolo[] {
        return this._ruoli;
    }

    public set ruoli(ruoli: Ruolo[]) {
        this._ruoli = ruoli;
    }
}
