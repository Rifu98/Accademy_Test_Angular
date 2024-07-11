export class Categoria {
  private _id: number;
  private _nomeCategoria: string;

  constructor(id: number, nomeCategoria: string) {
    this._id = id;
    this._nomeCategoria = nomeCategoria;
  }

  public get id(): number {
    return this._id;
  }

  public get nomeCategoria(): string {
    return this._nomeCategoria;
  }

  public set id(id: number) {
    this._id = id;
  }

  public set nomeCategoria(nomeCategoria: string) {
    this._nomeCategoria = nomeCategoria;
  }
}
