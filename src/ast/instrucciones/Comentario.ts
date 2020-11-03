import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Comentario extends Instruccion {
    
    comentario:String;
    /**
     *  a = 5;
     * @class La instruccion asignacion, modifica el valor de una variable en la tabla de simbolos
     * @param id identificador de la variable que se va a modificar
     * @param linea linea donde se esata asignando el nuevo valor a la variable
     * @param columna columna donde se esata asignando el nuevo valor a la variable
     * @param valor nuevo valor que se le asignara a la variable
     */
    constructor(comentario:String, linea:Number, columna:Number){
        super(linea,columna) //Nos permite almacenar la linea y la columna a la clase Instruccion.ts
        this.comentario = comentario;
    }

    translate() {
        return this.comentario.toString();
    }
    generarGrafo(g: ValorGrafo, padre: String) {
                
        return null;
    }
    getNombreHijo(): String {
        return "CLASE";
    }
}