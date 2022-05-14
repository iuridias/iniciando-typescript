import { Comparavel } from "../interfaces/Comparavel.js";

export class Negociacao implements Comparavel<Negociacao>{
  constructor(
    private _data: Date,
    public readonly quantidade: number,
    public readonly valor: number) {
  }

  get data(): Date {
    const data = new Date(this._data.getTime());
    return data;
  }

  get volume(): number {
    return this.valor * this.quantidade;
  }

  public static criaNegociacaoDe(dataString: string, quantidadeString: string, valorString: string): Negociacao {
    const regex = /-/g;
    const date = new Date(dataString.replace(regex, ','));
    const quantidade = parseInt(quantidadeString);
    const valor = parseFloat(valorString);
    return new Negociacao(date, quantidade, valor);
  }

  public eIgual(negociacao: Negociacao): boolean {
    return this.data.getDate() === negociacao.data.getDate()
        && this.data.getMonth() === negociacao.data.getMonth()
        && this.data.getFullYear() === negociacao.data.getFullYear();
  }
}