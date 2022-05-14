import { Negociacao } from "./Negociacao.js";
import { Comparavel } from "../interfaces/Comparavel.js";

export class Negociacoes implements Comparavel<Negociacoes> {

  private negociacoes: Negociacao[] = [];

  public adiciona(negociacao: Negociacao): void {
    this.negociacoes.push(negociacao);
  }

  public lista(): readonly Negociacao[] {
    return this.negociacoes;
  }

  public eIgual(negociacoes: Negociacoes): boolean {
    return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista);
  }
}