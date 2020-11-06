%{
	const { Instruccion } = require("../dist/ast/Instruccion");
	const { AST } = require("../dist/ast/AST");
	const { FMain } = require("../dist/ast/instrucciones/FMain");
	const { Clase } = require("../dist/ast/instrucciones/Clase");
	const { Interface } = require("../dist/ast/instrucciones/Interface");
	const { Llamado_Metodo } = require("../dist/ast/instrucciones/Llamado_Metodo");
	const { MetodoFuncion } = require("../dist/ast/instrucciones/MetodoFuncion");
	const { MetodoFuncionSentencia } = require("../dist/ast/instrucciones/MetodoFuncionSentencia");
	const { Parametro } = require("../dist/ast/instrucciones/Parametro");
	const { Return } = require("../dist/ast/instrucciones/Return");
	const { Asignacion } = require("../dist/ast/instrucciones/Asignacion");	
	const { Declaracion } = require("../dist/ast/instrucciones/Declaracion");
	const { Parametro_LlamadoMetodo } = require("../dist/ast/instrucciones/Parametro_LlamadoMetodo");
	const { Declaracion_Inicio } = require("../dist/ast/instrucciones/Declaracion_Inicio");
	const { Desarrollo } = require("../dist/ast/instrucciones/Desarrollo");
	const { Comentario } = require("../dist/ast/instrucciones/Comentario");
	const { Break_Continue } = require("../dist/ast/instrucciones/Break_Continue");
	const { Print } = require("../dist/ast/instrucciones/Print");
	const { If } = require("../dist/ast/instrucciones/If");
	const { If_Iterativo } = require("../dist/ast/instrucciones/If_Iterativo");
	const { Else } = require("../dist/ast/instrucciones/Else");
	const { DoWhile } = require("../dist/ast/instrucciones/DoWhile");
	const { While } = require("../dist/ast/instrucciones/While");
	const { For } = require("../dist/ast/instrucciones/For");
	const { Adicion_Sustraccion } = require("../dist/ast/instrucciones/Adicion_Sustraccion");
	const { OperacionAritmetica } = require("../dist/ast/expresiones/OperacionAritmetica");
	const { OperacionLogica } = require("../dist/ast/expresiones/OperacionLogica");
	const { OperacionRelacional } = require("../dist/ast/expresiones/OperacionRelacional");
	const { Identificador } = require("../dist/ast/expresiones/Identificador");
	const { Primitivo } = require("../dist/ast/expresiones/Primitivo");
	const { Type } = require("../dist/ast/Tipo");
	const { TypeOperation } = require("../dist/ast/Tipo");
	let errores_encontrados = [];
	let tockens_encontrados = [];
%}


/* Definicion Lexica */
%lex

%options case-insensitive

%%
\s+					//ignorando los espacios en blanco
"//".*				return 'comentariou' /* ignora comentario de una sola linea */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	 return 'comentariom'	/* ignora comentarios Multilinea*/

"public"			{tockens_encontrados.push(yytext); return 'public_';}
"static"			{tockens_encontrados.push(yytext); return 'static_';}
"main"				{tockens_encontrados.push(yytext); return 'main_';}
"class"				{tockens_encontrados.push(yytext); return 'class_';}
"interface"			{tockens_encontrados.push(yytext); return 'interface_';}
"void"				{tockens_encontrados.push(yytext); return 'void_';}
"int"				{tockens_encontrados.push(yytext); return 'int_';}
"double"			{tockens_encontrados.push(yytext); return 'double_';}
"char"				{tockens_encontrados.push(yytext); return 'char_';}
"String"			{tockens_encontrados.push(yytext); return 'string_';}
"boolean"			{tockens_encontrados.push(yytext); return 'boolean_';}
"break"				{tockens_encontrados.push(yytext); return 'break_';}
"continue"			{tockens_encontrados.push(yytext); return 'continue_';}
"return"			{tockens_encontrados.push(yytext); return 'return_';}


"System.out.println" {tockens_encontrados.push(yytext); return 'print_';}
"System.out.print"  {tockens_encontrados.push(yytext); return 'print_';}
"do"				{tockens_encontrados.push(yytext); return 'do_';}
"while"				{tockens_encontrados.push(yytext); return 'while_';}
"for"				{tockens_encontrados.push(yytext); return 'for_';}
"if"				{tockens_encontrados.push(yytext); return 'if_';}
"else"				{tockens_encontrados.push(yytext); return 'else_';}

","					{tockens_encontrados.push(yytext); return 'coma';}
"="					{tockens_encontrados.push(yytext); return 'igual';}
";"					{tockens_encontrados.push(yytext); return 'pcoma';}
"{"					{tockens_encontrados.push(yytext); return 'llaveAbre';}
"}"					{tockens_encontrados.push(yytext); return 'llaveCierra';}

"+"					{tockens_encontrados.push(yytext); return 'mas';}
"-"					{tockens_encontrados.push(yytext); return 'menos';}
"*"					{tockens_encontrados.push(yytext); return 'por';}
"/"					{tockens_encontrados.push(yytext); return 'division';}
"("					{tockens_encontrados.push(yytext); return 'parAbre';}
")"					{tockens_encontrados.push(yytext); return 'parCierra';}
"["					{tockens_encontrados.push(yytext); return 'corAbre';}
"]"					{tockens_encontrados.push(yytext); return 'corCierra';}

"<"					{tockens_encontrados.push(yytext); return 'menorQ';}
">"					{tockens_encontrados.push(yytext); return 'mayorQ';}

"&&"				{tockens_encontrados.push(yytext); return 'and_';}
"||"				{tockens_encontrados.push(yytext); return 'or_';}
"!"					{tockens_encontrados.push(yytext); return 'not_';}
"^"					{tockens_encontrados.push(yytext); return 'xor_';}

"true"				{tockens_encontrados.push(yytext); return 'true_';}
"false"				{tockens_encontrados.push(yytext); return 'false_';}

\"[^\"]*\"			{ yytext = yytext.substr(0,yyleng); tockens_encontrados.push(yytext); return 'cadena'; /*//"*/ }

[0-9]+"."[0-9]+		{tockens_encontrados.push(yytext); return 'decimal';}
[0-9]+				{tockens_encontrados.push(yytext); return 'entero';}

([a-zA-Z_])[a-zA-Z0-9_]*		{tockens_encontrados.push(yytext); return 'identificador';}
[ \r\t]+			{}
\n					{}
<<EOF>>				return 'EOF';
.	{ 
		errores_encontrados.push('Error léxico: ' + yytext + ', line: ' + yylloc.first_line + ', column: ' + yylloc.first_column);
		//console.error('Error léxico: ' + yytext + ', line: ' + yylloc.first_line + ', column: ' + yylloc.first_column); return null;
	}

/lex

%left 'or_'
%left 'and_'
%left 'mayorQ' 'menorQ'

%left 'mas' 'menos'
%left 'por' 'division'
%left 'xor_'

%left uMenos
%right 'not_'


/*Definicion de la Gramatica*/

//Iniciamos con la produccion INI
%start INICIO

%% 
INICIO : INSTRUCCIONES EOF {var root = new AST($1); var aux_errores = errores_encontrados; errores_encontrados = []; var aux_tockens = tockens_encontrados; tockens_encontrados = [];	return [root, aux_errores, aux_tockens];}
	;

/*
if ($1 != null){
			$1.push($2);
			$$ = $1;
		}else{
			$$ = $2;
		};
		*/

INSTRUCCIONES :
	INSTRUCCIONES INSTRUCCION {
		$1.push($2);
		$$ = $1;
	}
	| INSTRUCCION	{ $$ = [$1]; }
	| INSTRUCCIONES error pcoma { errores_encontrados.push('Error Sintactico: ' + yytext + ', line: ' + this._$.first_line + ', column: ' + this._$.first_column); $$ = []; }
	| INSTRUCCIONES error llaveCierra { errores_encontrados.push('Error Sintactico: ' + yytext + ', line: ' + this._$.first_line + ', column: ' + this._$.first_column); $$ = []; }
	| error pcoma { errores_encontrados.push('Error Sintactico: ' + yytext + ', line: ' + this._$.first_line + ', column: ' + this._$.first_column); $$ = []; }
	| error llaveCierra { errores_encontrados.push('Error Sintactico: ' + yytext + ', line: ' + this._$.first_line + ', column: ' + this._$.first_column); $$ = []; }
	;
/*
| INSTRUCCIONES error coma { console.log("Error Sintactico Coma : line: " + this._$.first_line + ", column: " + this._$.first_column); $$ = []; }
	| INSTRUCCIONES error pcoma { console.log("Error Sintactico PuntoComa : line: " + this._$.first_line + ", column: " + this._$.first_column); $$ = []; }
	| INSTRUCCIONES error parCierra { console.log("Error Sintactico Cierra : line: " + this._$.first_line + ", column: " + this._$.first_column); $$ = []; }
*/
INSTRUCCION : MAIN 		{ $$ = $1; }
	| DECLARACION 		{ $$ = $1; }
	| CLASE				{ $$ = $1; }
	| INTERFACE			{ $$ = $1; }
	| METODO_FUNCION	{ $$ = $1; }
	| LLAMADO_METODO	{ $$ = $1; }
	| ASIGNACION		{ $$ = $1; }
	| IF				{ $$ = $1; }
	| DO_WHILE			{ $$ = $1; }
	| WHILE				{ $$ = $1; }
	| FOR				{ $$ = $1; }
//	| INCREMENTODECREMENTO pcoma	{ $$ = $1; }
	| PRINT				{ $$ = $1; }
	| COMENTARIO		{ $$ = $1; }
	| RETURN			{ $$ = $1; }
	;
	//| COMENTARIO		{ $$ = $1; }

MAIN: public_ static_ void_ main_ parAbre string_ corAbre corCierra EXPRESION parCierra BS_GENERAL { $$ = new FMain($11, null, this._$.first_line, this._$.first_column); }
	;

CLASE : public_ class_ identificador BS_GENERAL { $$ = new Clase($3, $4, this._$.first_line, this._$.first_column); }
	| public_ class_ identificador llaveAbre llaveCierra { $$ = new Clase($3, null, this._$.first_line, this._$.first_column); }
	;
//| error pcoma { console.log("Error Sintactico Clase : line: " + this._$.first_line + ", column: " + this._$.first_column); }
METODO_FUNCION: public_ TIPO_RETORNO identificador parAbre V_PARAMETROS parCierra pcoma { $$ = new MetodoFuncion($3, $5, this._$.first_line, this._$.first_column); }
	| public_ TIPO_RETORNO identificador parAbre V_PARAMETROS parCierra BS_RETORNO { $$ = new MetodoFuncionSentencia($3, $5, $7, this._$.first_line, this._$.first_column); }
	| public_ TIPO_RETORNO identificador parAbre parCierra BS_RETORNO { $$ = new MetodoFuncionSentencia($3, null, $6, this._$.first_line, this._$.first_column); }
	;

INTERFACE: public_ interface_ identificador BS_GENERAL { $$ = new Interface($3, $4, this._$.first_line, this._$.first_column); }
	| public_ interface_ identificador llaveAbre llaveCierra { $$ = new Interface($3, null, this._$.first_line, this._$.first_column); }
	;

TIPO_RETORNO: void_ { $$ = $1; }
	| TIPO { $$ = $1; }
	;

V_PARAMETROS : V_PARAMETROS PARAMETRO  { $1.push($2); $$ = $1; }
	| PARAMETRO { $$ = [$1] }
	;

PARAMETRO: TIPO identificador { $$ = new Parametro($1, $2, this._$.first_line, this._$.first_column); }
	| TIPO identificador coma { $$ = new Parametro($1, $2, this._$.first_line, this._$.first_column); }
	;

DECLARACION: TIPO INICIO_DECLARACION { $$ = new Declaracion($1, $2, this._$.first_line, this._$.first_column); }
	;

INICIO_DECLARACION: identificador igual EXPRESION pcoma { $$ = new Declaracion_Inicio($1, $3, null, this._$.first_line, this._$.first_column); }
	| identificador igual EXPRESION coma DESARROLLO { $$ = new Declaracion_Inicio($1, $3, $5, this._$.first_line, this._$.first_column); }
	| identificador pcoma { $$ = new Declaracion_Inicio($1, null, null, this._$.first_line, this._$.first_column); }
	| identificador coma DESARROLLO { $$ = new Declaracion_Inicio($1, null, $3, this._$.first_line, this._$.first_column); }
	;

DESARROLLO: identificador igual EXPRESION pcoma { $$ = new Desarrollo($1, $3, null, this._$.first_line, this._$.first_column); }
	| identificador pcoma { $$ = new Desarrollo($1, null, null, this._$.first_line, this._$.first_column); }
	| identificador coma DESARROLLO { $$ = new Desarrollo($1, null, $3, this._$.first_line, this._$.first_column); }
	| identificador igual EXPRESION coma DESARROLLO { $$ = new Desarrollo($1, $3, $5, this._$.first_line, this._$.first_column); }
	;

TIPO : int_ 	{ $$ = Type.INT; }
	| double_ 	{ $$ = Type.DOUBLE; }
	| char_ 	{ $$ = Type.CHAR; }
	| string_ 	{ $$ = Type.STRING; }
	| boolean_	{ $$ = Type.BOOLEAN; }
	;

//Bloque de Sentencias - Funciones y Metodos
BS_RETORNO: llaveAbre INSTRUCCIONES llaveCierra { $$ = $2; }
	;

RETURN: return_ EXPRESION pcoma { $$ = new Return($2, this._$.first_line, this._$.first_column); }
	//| error pcoma { console.log("Error Sintactico Clase : line: " + this._$.first_line + ", column: " + this._$.first_column); }
	;

ASIGNACION: identificador igual EXPRESION pcoma { $$ = new Asignacion($1, $3, this._$.first_line, this._$.first_column); }
	//| identificador error pcoma { console.log("Error Sintactico Asignacion : line: " + this._$.first_line + ", column: " + this._$.first_column); $$ = null; }
	;

LLAMADO_METODO: identificador parAbre PARAMETRO_LLAMADO parCierra pcoma { $$ = new Llamado_Metodo($1, $3, this._$.first_line, this._$.first_column); }
	| identificador parAbre parCierra pcoma { $$ = new Llamado_Metodo($1, null, this._$.first_line, this._$.first_column); }
	;

PARAMETRO_LLAMADO: EXPRESION coma PARAMETRO_LLAMADO { $$ = new Parametro_LlamadoMetodo($1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION { $$ = $1; }
	;

COMENTARIO : comentariom { $$ = new Comentario($1, this._$.first_line, this._$.first_column); }
	| comentariou { $$ = new Comentario($1,this._$.first_line, this._$.first_column); }
	;

FOR : for_ parAbre DECLARACION EXPRESION pcoma EXPRESION parCierra BS_CICLO { $$ = new For($3, $4, $6, $8, this._$.first_line, this._$.first_column); }
	;

DO_WHILE: do_ BS_CICLO while_ parAbre EXPRESION parCierra pcoma { $$ = new DoWhile($5, $2, this._$.first_line, this._$.first_column); }
	;

WHILE : while_ parAbre EXPRESION parCierra BS_CICLO { $$ = new While($3, $5, this._$.first_line, this._$.first_column); }
	;

//Bloque de Sentencias - Ciclos
BS_CICLO: llaveAbre INSTRUCCIONES llaveCierra { $$ = $2; }
	| llaveAbre INSTRUCCIONES BREAK_CONTINUE llaveCierra { $$ = $2.concat($3); }
	;

BREAK_CONTINUE: break_ pcoma { $$ = new Break_Continue($1, this._$.first_line, this._$.first_column); }
	| continue_ pcoma { $$ = new Break_Continue($1, this._$.first_line, this._$.first_column); }
	;

IF: if_ parAbre EXPRESION parCierra BS_GENERAL { $$ = new If($3, $5, null, this._$.first_line, this._$.first_column); }
	| if_ parAbre EXPRESION parCierra BS_GENERAL else_ ELSE { $$ = new If($3, $5, $7, this._$.first_line, this._$.first_column); }
	| if_ parAbre EXPRESION parCierra BS_GENERAL else_ IF { $$ = new If_Iterativo($3, $5, $7, this._$.first_line, this._$.first_column); }	
	| if_ parAbre EXPRESION parCierra llaveAbre llaveCierra else_ llaveAbre llaveCierra  { $$ = new If($3, null, null, this._$.first_line, this._$.first_column); }
	;

ELSE: BS_GENERAL { $$ = new Else($1, this._$.first_line, this._$.first_column); }
	| llaveAbre llaveCierra { $$ = null; }
	;

PRINT : print_ parAbre EXPRESION parCierra pcoma { $$ = new Print($3, this._$.first_line, this._$.first_column); }
	;

//Bloque de Sentencias - General
BS_GENERAL : llaveAbre INSTRUCCIONES llaveCierra { $$ = $2; }
	;

EXPRESION : 
	// Aritmeticas
	 EXPRESION mas EXPRESION				{ $$ = new OperacionAritmetica( TypeOperation.SUMA, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menos EXPRESION				{ $$ = new OperacionAritmetica( TypeOperation.RESTA, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION por EXPRESION				{ $$ = new OperacionAritmetica( TypeOperation.MULTIPLICACION, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION division EXPRESION			{ $$ = new OperacionAritmetica( TypeOperation.DIVISION, $1, $3, this._$.first_line, this._$.first_column); }	
	// Relacionales
	| EXPRESION mayorQ EXPRESION			{ $$ = new OperacionRelacional( TypeOperation.MAYOR, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menorQ EXPRESION			{ $$ = new OperacionRelacional( TypeOperation.MENOR, $1, $3, this._$.first_line, this._$.first_column); }	
	// Logicas
	| EXPRESION or_ EXPRESION				{ $$ = new OperacionLogica( TypeOperation.OR, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION and_ EXPRESION				{ $$ = new OperacionLogica( TypeOperation.AND, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION xor_ EXPRESION				{ $$ = new OperacionLogica( TypeOperation.XOR, $1, $3, this._$.first_line, this._$.first_column); }
	| not_ EXPRESION						{ $$ = new OperacionLogica( TypeOperation.NOT, $2, null, this._$.first_line, this._$.first_column); }
	| menos EXPRESION %prec uMenos			{ $$ = new OperacionAritmetica( TypeOperation.MENOSUNARIO, $2, null, this._$.first_line, this._$.first_column); }
	| parAbre EXPRESION parCierra			{ $$ = $2; }
	| EXPRESION mas mas 					{ $$ = new Adicion_Sustraccion($1, $2, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menos menos 				{ $$ = new Adicion_Sustraccion($1, $2, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menorQ igual EXPRESION		{ $$ = new OperacionRelacional( TypeOperation.MENOR_IGUAL, $1, $4, this._$.first_line, this._$.first_column); }
	| EXPRESION mayorQ igual EXPRESION		{ $$ = new OperacionRelacional( TypeOperation.MAYOR_IGUAL, $1, $4, this._$.first_line, this._$.first_column); }
	| EXPRESION not_ igual EXPRESION		{ $$ = new OperacionRelacional( TypeOperation.DIFERENTE, $1, $4, this._$.first_line, this._$.first_column); }
	| PRIMITIVO								{ $$ = $1; }
	;

PRIMITIVO : 
	  decimal		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| entero		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| cadena		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| true_			{ $$ = new Primitivo( true, this._$.first_line, this._$.first_column); }
	| false_		{ $$ = new Primitivo( false, this._$.first_line, this._$.first_column); }
	| identificador { $$ = new Identificador( $1, this._$.first_line, this._$.first_column); }
	;
