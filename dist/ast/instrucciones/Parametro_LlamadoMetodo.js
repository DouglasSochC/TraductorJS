"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parametro_LlamadoMetodo = void 0;
const Instruccion_1 = require("../Instruccion");
class Parametro_LlamadoMetodo extends Instruccion_1.Instruccion {
    /**
     *  a = 5;
     * @class La instruccion asignacion, modifica el valor de una variable en la tabla de simbolos
     * @param id identificador de la variable que se va a modificar
     * @param linea linea donde se esata asignando el nuevo valor a la variable
     * @param columna columna donde se esata asignando el nuevo valor a la variable
     * @param valor nuevo valor que se le asignara a la variable
     */
    constructor(expresion, parametros, linea, columna) {
        super(linea, columna); //Nos permite almacenar la linea y la columna a la clase Instruccion.ts
        this.expresion = expresion;
        this.parametros = parametros;
    }
    translate() {
        let cadena = this.expresion.translate();
        if (this.parametros != null) {
            cadena += ", " + this.parametros.translate().toString();
        }
        return cadena;
    }
    generarGrafo(g, padre) {
        //Tipo
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.expresion.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.expresion.generarGrafo(g, nombreHijo);
        if (this.parametros != null) {
            //Identificador
            //PRUEBA
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.parametros.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.parametros.generarGrafo(g, nombreHijo);
        }
        /*for (let x = 0; x < this.parametros.length; x++) {
            let inst = this.parametros[x];
            nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\""+inst.getNombreHijo()+"\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            inst.generarGrafo(g,nombreHijo);
        }*/
        return null;
    }
    getNombreHijo() {
        return "COMA";
    }
}
exports.Parametro_LlamadoMetodo = Parametro_LlamadoMetodo;
//# sourceMappingURL=Parametro_LlamadoMetodo.js.map