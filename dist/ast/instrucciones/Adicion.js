"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adicion = void 0;
const Instruccion_1 = require("../Instruccion");
class Adicion extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param type tipo de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param valor valor de la expresion asociada a la variable
     */
    constructor(id, simbolouno, simbolodos, line, column) {
        super(line, column);
        this.id = id;
        this.simbolouno = simbolouno;
        this.simbolodos = simbolodos;
    }
    translate() {
        // int a = 0;
        return this.id.toString() + this.simbolouno.toString() + this.simbolodos.toString();
    }
    generarGrafo(g, padre) {
        // Titulo Id
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        let padreHijo = nombreHijo;
        //Valor del Id
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.grafo += "  " + padreHijo + " -> " + nombreHijo + ";\n";
        g.contador++;
        //Simbolo 1
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Simbolo: " + this.simbolouno.toString() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        //Simbolo 2
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Simbolo: " + this.simbolodos.toString() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "ADICION";
    }
}
exports.Adicion = Adicion;
//# sourceMappingURL=Adicion.js.map