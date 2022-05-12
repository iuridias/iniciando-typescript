import { NegociacaoController } from "./controllers/NegociacaoController.js";

const controller = new NegociacaoController();
const form = document.querySelector(".form");

if (form) {
  form.addEventListener('submit', evento => {
    evento.preventDefault();
    controller.adiciona();
  });
} else {
  throw Error('Não foi possível inicializar a aplicação.')
}