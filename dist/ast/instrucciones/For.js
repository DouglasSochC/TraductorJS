"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Instruccion_1 = require("../Instruccion");
class For extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion For realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param declaracion declaracion de la variable
     * @param condicion condicion del ciclo
     * @param acumulador acumulador del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(declaracion, condicion, acumulador, instrucciones, line, column) {
        super(line, column);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.acumulador = acumulador;
        this.instrucciones = instrucciones;
    }
    translate() {
        let cadena = "for(" + this.declaracion.translate().split("\n").join(" ") + this.condicion.translate() + "; " + this.acumulador.translate().split("\n").join("") + "){\n";
        for (const ins of this.instrucciones) {
            cadena += ins.translate();
        }
        return cadena + "\n}\n";
    }
    generarGrafo(g, padre) {
        let p = padre;
        //Declaracion        
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.declaracion.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.declaracion.generarGrafo(g, nombreHijo);
        padre = p;
        //Condicion
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"CONDICION\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.condicion.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.condicion.generarGrafo(g, nombreHijo);
        padre = p;
        //Acumulador        
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.acumulador.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.acumulador.generarGrafo(g, nombreHijo);
        padre = p;
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
        //----------------------------------------------
        return null;
    }
    getNombreHijo() {
        return "FOR";
    }
}
exports.For = For;
//# sourceMappingURL=For.js.map