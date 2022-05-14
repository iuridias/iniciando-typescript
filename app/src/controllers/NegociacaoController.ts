import { Negociacao } from "../models/Negociacao.js";
import { Negociacoes } from "../models/Negociacoes.js";
import { MensagemView } from "../views/MensagemView-.js";
import { NegociacoesView } from "../views/NegociacoesView.js";
import { DiasDaSemana } from "../enums/DiasDaSemana.js";
import { logarTempoExecucao } from "../decorators/logarTempoExecucao.js";
import { inspecionar } from "../decorators/inspecionar.js";
import { domInjector } from "../decorators/domInjector.js";
import { NegociacoesService } from "../services/NegociacoesService.js";

export class NegociacaoController {
  @domInjector('#data')
  private inputData: HTMLInputElement;
  @domInjector('#quantidade')
  private inputQuantidade: HTMLInputElement;
  @domInjector('#valor')
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView('#negociacoesView');
  private mensagemView = new MensagemView('#mensagemView');
  private negociacoesService = new NegociacoesService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @logarTempoExecucao()
  @inspecionar
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

  public importarDados(): void {
    this.negociacoesService.
      obterNegociacoes()
      .then(negociacoesdeHoje => {
        return negociacoesdeHoje.filter(negociacaoDeHoje => {
          return !this.negociacoes
              .lista()
              .some(negocociacao => negociacaoDeHoje
                    .eIgual(negociacaoDeHoje))
        })
      })
      .then(negociacoesDeHoje => {
        for (let negociacao of negociacoesDeHoje) {
          this.negociacoes.adiciona(negociacao)
        }
        this.negociacoesView.update(this.negociacoes);
      })
  }
}