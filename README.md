
# Manual Tecnico

Realizar la traducción de un lenguaje a otro puede ser algo tedioso sobre todo cuando estamos trabajando sobre sistemas legacy y con los cuales queremos replicar la funcionalidad en otro lenguaje de programación que es más reciente o popular y del cual encontramos mayor información y soporte técnico.

Es por ello que se ha creado un traductor, para darle solucion al lenguaje JAVA, el cual se desea traducirlo a dos lenguajes de salida el cual son Javascript y Python.

#### Tecnologias

  - Node Js (Version 12) - Es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación JavaScript.
  
  - TypeScript (Version 4.0.5) - Este es usado para desarrollar aplicaciones JavaScript que se ejecutarán en el lado del cliente o del servidor (Node.js y Deno (software)).
  - Jison (Version 0.4.18) - Este toma una gramática libre de contexto como entrada y genera un archivo JavaScript capaz de analizar el lenguaje descrito por esa gramática. Luego, puede usar el script generado para analizar las entradas y aceptar, rechazar o realizar acciones basadas en la entrada. Si estás familiarizado con Bison o Yacc u otros clones, estás casi listo para rodar.
  - Go (Version 1.13) - Es un lenguaje de programación concurrente y compilado inspirado en la sintaxis de C, que intenta ser dinámico como Python y con el rendimiento de C o C++.
  - HTML: Es un lenguaje de marcado que se utiliza para el desarrollo de páginas de Internet. 
  - Javascript: Se utiliza principalmente del lado del cliente "Cliente (informática)"), implementado como parte de un navegador web ("Navegador web") permitiendo mejoras en la interfaz de usuario "Interfaz de usuario") y páginas web dinámicas

### Cliente

Se hizo uso de los métodos HTTP, principalmente el método que se utilizo es el 'POST',  se hizo por medio de javascript, este método permite consumir la api rest de los dos servidores, hay que tomar en cuenta que el fetch, nos permitia hacer los pedidos.

```sh
var  url = 'http://localhost:3000/analisis';

fetch(url, {
method:  'POST', // or 'PUT'
body:  JSON.stringify(data), // data can be `string` or {object}!
headers: {
'Content-Type':  'application/json'
}
}).then(res  =>  res.json())
//.catch(error => console.error('Error:', error))
//.then(response => console.log('Success:', response));
.catch(function (error) {
alert(error);
})
.then(function (response) {
}
```
En la variable data, va toda la información hacia el servidor, en este se puede modelar los datos que se envian, de un lugar a otro.

La tecnología utilizada para "levantar", el frontend del cliente es golang, para realizar los ajustes necesarios se hizo lo siguiente.

```sh
package main

import (
"log"
"net/http"
"time"
)

func  main() {
	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("public"))
	mux.Handle("/", fs)
	server := &http.Server{
		Addr: ":7000",
		Handler: mux,
		ReadTimeout: 10 * time.Second,
		WriteTimeout: 10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	log.Println("Servidor escuchando en: http://localhost:7000/")
	log.Fatal(server.ListenAndServe())
}
```
Para una futura modificación, este código se encuentra en el archivo index.go

Ahora, hay que tomar en cuenta que para la parte visual, se hizo uso de html, css y javascript. El codigo de dicho proyecto se encuentra como Editor_Cliente.

### Servidor Javascript
Antes de empezar a desarrollar el servidor, se tuvo que hacer configuraciones previas por medio del comando `npm init`, en la cual se definieron ciertas dependencias. Estas se encuentran en el archivo package.json
```sh
//Esta es una pequeña porcion de codigo
//se hace con el fin de mostrar las dependencias 
//antes de instalar el servidor

"dependencies": {
	"cors": "^2.8.5",
	"express": "^4.17.1",
	"jison": "^0.4.18",
	"typescript": "^4.0.3"
}

```
Hay que tomar en cuenta que se instalaron las siguientes tecnologías.
```sh
npm install –s jison //Este es para el analizador.

npm install -s express //Este nos sirve para crear el servidor.

npm install –s cors /*Este nos ayuda a la comunicación 
de los servidores. Particularmente este es la 
comunicación que hay entre distintos servidores.*/
```
#### Jison
Como se sabe que se esta utilizando Jison, para realizar el análisis léxico y sintáctico, se explicara una pequeña porción del código, si se desea editar la gramática; El archivo se encuentra en la carpeta 'Gramatica'.
```sh
%{
const { Instruccion } = require("../dist/ast/Instruccion");
const { AST } = require("../dist/ast/AST");
const { FMain } = require("../dist/ast/instrucciones/FMain");
%}
```
El código que esta entra llaves y el símbolo porcentaje, son los objetos que nos ayuda a definir el grafo del análisis.


Para definir los lexemas que son validos dentro del lenguaje Java, se inicia con el `%lex` y finaliza con `/lex`, a continuación se mostrara un pequeño ejemplo de como se obtienen los tockens, y como se puede retornar los lexemas.
```sh
%lex
%options case-insensitive
%%
\s+  //ignorando los espacios en blanco
"//".* return 'comentariou' /* ignora comentario de una sola linea */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  return  'comentariom'  /* ignora comentarios Multilinea*/

"public" {tockens_encontrados.push(yytext); return  'public_';}
"static" {tockens_encontrados.push(yytext); return  'static_';}
"main" {tockens_encontrados.push(yytext); return  'main_';}
"class" {tockens_encontrados.push(yytext); return  'class_';}

/lex
```
Ahora, para definir el análisis sintáctico se muestra una pequeña porción de código, en donde se puede visualizar como se acepta un dato primitivo. Hay que tomar en cuenta que para iniciar el análisis sintáctico hay que agregar previamente `%start NOMBREPRODUCCION
%`

Las palabras que están en minúscula son tomados como los lexemas que se encontraron en el análisis léxico.
```sh
%start INICIO
%% 
PRIMITIVO :
	decimal { $$ = new  Primitivo( $1, this._$.first_line, this._$.first_column); }
	| entero { $$ = new  Primitivo( $1, this._$.first_line, this._$.first_column); }
	| cadena { $$ = new  Primitivo( $1, this._$.first_line, this._$.first_column); }
	| true_ { $$ = new  Primitivo( true, this._$.first_line, this._$.first_column); }
	| false_ { $$ = new  Primitivo( false, this._$.first_line, this._$.first_column); }
	| identificador { $$ = new  Identificador( $1, this._$.first_line, this._$.first_column); }
;
```
El paradigma que se utilizo para la realización del proyecto es el paradigma orientado a objetos.

#### Api Rest
Para crear los métodos HTTP, se hizo uso de la tecnología de javascript. Para realizar los métodos post, se subdividieron, en varias clases.
- server.ts: Por medio de esta clase es que se pueden consumir los métodos post, que se van a hacer uso en el frontend del cliente.

- index.ts: Permite hacer el llamado al puerto que se va a utilizar para la comunicación.
- controller.ts: Por medio de esta 'clase', se puede obtener ciertos métodos de la clase 'Analisis.ts'.
- Analisis.ts: Por medio de esta 'clase' se pueden obtener los métodos, que realizan el proceso de traducción, y otros.

Estas clases son importantes para el uso de los procesos, que nos permiten la traducción, la obtención de datos, y otros.
