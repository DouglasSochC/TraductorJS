"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Instruccion_1 = require("../Instruccion");
class Primitivo extends Instruccion_1.Instruccion {
    /**
     * @class La clase Primitivo almacena el valor real (numero|cadena|booleano)
     * @param line linea del primitivo
     * @param column columna del primitivo
     * @param valor valor real
     */
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    translate() {
        return this.valor;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        if (this.valor.toString().substring(0, 1) == '"') {
            g.grafo += "  " + nombreHijo + "[label=" + this.valor.toString() + "];\n";
        }
        else {
            g.grafo += "  " + nombreHijo + "[label=\"" + this.valor.toString() + "\"];\n";
        }
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "PRIMITIVO";
    }
}
exports.Primitivo = Primitivo;
//# sourceMappingURL=Primitivo.js.map