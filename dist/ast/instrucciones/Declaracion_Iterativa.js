"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion_Iterativa = void 0;
const Instruccion_1 = require("../Instruccion");
class Declaracion_Iterativa extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param type tipo de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param valor valor de la expresion asociada a la variable
     */
    constructor(id, valor, line, column) {
        super(line, column);
        this.id = id;
        this.valor = valor;
    }
    translate() {
        return this.valor.translate();
    }
    generarGrafo(g, padre) {
        let padreAux = padre; //Auxiar con nombre del padre
        // Titulo "Id"
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        let padreHijo = nombreHijo;
        // Valor del Id
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label= \"" + this.id + "\"];\n";
        g.grafo += "  " + padreHijo + " -> " + nombreHijo + ";\n";
        g.contador++;
        if (this.valor != null) {
            //Expresion
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.valor.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.valor.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        return "LISTA_DECLARACIONES";
    }
}
exports.Declaracion_Iterativa = Declaracion_Iterativa;
//# sourceMappingURL=Declaracion_Iterativa.js.map