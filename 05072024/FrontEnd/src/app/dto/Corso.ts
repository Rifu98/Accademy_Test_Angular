import { Categoria } from './Categoria';


export class Corso {
  private _id: number;
  private _nomeCorso: string;
  private _descrizioneBreve: string;
  private _descrizioneCompleta: string;
  private _durata: number;
  private _categoria: Categoria;
  private _imgUrl: string;

  constructor(
    id: number,
    nomeCorso: string,
    descrizioneBreve: string,
    descrizioneCompleta: string,
    durata: number,
    categoria: Categoria,
    imgUrl: string,
  ) {
    this._id = id;
    this._nomeCorso = nomeCorso;
    this._descrizioneBreve = descrizioneBreve;
    this._descrizioneCompleta = descrizioneCompleta;
    this._durata = durata;
    this._categoria = categoria;
    this._imgUrl = imgUrl;
  }

  public get id(): number {
    return this._id;
  }

  public get nomeCorso(): string {
    return this._nomeCorso;
  }

  public get descrizioneBreve(): string {
    return this._descrizioneBreve;
  }

  public get descrizioneCompleta(): string {
    return this._descrizioneCompleta;
  }

  public get durata(): number {
    return this._durata;
  }

  public get categoria(): Categoria {
    return this._categoria;
  }

  public get imgUrl(): string {
    return this._imgUrl;
  }


  public set id(id: number) {
    this._id = id;
  }

  public set nomeCorso(nomeCorso: string) {
    this._nomeCorso = nomeCorso;
  }

  public set descrizioneBreve(descrizioneBreve: string) {
    this._descrizioneBreve = descrizioneBreve;
  }

  public set descrizioneCompleta(descrizioneCompleta: string) {
    this._descrizioneCompleta = descrizioneCompleta;
  }

  public set durata(durata: number) {
    this._durata = durata;
  }

  public set categoria(categoria: Categoria) {
    this._categoria = categoria;
  }

  public set imgUrl(imgUrl: string) {
    this._imgUrl = imgUrl;
  }
}
