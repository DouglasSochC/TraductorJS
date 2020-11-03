"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const Instruccion_1 = require("../Instruccion");
class If extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(instrucciones, instrucciones2, line, column) {
        super(line, column);
        console.log("tamanio de las instrucciones: " + instrucciones.length);
        /*for (const ins of this.instrucciones) {
            console.log("instrucciones: "+ins);
        }*/
        console.log("instrucciones2: " + instrucciones2.length);
        this.instrucciones = instrucciones2;
    }
    translate() {
        let cadena = "";
        for (const ins of this.instrucciones) {
            //cadena += ins.translate();
            console.log("iterando: " + ins);
        }
        return cadena + "\n}\n";
    }
    generarGrafo(g, padre) {
        /*let p= padre;
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
        }*/
        //----------------------------------------------
        return null;
    }
    getNombreHijo() {
        return "IF";
    }
}
exports.If = If;
//# sourceMappingURL=If copy.js.map