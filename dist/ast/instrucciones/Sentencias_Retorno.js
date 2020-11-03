"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sentencias_Retorno = void 0;
const Instruccion_1 = require("../Instruccion");
class Sentencias_Retorno extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion DoWhile realiza una iteracion y luego
     * verifica su condicion
     * @param linea linea de la instruccion while
     * @param columna columna de la instruccion while
     * @param instruccion Reconoce que sentencia de tipo retorno es
     */
    constructor(instruccion, linea, columna) {
        super(linea, columna);
        this.instruccion = instruccion;
    }
    translate() {
        return this.instruccion.toString() + ";\n";
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.instruccion.toString() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        //----------------------------------------------
        return null;
    }
    getNombreHijo() {
        return "MAIN";
    }
}
exports.Sentencias_Retorno = Sentencias_Retorno;
//# sourceMappingURL=Sentencias_Retorno.js.map