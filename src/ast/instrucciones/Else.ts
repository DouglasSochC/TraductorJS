import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Else extends Instruccion {

    instrucciones: Array<Instruccion>;
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(instrucciones: Array<Instruccion>, line: Number, column: Number) {
        super(line, column);
        this.instrucciones = instrucciones;
    }

    translate() {
        let cadena = "} else {\n";
        for (const ins of this.instrucciones) {
            cadena += ins.translate();
        }
        return cadena + "}\n";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        
        //----------- LISTA DE INSTRUCCIONES -----------
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.instrucciones.length; x++) {
            let inst = this.instrucciones[x];
            nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\""+inst.getNombreHijo()+"\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            inst.generarGrafo(g,nombreHijo);
        }
        return null;
    }

    getNombreHijo(): String {
        return "ELSE";
    }
}