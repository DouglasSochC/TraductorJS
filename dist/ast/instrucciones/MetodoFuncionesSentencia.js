"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetodoFuncionSentencia = void 0;
const Instruccion_1 = require("../Instruccion");
class MetodoFuncionSentencia extends Instruccion_1.Instruccion {
    /**
     *  a = 5;
     * @class La instruccion asignacion, modifica el valor de una variable en la tabla de simbolos
     * @param id identificador de la variable que se va a modificar
     * @param linea linea donde se esata asignando el nuevo valor a la variable
     * @param columna columna donde se esata asignando el nuevo valor a la variable
     * @param valor nuevo valor que se le asignara a la variable
     */
    constructor(nombre_clase, instrucciones, linea, columna) {
        super(linea, columna); //Nos permite almacenar la linea y la columna a la clase Instruccion.ts
        this.nombre_clase = nombre_clase;
        this.instrucciones = instrucciones;
    }
    translate() {
        let cadena = "class " + this.nombre_clase.toString() + "{\n constructor(){\n }\n";
        for (const ins of this.instrucciones) {
            cadena += ins.translate();
        }
        return cadena + "\n}\n";
    }
    generarGrafo(g, padre) {
        //Identificador
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.nombre_clase + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        //----------- LISTA DE INSTRUCCIONES -----------
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.instrucciones.length; x++) {
            let inst = this.instrucciones[x];
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + inst.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            inst.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        return "CLASE";
    }
}
exports.MetodoFuncionSentencia = MetodoFuncionSentencia;
//# sourceMappingURL=MetodoFuncionesSentencia.js.map