import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class DoWhile extends Instruccion {
    
    condicion:Instruccion;
    bloque_sentencias: Array<Instruccion>;
    /**
     * @class La instruccion DoWhile realiza una iteracion y luego
     * verifica su condicion
     * @param linea linea de la instruccion while
     * @param columna columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param bloque_sentencias lista de sentencias o instrucciones dentro del DoWhile
     */
    constructor(condicion:Instruccion, bloque_sentencias: Array<Instruccion>, linea:Number, columna:Number){
        super(linea,columna);
        this.condicion = condicion;
        this.bloque_sentencias = bloque_sentencias;
    }

    translate() {
        let cadena = "do {\n";
        for (const ins of this.bloque_sentencias) {
            cadena += ins.translate();
        }
        cadena += "} while ("+this.condicion.translate()+");\n\n"
        return cadena;
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p= padre;
        //Condicion
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"CONDICION\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        padre = nombreHijo;
        
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+this.condicion.getNombreHijo()+"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.condicion.generarGrafo(g,nombreHijo);
        
        
        padre = p;
        
        //----------- LISTA DE INSTRUCCIONES -----------
        nombreHijo = "nodo"+g.contador;
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
        return "DO_WHILE";
    }
}