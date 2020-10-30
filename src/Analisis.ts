import Gramatica = require('../Gramatica/gramatica');
import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";

export function AnalizarJava(entrada:string):String{

    //Nota: Cuando no funciona algun funcionamiento de los nodos, hay que tomar en cuenta
    //si en realidad la funcion que tratamos de traducir tiene hijos
    let codigo = `

        public void suma(int x, int y, int z);

        public void suma(int x, int y){
            int numero = 2;
            String cadena = "Hola";
            boolean flag = true; 
            numeric a = 0.0;
        }
            

        public class holamundo {
            int numero = 2;
            String cadena = "Hola";
            boolean flag = true; 
            numeric a = 0.0;
        }

        while(a > 2){ 
            a = "hola"+":)"+59.5*12.2+(10.9*12.12-56.56/0.1);
            System.out.println(a+b||c>d);
            System.out.println(a);
        }

        for(int i=1.0; i<10; i++){
            System.out.println("hola");
        }

        for( double x = 20; x > 5*4; x --){
            System.out.println("hola 2");
        }
        
    `;
    // Analisis Lexico y Sintactico
    // Recordar el As utilizado en Visual Basic: hola as Integer
    let ast = Gramatica.parse(codigo) as AST;
    //Generacion de grafo
    let nuevoCodigo = ast.translate();
    console.log("\n\n---------------- TRADUCCION ----------------\n");
    console.log(nuevoCodigo);
    console.log("\n--------------------------------------------\n");
    
    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo()
    console.log("\n\n------------------- GRAFO -------------------\n");
    console.log(txtDotAST);
    console.log("\n--------------------------------------------\n");
    return "exito";
}