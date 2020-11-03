"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const Instruccion_1 = require("../Instruccion");
class Main extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion DoWhile realiza una iteracion y luego
     * verifica su condicion
     * @param linea linea de la instruccion while
     * @param columna columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param bloque_sentencias lista de sentencias o instrucciones dentro del DoWhile
     */
    constructor(bloque_sentencias, linea, columna) {
        super(linea, columna);
        this.bloque_sentencias = bloque_sentencias;
    }
    translate() {
        let cadena = "function main() {\n}\n";
        return cadena;
    }
    generarGrafo(g, padre) {
        let p = padre;
        //Condicion
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"MAIN\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        //----------- LISTA DE INSTRUCCIONES -----------
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.bloque_sentencias.length; x++) {
            let inst = this.bloque_sentencias[x];
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + inst.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            inst.generarGrafo(g, nombreHijo);
        }
        //----------------------------------------------
        return null;
    }
    getNombreHijo() {
        return "MAIN";
    }
}
exports.Main = Main;
//# sourceMappingURL=Main.js.map