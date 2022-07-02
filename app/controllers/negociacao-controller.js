"use strict";
exports.__esModule = true;
exports.NegociacaoController = void 0;
var negociacao_js_1 = require("../models/negociacao.js");
var negociacoes_js_1 = require("../models/negociacoes.js");
var mensagem_view_js_1 = require("./../views/mensagem-view.js");
var negociacoes_view_js_1 = require("../views/negociacoes-view.js");
var dias_da_semana_js_1 = require("../enums/dias-da-semana.js");
var NegociacaoController = /** @class */ (function () {
    function NegociacaoController() {
        this.negociacoes = new negociacoes_js_1.Negociacoes();
        this.NegociacoesView = new negociacoes_view_js_1.NegociacoesView('#negociacoesView');
        this.MensagemView = new mensagem_view_js_1.MensagemView('#mensagemView');
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.NegociacoesView.update(this.negociacoes);
    }
    NegociacaoController.prototype.adiciona = function () {
        var negociacao = negociacao_js_1.Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this.MensagemView
                .update('Apenas negociações em dias úteis são aceitas');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
    };
    NegociacaoController.prototype.ehDiaUtil = function (data) {
        return data.getDay() > dias_da_semana_js_1.DiasDaSemana.DOMINGO
            && data.getDay() < dias_da_semana_js_1.DiasDaSemana.SABADO;
    };
    NegociacaoController.prototype.limparFormulario = function () {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    };
    NegociacaoController.prototype.atualizaView = function () {
        this.NegociacoesView.update(this.negociacoes);
        this.MensagemView.update('Negociação adicionada com sucesso');
    };
    return NegociacaoController;
}());
exports.NegociacaoController = NegociacaoController;
