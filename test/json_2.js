'use strict'

const $ = require('jquery')

$.fn.json = require('..')

$("#mostrar").click(function() {
    alert(JSON.stringify($("#formulario").json()))
})

$("#valorPadrao").click(function() {
    let valores = {
        nome: "Zé",
        sobrenome: "DoBoné",
        observacoes: "Joga muita sinuca"
    }

    $("#formulario").json(valores)
})
