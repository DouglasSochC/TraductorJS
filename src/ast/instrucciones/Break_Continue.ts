import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Break_Continue extends Instruccion {
    
    instruccion: String;
    /**
     * @class La instruccion DoWhile realiza una iteracion y luego
     * verifica su condicion
     * @param linea linea de la instruccion while
     * @param columna columna de la instruccion while
     * @param instruccion Reconoce que sentencia de tipo retorno es
     */
    constructor(instruccion:String, linea:Number, columna:Number){
        super(linea,columna);
        this.instruccion = instruccion;
    }

    translate() {
        return this.instruccion.toString()+";";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+ this.instruccion.toString() +"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        //----------------------------------------------
        return null;
    }
    
    getNombreHijo(): String {
        return "SENTENCIA_REPETICION";
    }
}