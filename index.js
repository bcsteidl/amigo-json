'use strict'

const $ = require('jquery')

// Define a globalização que o AMIGO vai usar
const Gbl = require('amigo-funcoes').globalize("pt")

module.exports = function(json) {
    var retorno = false;
    if (json) {
        $(this).find("input:text,input:password,input:hidden,input:checkbox,select,textarea,table,figure").each(function() {
            if ($(this).attr("name") && json[$(this).attr("name")] != undefined) {
                if ($(this).is("input") && !$(this).is("input:checkbox")) {
                    var valor = json[$(this).attr("name")];
                    if (valor != "") {
                        switch ($(this).data("tipo")) {
                            case "datahora":
                                valor = Gbl.formatDate(new Date(valor), {
                                    skeleton: "yMd Hms"
                                })
                                break;
                            case "data":
                                valor = Gbl.formatDate(new Date(valor), {
                                    date: "short"
                                })
                                break;
                            case "hora":
                                valor = Gbl.formatDate(new Date(valor), {
                                    time: "medium"
                                })
                                break;
                            case "inteiro":
                                valor = Gbl.formatNumber(Number(valor));
                                break
                            case "decimal":
                                valor = Gbl.formatNumber(Number(valor), {
                                    minimumFractionDigits: Number($(this).data("decimais"))
                                });
                                break
                        }
                    }
                    $(this).val(valor);
                }
                if ($(this).is("input:checkbox")) {
                    if (json[$(this).attr("name")] != false && json[$(this).attr("name")] != "false")
                        $(this).prop('checked', true);
                    else
                        $(this).prop('checked', false);
                }
                if ($(this).is("select")) {
                    if ($(this).data("idmenu") == undefined) {
                        $(this).val(json[$(this).attr("name")].valor);
                    } else {
                        $(this).html("<option value='" + json[$(this).attr("name")].valor + "' selected>" + json[$(this).attr("name")].descricao + "</option>");
                    }
                }
                if ($(this).is("textarea")) {
                    $(this).val(json[$(this).attr("name")]);
                }
                if ($(this).is("table")) {
                    $(this).tipagem("lista", {
                        valores: json[$(this).attr("name")]
                    });
                }
                if ($(this).is("figure")) {
                    $(this).tipagem("imagem", {
                        imagem: "http://localhost:3000/images/" + json[$(this).attr("name")]
                    });
                }
            }
        });
        retorno = $(this);
    } else {
        retorno = {};
        $(this).find("input:text,input:password,input:hidden,input:checkbox,select,textarea,table,figure").each(function() {
            if ($(this).attr("name")) {
                if ($(this).is("input") && !$(this).is("input:checkbox")) {
                    var valor = $(this).val();
                    var valoraux = "";
                    var op = "";
                    if (valor.indexOf("=") == 1) {
                        op = valor.substr(0, 2);
                        valoraux = valor.substr(2);
                    } else if (valor.substr(0, 1) == ">" || valor.substr(0, 1) == "<" || valor.substr(0, 1) == "=") {
                        op = valor.substr(0, 1);
                        valoraux = valor.substr(1)
                    } else {
                        valoraux = valor;
                    }
                    try {
                        switch ($(this).data("tipo")) {
                            case "datahora":
                                var formato = {
                                    skeleton: "yMd Hms"
                                };
                                var valordata = Gbl.parseDate(valoraux, formato).toISOString();
                                valor = valor.replace(valoraux, valordata);
                                break;
                            case "data":
                                var formato = {
                                    date: "short"
                                };
                                var valordata = Gbl.parseDate(valoraux, formato).toISOString();
                                valor = valor.replace(valoraux, valordata);
                                break;
                            case "hora":
                                var formato = {
                                    time: "medium"
                                };
                                var valordata = Gbl.parseDate(valoraux, formato).toISOString();
                                valor = valor.replace(valoraux, valordata);
                                break;
                            case "inteiro":
                                if (valoraux.length > 0)
                                    valor = valor.replace(valoraux, Gbl.parseNumber(valoraux));
                                break
                            case "decimal":
                                if (valoraux.length > 0)
                                    valor = valor.replace(valoraux, Gbl.parseNumber(valoraux, {
                                        minimumFractionDigits: Number($(this).data("decimais"))
                                    }));
                                break
                        }
                    } catch (e) {
                        valor = $(this).val();
                    }
                    retorno[$(this).attr("name")] = valor;
                }
                if ($(this).is("input:checkbox")) {
                    retorno[$(this).attr("name")] = $(this).is(":checked");
                }
                if ($(this).is("select")) {
                    var reg = {
                        valor: $(this).val(),
                        descricao: $(this).find('option:selected').text()
                    };
                    retorno[$(this).attr("name")] = reg;
                }
                if ($(this).is("textarea")) {
                    retorno[$(this).attr("name")] = $(this).val();
                }
                if ($(this).is("table")) {
                    var registros = [];
                    $(this).children("tbody").find("tr").each(function(index) {
                        var reg = {};
                        $(this).find("td").each(function(index) {
                            if ($(this).html() != "") {
                                if ($(this).children(":first-child").is("input:checkbox")) {
                                    reg[$(this).attr("name")] = $(this).children("input:checkbox").is(":checked");
                                } else {
                                    reg[$(this).attr("name")] = $(this).html();
                                }
                            }
                        });
                        registros.push(reg);
                    });
                    retorno[$(this).attr("name")] = registros;
                }
                if ($(this).is("figure")) {
                    var url = $(this).find("img").attr("src")
                    var nome = (url ? url.split("/")[url.split("/").length - 1] : "")
                    retorno[$(this).attr("name")] = nome;
                }
            }
        });
    }
    return retorno;
}
