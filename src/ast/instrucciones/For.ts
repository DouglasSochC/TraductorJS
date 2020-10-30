import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class For extends Instruccion {
    declaracion:Instruccion;
    condicion:Instruccion;
    acumulador:Instruccion;
    instrucciones: Array<Instruccion>;
    /**
     * @class La instruccion For realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param declaracion declaracion de la variable
     * @param condicion condicion del ciclo
     * @param acumulador acumulador del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(declaracion:Instruccion, condicion:Instruccion, acumulador:Instruccion, instrucciones: Array<Instruccion>, line:Number, column:Number){
        super(line,column);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.acumulador = acumulador;
        this.instrucciones = instrucciones;
    }

    translate() {
        let cadena = "para("+this.declaracion.translate().split("\n").join(" ")+this.condicion.translate()+"; "+this.acumulador+"){\n";
        for (const ins of this.instrucciones) {
            cadena += ins.translate();
        }
        return cadena+"\n}\n";
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
        for (let x = 0; x < this.instrucciones.length; x++) {
            let inst = this.instrucciones[x];
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
        return "FOR";
    }
}