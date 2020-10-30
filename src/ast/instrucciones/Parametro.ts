import { Instruccion } from "../Instruccion"
import { Type } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Parametro extends Instruccion {
    id: Array<Instruccion>;
    
    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param type tipo de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param valor valor de la expresion asociada a la variable
     */
    constructor(id: Array<Instruccion>, id2: Array<Instruccion> , line: Number, column: Number) {
        super(line, column)
        this.id = id;
    }

    translate() {
        let cadena = "";
        for (const ins of this.id) {
            cadena += ins.translate();
        }
        return cadena;
    }
    
    generarGrafo(g: ValorGrafo, padre: String) {
        // Id
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;

        let padreHijo = nombreHijo;

        //Identificador
        nombreHijo = "nodo" + g.contador;
        /*let losIds = ""
        for(let i = 0; i<listaIds.length; i++){
            losIds += listaIds[i]+",";
        }
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + losIds + "\"];\n";
        */
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.grafo += "  " + padreHijo + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo(): String {
        return "PARAMETRO"
    }
}