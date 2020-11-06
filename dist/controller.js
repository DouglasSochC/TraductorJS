"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grafo = exports.analisis = void 0;
const Analisis_1 = require("./Analisis");
const Analisis_2 = require("./Analisis");
function analisis(codigo) {
    //let respuesta = codigo;
    let respuesta = Analisis_1.AnalizarJava(codigo);
    //console.log(respuesta);
    //console.log("params: ",req.params)
    //let a = [{'analisis': respuesta}, {'grafo': 'reporteAST'}, {'errores': 'reporteErrores'}]
    //Respuesta que se esta enviando al servidor del cliente...
    return respuesta;
}
exports.analisis = analisis;
function grafo(codigo) {
    //let respuesta = codigo;
    let respuesta = Analisis_2.GenerarGrafo(codigo);
    //console.log(respuesta);
    //console.log("params: ",req.params)
    //let a = [{'analisis': respuesta}, {'grafo': 'reporteAST'}, {'errores': 'reporteErrores'}]
    //Respuesta que se esta enviando al servidor del cliente...
    return respuesta;
}
exports.grafo = grafo;
//# sourceMappingURL=controller.js.map