"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerarGrafo = exports.AnalizarJava = void 0;
const Gramatica = require("../Gramatica/gramatica");
const GrafoAST_1 = require("./ast/grafo/GrafoAST");
//Nota: Cuando no funciona alguno de los nodos, hay que tomar en cuenta
//si en realidad la funcion que tratamos de traducir tiene hijos
function AnalizarJava(entrada) {
    // Analisis Lexico y Sintactico
    // Recordar el As utilizado en Visual Basic: hola as Integer
    let ast = Gramatica.parse(entrada);
    //Generacion de grafo
    let nuevoCodigo = ast[0].translate();
    let tockens = "";
    let error = "";
    for (const ins of ast[1]) {
        error += ins + "\n";
    }
    for (const ins of ast[2]) {
        tockens += "Valor Tocken: " + ins + "\n";
    }
    let listado = [nuevoCodigo, error, tockens];
    //console.log("\n\n---------------- TRADUCCION ----------------\n");
    //console.log(nuevoCodigo);
    //console.log("\n--------------------------------------------\n");
    return listado;
}
exports.AnalizarJava = AnalizarJava;
function GenerarGrafo(entrada) {
    let ast = Gramatica.parse(entrada);
    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST_1.GrafoAST(ast[0]);
    let txtDotAST = grafoAST.getGrafo();
    //console.log("\n\n------------------- GRAFO -------------------\n");
    //console.log(txtDotAST);
    //console.log("\n--------------------------------------------\n");
    return txtDotAST.toString();
}
exports.GenerarGrafo = GenerarGrafo;
//# sourceMappingURL=Analisis.js.map