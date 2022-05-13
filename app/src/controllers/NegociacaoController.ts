import { Negociacao } from "../models/Negociacao.js";
import { Negociacoes } from "../models/Negociacoes.js";
import { MensagemView } from "../views/MensagemView-.js";
import { NegociacoesView } from "../views/NegociacoesView.js";
import { DiasDaSemana } from "../enums/DiasDaSemana.js";
import { logarTempoExecucao } from "../decorators/logarTempoExecucao.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView', true);
  private mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this.inputData = <HTMLInputElement>document.querySelector("#data");
    this.inputQuantidade = document.querySelector("#quantidade") as HTMLInputElement; //Opção alternativa e recomendada!
    this.inputValor = <HTMLInputElement>document.querySelector("#valor");
    this.negociacoesView.update(this.negociacoes);
  }

  @logarTempoExecucao()
  public adiciona(): void {
    const negociacao = Negociacao.criaNegociacaoDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    if (!this.verificaDiaUtil(negociacao.data)) {
      this.mensagemView.update('Apenas negociações em dias úteis são permitidas.');
      return;
    }
    this.negociacoes.adiciona(negociacao);
    this.limparFormulario();
    this.atualizaView();
  }

  private verificaDiaUtil(data: Date): boolean {
    return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
  }

  // private criaNegociacao(): Negociacao {
  //   const regex = /-/g;
  //   const date = new Date(this.inputData.value.replace(regex, ','));
  //   const quantidade = parseInt(this.inputQuantidade.value);
  //   const valor = parseFloat(this.inputValor.value);
  //   return new Negociacao(date, quantidade, valor);
  // }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update('Negociação adicionada com sucesso!');
  }
}