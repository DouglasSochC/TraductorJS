import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class FMain extends Instruccion {
    
    bloque_sentencias: Array<Instruccion>;
    /**
     * @class La instruccion DoWhile realiza una iteracion y luego
     * verifica su condicion
     * @param linea linea de la instruccion while
     * @param columna columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param bloque_sentencias lista de sentencias o instrucciones dentro del DoWhile
     */
    constructor(bloque_sentencias: Array<Instruccion>, linea:Number, columna:Number){
        super(linea,columna);
        this.bloque_sentencias = bloque_sentencias;
    }

    translate() {
        let cadena = "function main() {\n"
        for (const ins of this.bloque_sentencias) {
            cadena += ins.translate();
        }
        return cadena+"}\n\n";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p= padre;
        
        //----------- LISTA DE INSTRUCCIONES -----------
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.bloque_sentencias.length; x++) {
            let inst = this.bloque_sentencias[x];
            nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\""+inst.getNombreHijo()+"\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            inst.generarGrafo(g,nombreHijo);
        }
        //----------------------------------------------
        return null;
    }
    
    getNombreHijo(): String {
        return "MAIN";
    }
}