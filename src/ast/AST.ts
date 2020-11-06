import { ValorGrafo } from "./grafo/ValorGrafo";
import { Instruccion } from "./Instruccion";
/*Recordar que esta 'clase' es usado como un tipo de variable 
(como en Visual Basic: variable as Integer) 
el cual se utiliza una vez al tratar de hacer el analisis de nuestro lenguaje JAVA*/
export class AST extends Instruccion {

    instrucciones: Array<Instruccion>;
    listaErrores: Array<String>;
    listaPrints: Array<String>;

    constructor(instrucciones: Array<Instruccion>) {
        super(0, 0)
        /*console.log("Aqui inicia:")
        for (let value of instrucciones) {
            console.log(value);
        }*/
        this.instrucciones = instrucciones;
    }

    translate(): String {
        let cadena = "";
        if (this.instrucciones != null) {
            for (let a = 0; a < this.instrucciones.length; a++) {
                cadena += this.instrucciones[a].translate();
            }
        }
        return cadena;
    }

    generarGrafo(g: ValorGrafo, padre: String) {

        if (this.instrucciones != null) {
            //----------- LISTA DE INSTRUCCIONES -----------
            let nombreHijo: String = "nodo" + g.contador;

            g.grafo += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            padre = nombreHijo;

            for (let x = 0; x < this.instrucciones.length; x++) {
                let inst = this.instrucciones[x];
                nombreHijo = "nodo" + g.contador;
                g.grafo += "  " + nombreHijo + "[label=\"" + inst.getNombreHijo() + "\"];\n";
                g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;
                inst.generarGrafo(g, nombreHijo);
            }
            //----------------------------------------------
        }
    }
    getNombreHijo(): String {
        throw new Error("Method not implemented.");
    }
}