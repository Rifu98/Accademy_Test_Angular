import { TipoRuolo } from '../enum/TipoRuolo';

export class Ruolo {
  private _id: number;
  private _tipologia: TipoRuolo;

  constructor(id: number, tipologia: TipoRuolo) {
    this._id = id;
    this._tipologia = tipologia;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get tipologia(): TipoRuolo {
    return this._tipologia;
  }

  public set tipologia(tipologia: TipoRuolo) {
    this._tipologia = tipologia;
  }
}
