import { Instruccion } from "../Instruccion"
import { Type } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Declaracion extends Instruccion {

    lista_expresiones: Instruccion;
    type: Type;

    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param type tipo de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param lista_expresiones lista_expresiones de la expresion asociada a la variable
     */
    constructor(type: Type, lista_expresiones: Instruccion, line: Number, column: Number) {
        super(line, column)
        this.type = type;
        this.lista_expresiones = lista_expresiones;
    }

    translate() {
        // int a = 0; o int a;
        let cadena = "";
        cadena += "var ";
        if(this.lista_expresiones != null){
            cadena += this.lista_expresiones.translate();
        }
        cadena += ";\n"
        return cadena;
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        let padreAux = padre; //Auxiar con nombre del padre

        //Tipo
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + Type[this.type] + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        //nombreHijo = padre;
        //LISTADO DE EXPRESIONES
        if (this.lista_expresiones != null){
            //Expresion
            /*nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.lista_expresiones.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;*/
            this.lista_expresiones.generarGrafo(g, padre);
        }
        return null;
    }
    getNombreHijo(): String {
        return "DECLARACION"
    }
}