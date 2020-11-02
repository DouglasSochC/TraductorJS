import { Instruccion } from "../Instruccion"
import { Type } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Parametro extends Instruccion {
    
    id: String;
    type: Type;

    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param type tipo de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param valor valor de la expresion asociada a la variable
     */
    constructor(type: Type, id: String, line: Number, column: Number) {
        super(line, column)
        this.id = id;
        this.type = type;
    }

    translate() {
        // int a;
        return this.id.toString();
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        
        //Tipo
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + Type[this.type] + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;

        // Id
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;

        let padreHijo = nombreHijo;

        //Identificador
        nombreHijo = "nodo" + g.contador;
        
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.grafo += "  " + padreHijo + " -> " + nombreHijo + ";\n";
        g.contador++;

        return null;
    }

    getNombreHijo(): String {
        return "PARAMETRO"
    }
}