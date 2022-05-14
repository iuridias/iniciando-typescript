import { NegociacaoController } from "./controllers/NegociacaoController.js";
const controller = new NegociacaoController();
const form = document.querySelector(".form");
const botaoImportar = document.querySelector('#botao-importar');
if (form) {
    form.addEventListener('submit', evento => {
        evento.preventDefault();
        controller.adiciona();
    });
}
else {
    throw Error('Não foi possível inicializar a aplicação.');
}
if (botaoImportar) {
    botaoImportar.addEventListener('click', evento => {
        evento.preventDefault();
        controller.importarDados();
    });
}
else {
    throw Error('Botão Importar não foi encontrado.');
}
//# sourceMappingURL=app.js.map