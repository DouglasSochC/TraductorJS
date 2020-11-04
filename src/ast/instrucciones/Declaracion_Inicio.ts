import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Declaracion_Inicio extends Instruccion {
    
    id: String;
    expresion: Instruccion;
    desarrollo: Instruccion;
    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param type tipo de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param valor valor de la expresion asociada a la variable
     */
    constructor(id: String, expresion: Instruccion, desarrollo: Instruccion, line: Number, column: Number) {
        super(line, column)
        this.id = id;
        this.expresion = expresion;
        this.desarrollo = desarrollo;
    }

    translate() {
        let cadena = this.id.toString();
        if (this.expresion != null) {
            cadena += " = " + this.expresion.translate();
        }
        if (this.desarrollo != null) {
            cadena += ", "+this.desarrollo.translate();
        }
        return cadena;
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        let padreAux = padre;
        /*
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"PRUEBA\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        */
        // Titulo "Id" (literal)
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        
        let padreHijo = nombreHijo;

        //Identificador
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.grafo += "  " + padreHijo + " -> " + nombreHijo + ";\n";
        g.contador++;

        if (this.expresion != null){
            //Expresion
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.expresion.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.expresion.generarGrafo(g, nombreHijo);
        }

        if (this.desarrollo != null) {
            //Expresion
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.desarrollo.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.desarrollo.generarGrafo(g, nombreHijo);
        }
        return null;
    }

    getNombreHijo(): String {
        return "LISTA_DECLARACIONES"
    }
}