import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class MetodoFuncionSentencia extends Instruccion {
    
    nombre_funcion:String;
    parametros: Array<Instruccion>;
    instrucciones: Array<Instruccion>;
    /**
     * @class La instruccion metodofuncion, realiza la traduccion a javascript
     * @param nombre_funcion identificar el nombre de la funcion
     * @param linea linea donde se esata asignando el nuevo valor a la variable
     * @param columna columna donde se esata asignando el nuevo valor a la variable
     * @param parametros Son los parametros del metodo o funcion
     */
    constructor(nombre_funcion:String, parametros: Array<Instruccion>, instrucciones: Array<Instruccion>, linea:Number, columna:Number){
        super(linea,columna) //Nos permite almacenar la linea y la columna a la clase Instruccion.ts
        this.nombre_funcion = nombre_funcion;
        this.instrucciones = instrucciones;
        this.parametros = parametros;
    }

    translate() {
        let cadena = "function "+this.nombre_funcion.toString()+"(";
        for(let a = 0; a < this.parametros.length; a++){
            if (a < this.parametros.length-1){
                cadena += this.parametros[a]+",";
            }else{
                cadena += this.parametros[a]+"){\n\n";
            }
            
        }
        for (const ins of this.instrucciones) {
            cadena += ins.translate();
        }
        return cadena+"\n}\n";
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        
        //Identificador
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\" Id: "+this.nombre_funcion+"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        //----------- LISTA DE INSTRUCCIONES -----------
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"PARAMETROS\"];\n";
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
        return "METODO_FUNCION_SENTENCIA";
    }
}