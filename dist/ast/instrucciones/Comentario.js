"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comentario = void 0;
const Instruccion_1 = require("../Instruccion");
class Comentario extends Instruccion_1.Instruccion {
    /**
     *  a = 5;
     * @class La instruccion asignacion, modifica el valor de una variable en la tabla de simbolos
     * @param id identificador de la variable que se va a modificar
     * @param linea linea donde se esata asignando el nuevo valor a la variable
     * @param columna columna donde se esata asignando el nuevo valor a la variable
     * @param valor nuevo valor que se le asignara a la variable
     */
    constructor(comentario, linea, columna) {
        super(linea, columna); //Nos permite almacenar la linea y la columna a la clase Instruccion.ts
        this.comentario = comentario;
    }
    translate() {
        return this.comentario.toString() + "\n";
    }
    generarGrafo(g, padre) {
        return null;
    }
    getNombreHijo() {
        return "COMENTARIO";
    }
}
exports.Comentario = Comentario;
//# sourceMappingURL=Comentario.js.map