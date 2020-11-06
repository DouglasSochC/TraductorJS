"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Instruccion_1 = require("../Instruccion");
const Tipo_1 = require("../Tipo");
class Declaracion extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param type tipo de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param lista_expresiones lista_expresiones de la expresion asociada a la variable
     */
    constructor(type, lista_expresiones, line, column) {
        super(line, column);
        this.type = type;
        this.lista_expresiones = lista_expresiones;
    }
    translate() {
        // int a = 0; o int a;
        let cadena = "";
        cadena += "var ";
        if (this.lista_expresiones != null) {
            cadena += this.lista_expresiones.translate();
        }
        cadena += ";\n";
        return cadena;
    }
    generarGrafo(g, padre) {
        let padreAux = padre; //Auxiar con nombre del padre
        //Tipo
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + Tipo_1.Type[this.type] + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        //nombreHijo = padre;
        //LISTADO DE EXPRESIONES
        if (this.lista_expresiones != null) {
            //Expresion
            /*nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.lista_expresiones.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;*/
            this.lista_expresiones.generarGrafo(g, padre);
        }
        return null;
    }
    getNombreHijo() {
        return "DECLARACION";
    }
}
exports.Declaracion = Declaracion;
//# sourceMappingURL=Declaracion.js.map