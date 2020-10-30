"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdiccionSustraccion = void 0;
const Instruccion_1 = require("../Instruccion");
const Tipo_1 = require("../Tipo");
class AdiccionSustraccion extends Instruccion_1.Instruccion {
    /** n++ o n--
     * @class La expresion OperacionAritmetica, realiza la operacion aritmetica dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param identificador Es el nombre de la variable de tipo incremento o decremento
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion aritmetica
     */
    constructor(tipoOperacion, identificador, operador1, operador2, line, column) {
        super(line, column);
        this.identificador = identificador;
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }
    translate() {
        console.log(this.identificador.translate().toString());
        console.log(this.operador1.translate());
        console.log(this.operador2.translate());
        return this.identificador.translate().toString() + this.operador1.translate() + this.operador2.translate();
    }
    generarGrafo(g, padre) {
        //Operador1
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.operador1.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.operador1.generarGrafo(g, nombreHijo);
        if (this.operador2 != null) {
            //Operador2
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.operador2.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.operador2.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        switch (this.tipoOperacion) {
            case Tipo_1.TypeOperation.INCREMENTO: {
                return "INCREMENTO";
            }
            case Tipo_1.TypeOperation.DECREMENTO: {
                return "DECREMENTO";
            }
        }
    }
}
exports.AdiccionSustraccion = AdiccionSustraccion;
//# sourceMappingURL=AdiccionSustraccion.js.map