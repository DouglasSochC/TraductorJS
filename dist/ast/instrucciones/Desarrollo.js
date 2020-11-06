"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Desarrollo = void 0;
const Instruccion_1 = require("../Instruccion");
class Desarrollo extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param identificador identificador de la expresion asociada a la variable
     * @param expresion identificador de la expresion asociada a la variable
     * @param desarrollo identificador de la expresion asociada a la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     */
    constructor(identificador, expresion, desarrollo, line, column) {
        super(line, column);
        this.identificador = identificador;
        this.expresion = expresion;
        this.desarrollo = desarrollo;
    }
    translate() {
        let cadena = this.identificador.toString();
        if (this.expresion != null) {
            cadena += " = " + this.expresion.translate();
        }
        if (this.desarrollo != null) {
            cadena += ", " + this.desarrollo.translate();
        }
        return cadena;
    }
    generarGrafo(g, padre) {
        let padreAux = padre; //Auxiar con nombre del padre
        // Id
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        let padreHijo = nombreHijo;
        //Identificador
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.identificador + "\"];\n";
        g.grafo += "  " + padreHijo + " -> " + nombreHijo + ";\n";
        g.contador++;
        if (this.expresion != null) {
            //Expresion
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.expresion.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.expresion.generarGrafo(g, nombreHijo);
        }
        if (this.desarrollo != null) {
            //Expresion
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.desarrollo.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.desarrollo.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        return "DECLARACION";
    }
}
exports.Desarrollo = Desarrollo;
//# sourceMappingURL=Desarrollo.js.map