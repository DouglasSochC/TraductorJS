import Gramatica = require('../Gramatica/gramatica');
import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";

export function AnalizarJava(entrada: string): String {

    //Nota: Cuando no funciona algun funcionamiento de los nodos, hay que tomar en cuenta
    //si en realidad la funcion que tratamos de traducir tiene hijos
    let codigo = `
    
    public class Myclase {
        String variable , variable1 , variable2;
        int constante=100/5*5/5+3+2-1*0+1 + 2;
        
        
        public void MyMetodo (int x  ){
            metodo_llamada(x,"hola a todos",y,z,b,bs);
            String nombre="myMetodo";
            int x , y;
            x=10;
            y=11;
            int variable=3+3-5/5*10;
            System.out.println("myMetodo");
            System.out.print(x);
        }
        
        public void MyMetodo2(int x ){
            int valor=x;
            System.out.println(x);
            for (int f; x<=f; f++){
                System.out.println("HOla");
                hola(x);
            }
            
            //hola
        }
        
        public void Contador(){
            int contador = 0 ;
            do{
                System.out.println ("Contador" + (contador + 1) );
                contador ++;
            } while (contador<10);   
            System.out.println(contador + "va aumentando");
        }
        public static void main(String [] args ){
            System.out.println("ESTE ES EL MAIN");
        } 
        
        public void testif(String valor){
            int contador = valor ;
            if (valor==10){
            //imprime
            for (int f; x<=f; f++){
                System.out.println(f);
            }
            } else if (valor>10){
                System.out.println("x");
            }else   {
                System.out.println("x");
            }
        }
      
    }
      
    public interface MyInterface { 
      
    }
    public class MyClase2 { 
    
    }
    public class MyClase3 { 
    
    }
      
    `;

    /*
        public class Myclase {
        String variable , variable1 , variable2;
        int constante=100/5*5/5+3+2-1*0+1 + 2;
        
        
        public void MyMetodo (int x  ){
            metodo_llamada(x);
            String nombre="myMetodo";
            int x , y;
            x=10;
            y=11;
            int variable=3+3-5/5*10;
            System.out.println("myMetodo");
            System.out.print(x);
        }
        
        public void MyMetodo2(int x ){
            int valor=x;
            System.out.println(x);
            for (int f; x<=f; f++){
                System.out.println("HOla");
                hola(x);
            }
            
            //hola
        }
        
        public void Contador(){
            int contador = 0 ;
            do{
            System.out.println ("Contador" + (contador + 1) );
            contador ++;
            } while (contador<10);   
            System.out.println(contador + "va aumentando");
        }
        public static void main(String [] args ){
            System.out.println("ESTE ES EL MAIN");
        } 
        
        public void testif(String valor){
            int contador = valor ;
            if (valor==10){
            //imprime
            for (int f; x<=f; f++){
                System.out.println(f);
            }
            } else if (valor>10){
            System.out.println("x");
            }else   {
            System.out.println("x");
            }
        }
      
    }
      
    public interface MyInterface { 
      
    }
    public class MyClase2 { 
    
    }
    public class MyClase3 { 
    
    }

    */
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