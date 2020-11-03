import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Return extends Instruccion {

    instrucciones: Instruccion;
    /**
     *  return [EXP];
     * @class La instruccion asignacion, modifica el valor de una variable en la tabla de simbolos
     * @param id identificador de la variable que se va a modificar
     * @param linea linea donde se esata asignando el nuevo valor a la variable
     * @param columna columna donde se esata asignando el nuevo valor a la variable
     * @param valor nuevo valor que se le asignara a la variable
     */
    constructor(instrucciones: Instruccion, linea:Number, columna:Number){
        super(linea,columna) //Nos permite almacenar la linea y la columna
        this.instrucciones = instrucciones;
    }

    translate() {        
        return "return "+this.instrucciones.translate()+";";
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+ this.instrucciones.getNombreHijo() +"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.instrucciones.generarGrafo(g,nombreHijo);
       /* //----------- LISTA DE INSTRUCCIONES -----------
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
        */
        return null;
    }
    getNombreHijo(): String {
        return "RETURN";
    }
}