"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If_Iterativo = void 0;
const Instruccion_1 = require("../Instruccion");
class If_Iterativo extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(condicion, instrucciones_if, instrucciones_else, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.instrucciones_if = instrucciones_if;
        this.instrucciones_else = instrucciones_else;
    }
    translate() {
        let cadena = "if (" + this.condicion.translate() + "){\n";
        for (const ins of this.instrucciones_if) {
            cadena += ins.translate();
        }
        cadena += "} else " + this.instrucciones_else.translate();
        return cadena;
    }
    generarGrafo(g, padre) {
        let p = padre;
        //Condicion
        let nombreHijo = "nodo" + g.contador;
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
        //----------- LISTA DE INSTRUCCIONES PARA EL IF -----------
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.instrucciones_if.length; x++) {
            let inst = this.instrucciones_if[x];
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + inst.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            inst.generarGrafo(g, nombreHijo);
        }
        padre = p;
        //Else:
        /*nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"ELSE_IF2\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        padre = nombreHijo;
        
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        padre = nombreHijo;
        */
        //----------- LISTA DE INSTRUCCIONES PARA EL ELSE -----------
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.instrucciones_else.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.instrucciones_else.generarGrafo(g, nombreHijo);
        return null;
    }
    getNombreHijo() {
        return "IF_ITERATIVO";
    }
}
exports.If_Iterativo = If_Iterativo;
//# sourceMappingURL=If_Iterativo.js.map