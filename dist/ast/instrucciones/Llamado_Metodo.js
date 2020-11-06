"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamado_Metodo = void 0;
const Instruccion_1 = require("../Instruccion");
class Llamado_Metodo extends Instruccion_1.Instruccion {
    /**
     *  a = 5;
     * @class La instruccion asignacion, modifica el valor de una variable en la tabla de simbolos
     * @param id identificador de la variable que se va a modificar
     * @param linea linea donde se esata asignando el nuevo valor a la variable
     * @param columna columna donde se esata asignando el nuevo valor a la variable
     * @param valor nuevo valor que se le asignara a la variable
     */
    constructor(identificador, parametros, linea, columna) {
        super(linea, columna); //Nos permite almacenar la linea y la columna a la clase Instruccion.ts
        this.identificador = identificador;
        this.parametros = parametros;
    }
    translate() {
        let cadena = this.identificador.toString() + "(";
        if (this.parametros != null) {
            cadena += this.parametros.translate();
        }
        return cadena + ");\n";
    }
    generarGrafo(g, padre) {
        //Identificador
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.identificador + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        if (this.parametros != null) {
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"PARAMETROS\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.parametros.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        return "LLAMADO_METODO";
    }
}
exports.Llamado_Metodo = Llamado_Metodo;
//# sourceMappingURL=Llamado_Metodo.js.map