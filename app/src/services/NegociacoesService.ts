import { NegociacaoDoDia } from "../interfaces/NegociacaoDoDia.js";
import { Negociacao } from "../models/Negociacao.js";

export class NegociacoesService {
  public obterNegociacoes(): Promise<Negociacao[]> {
    return fetch('http://localhost:8080/dados')
      .then(res => res.json())
      .then((dados: NegociacaoDoDia[]) => {
        return dados.map(dadosDeHoje => {
          return new Negociacao(new Date(), dadosDeHoje.vezes, dadosDeHoje.montante)
        })
      })
  }
}