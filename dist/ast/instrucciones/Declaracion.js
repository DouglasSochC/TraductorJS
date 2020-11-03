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
     * @param valor valor de la expresion asociada a la variable
     */
    constructor(type, id, valor, line, column) {
        super(line, column);
        this.id = id;
        this.type = type;
        this.valor = valor;
    }
    translate() {
        // int a = 0;
        return "var " + this.id + " = " + this.valor.translate() + ";\n";
    }
    generarGrafo(g, padre) {
        let padreAux = padre; //Auxiar con nombre del padre
        //Tipo
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + Tipo_1.Type[this.type] + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        // Titulo Id
        nombreHijo = "nodo" + g.contador;
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
        return "DECLARACION";
    }
}
exports.Declaracion = Declaracion;
//# sourceMappingURL=Declaracion.js.map