"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Instruccion_1 = require("../Instruccion");
class Asignacion extends Instruccion_1.Instruccion {
    /**
     *  a = 5;
     * @class La instruccion asignacion, modifica el valor de una variable en la tabla de simbolos
     * @param id identificador de la variable que se va a modificar
     * @param linea linea donde se esta asignando el nuevo valor a la variable
     * @param columna columna donde se esata asignando el nuevo valor a la variable
     * @param valor nuevo valor que se le asignara a la variable
     */
    constructor(id, valor, linea, columna) {
        super(linea, columna); //Nos permite almacenar la linea y la columna a la clase Instruccion.ts
        this.id = id;
        this.valor = valor;
    }
    translate() {
        let cadena = "";
        if (this.id != null) {
            cadena += this.id.toString();
        }
        if (this.valor != null) {
            cadena += " = " + this.valor.translate() + ";\n";
        }
        return cadena;
    }
    generarGrafo(g, padre) {
        //Identificador
        if (this.id != null) {
            let nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
        }
        if (this.valor != null) {
            let nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.valor.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.valor.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        return "ASIGNACION";
    }
}
exports.Asignacion = Asignacion;
//# sourceMappingURL=Asignacion.js.map