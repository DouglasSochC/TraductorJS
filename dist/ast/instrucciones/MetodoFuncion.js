"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetodoFuncion = void 0;
const Instruccion_1 = require("../Instruccion");
class MetodoFuncion extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion metodofuncion, realiza la traduccion a javascript
     * @param nombre_funcion identificar el nombre de la funcion
     * @param linea linea donde se esata asignando el nuevo valor a la variable
     * @param columna columna donde se esata asignando el nuevo valor a la variable
     * @param parametros Son los parametros del metodo o funcion
     */
    constructor(nombre_funcion, parametros, linea, columna) {
        super(linea, columna); //Nos permite almacenar la linea y la columna
        this.nombre_funcion = nombre_funcion;
        this.parametros = parametros;
    }
    translate() {
        let cadena = "function " + this.nombre_funcion.toString() + "(";
        if (this.parametros != null) {
            for (let a = 0; a < this.parametros.length; a++) {
                if (a < this.parametros.length - 1) {
                    cadena += this.parametros[a].translate() + ",";
                }
                else {
                    cadena += this.parametros[a].translate();
                }
            }
        }
        return cadena + "){\n \n}\n";
    }
    generarGrafo(g, padre) {
        //Identificador
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.nombre_funcion + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        if (this.parametros != null) {
            //----------- LISTA DE PARAMETROS -----------
            for (let x = 0; x < this.parametros.length; x++) {
                let inst = this.parametros[x];
                nombreHijo = "nodo" + g.contador;
                g.grafo += "  " + nombreHijo + "[label=\"" + inst.getNombreHijo() + "\"];\n";
                g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;
                inst.generarGrafo(g, nombreHijo);
            }
        }
        return null;
    }
    getNombreHijo() {
        return "METODO_FUNCION";
    }
}
exports.MetodoFuncion = MetodoFuncion;
//# sourceMappingURL=MetodoFuncion.js.map