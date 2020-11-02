%{
	const { Instruccion } = require("../dist/ast/Instruccion");
	const { AST } = require("../dist/ast/AST");
	const { Clase } = require("../dist/ast/instrucciones/Clase");
	const { MetodoFuncion } = require("../dist/ast/instrucciones/MetodoFuncion");
	const { MetodoFuncionSentencia } = require("../dist/ast/instrucciones/MetodoFuncionSentencia");
	const { Parametro } = require("../dist/ast/instrucciones/Parametro");
	const { Asignacion } = require("../dist/ast/instrucciones/Asignacion");
	const { Declaracion } = require("../dist/ast/instrucciones/Declaracion");
	const { Print } = require("../dist/ast/instrucciones/Print");
	const { If } = require("../dist/ast/instrucciones/If");
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
%}


/* Definicion Lexica */
%lex

%options case-insensitive

%%
\s+					//ignorando los espacios en blanco
"//".*				/* ignora comentario de una sola linea */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]		/* ignora comentarios Multilinea*/

"public"			return 'public_';
"class"				return 'class_';
"interface"			return 'interface_';
"void"				return 'void_';
"int"				return 'int_';
"double"			return 'double_';
"char"				return 'char_';
"String"			return 'string_';
"boolean"			return 'boolean_';

"System.out.println" return 'print_';
"do"				return 'do_';
"while"				return 'while_';
"for"				return 'for_';
"if"				return 'if_';
"else"				return 'else_';

","					return 'coma';
"="					return 'igual';
";"					return 'pcoma';
"{"					return 'llaveAbre';
"}"					return 'llaveCierra';

"+"					return 'mas';
"-"					return 'menos';
"*"					return 'por';
"/"					return 'division';
"("					return 'parAbre';
")"					return 'parCierra';

"<"					return 'menorQ';
">"					return 'mayorQ';

"&&"				return 'and_';
"||"				return 'or_';
"!"					return 'not_';

"true"				return 'true_';
"false"				return 'false_';

\"[^\"]*\"				{ yytext = yytext.substr(0,yyleng); return 'cadena'; /*//"*/ }

[0-9]+"."[0-9]+		return 'decimal';
[0-9]+				return 'entero';

([a-zA-Z_])[a-zA-Z0-9_]*		return 'identificador';
[ \r\t]+			{}
\n					{}
<<EOF>>				return 'EOF';
.	{ 
		console.error('Error léxico: ' + yytext + ', line: ' + yylloc.first_line + ', column: ' + yylloc.first_column); 
	}

/lex

%left 'or_'
%left 'and_'
%left 'mayorQ' 'menorQ'

%left 'mas' 'menos'
%left 'por' 'division'

%left uMenos
%right 'not_'


/*Definicion de la Gramatica*/

//Iniciamos con la produccion INI
%start INICIO

%% 
INICIO : INSTRUCCIONES EOF {var root = new AST($1);	return root;}
	;

INSTRUCCIONES :
	  INSTRUCCIONES INSTRUCCION {$1.push($2); $$ = $1;}
	| INSTRUCCION 				{$$ = [$1];}
	;

INSTRUCCION : 
	  DECLARACION 		{ $$ = $1; }
	| CLASE				{ $$ = $1; }
	| METODO_FUNCION	{ $$ = $1; }
	| ASIGNACION		{ $$ = $1; }
	| IF				{ $$ = $1; }
	| DO_WHILE			{ $$ = $1; }
	| WHILE				{ $$ = $1; }
	| FOR				{ $$ = $1; }
	| PRINT				{ $$ = $1; }
	;

IF: if_ CONDICION BLOQUE_SENTENCIAS { $$ = new If($2, $3, null, this._$.first_line, this._$.first_column); }
	| if_ CONDICION BLOQUE_SENTENCIAS else_ BLOQUE_SENTENCIAS { $$ = new If($2, $3, $5, this._$.first_line, this._$.first_column); }
	;

ELSE : ELSE ELSE_R  { $1.push($2); $$ = $1; }
	| ELSE_R { $$ = [$1]; }
	;

ELSE_R: else_ if_ CONDICION BLOQUE_SENTENCIAS { $$ = $3+$4; }
	| else_ BLOQUE_SENTENCIAS { $$ = $2; }
	;

DO_WHILE: do_ BLOQUE_SENTENCIAS while_ CONDICION pcoma { $$ = new DoWhile($4, $2, this._$.first_line, this._$.first_column); }
	;

FOR : for_ parAbre DECLARACION EXPRESION pcoma INCREMENTODECREMENTO parCierra BLOQUE_SENTENCIAS { $$ = new For($3, $4, $6, $8, this._$.first_line, this._$.first_column); }
	;

DECLARACION : TIPO identificador igual EXPRESION pcoma { $$ = new Declaracion($1, $2, $4, this._$.first_line, this._$.first_column); }
	| TIPO identificador igual EXPRESION coma { $$ = new Declaracion($1, $2, $4, this._$.first_line, this._$.first_column); }
	;

INCREMENTODECREMENTO: identificador mas mas { $$ = new Adicion_Sustraccion($1, $2, $3, this._$.first_line, this._$.first_column); }
	| identificador menos menos { $$ = new Adicion_Sustraccion($1, $2, $3, this._$.first_line, this._$.first_column); }
	;

METODO_FUNCION: public_ TIPO_RETORNO identificador parAbre V_PARAMETROS parCierra pcoma { $$ = new MetodoFuncion($3, $5, this._$.first_line, this._$.first_column); }
	| public_ TIPO_RETORNO identificador parAbre V_PARAMETROS parCierra BLOQUE_SENTENCIAS { $$ = new MetodoFuncionSentencia($3, $5, $7, this._$.first_line, this._$.first_column); }
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

TIPO : int_ 	{ $$ = Type.INT; }
	| double_ 	{ $$ = Type.DOUBLE; }
	| char_ 	{ $$ = Type.CHAR; }
	| string_ 	{ $$ = Type.STRING; }
	| boolean_	{ $$ = Type.BOOLEAN; }
	;

ASIGNACION : identificador igual EXPRESION pcoma { $$ = new Asignacion($1, $3, this._$.first_line, this._$.first_column); }
	;

CLASE : public_ class_ identificador BLOQUE_SENTENCIAS { $$ = new Clase($3, $4, this._$.first_line, this._$.first_column); }
	;

WHILE : while_ CONDICION BLOQUE_SENTENCIAS { $$ = new While($2, $3, this._$.first_line, this._$.first_column); }
	;

CONDICION : parAbre EXPRESION parCierra { $$ = $2; }
	;

BLOQUE_SENTENCIAS : llaveAbre INSTRUCCIONES llaveCierra { $$ = $2; }
	;

PRINT : print_ CONDICION pcoma { $$ = new Print( $2, this._$.first_line, this._$.first_column); }
	;

EXPRESION : 
	// Aritmeticas
	  EXPRESION mas EXPRESION		{ $$ = new OperacionAritmetica( TypeOperation.SUMA, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menos EXPRESION		{ $$ = new OperacionAritmetica( TypeOperation.RESTA, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION por EXPRESION		{ $$ = new OperacionAritmetica( TypeOperation.MULTIPLICACION, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION division EXPRESION	{ $$ = new OperacionAritmetica( TypeOperation.DIVISION, $1, $3, this._$.first_line, this._$.first_column); }	
	// Relacionales
	| EXPRESION mayorQ EXPRESION	{ $$ = new OperacionRelacional( TypeOperation.MAYOR, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menorQ EXPRESION	{ $$ = new OperacionRelacional( TypeOperation.MENOR, $1, $3, this._$.first_line, this._$.first_column); }
	// Logicas
	| EXPRESION or_ EXPRESION		{ $$ = new OperacionLogica( TypeOperation.OR, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION and_ EXPRESION		{ $$ = new OperacionLogica( TypeOperation.AND, $1, $3, this._$.first_line, this._$.first_column); }
	| not_ EXPRESION				{ $$ = new OperacionLogica( TypeOperation.NOT, $2, null, this._$.first_line, this._$.first_column); }
	| menos EXP %prec uMenos		{ $$ = new OperacionAritmetica( TypeOperation.MENOSUNARIO, $2, null, this._$.first_line, this._$.first_column); }
	| parAbre EXPRESION parCierra	{ $$ = $2; }
	| PRIMITIVO						{ $$ = $1; }
	;

PRIMITIVO : 
	  decimal		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| entero		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| cadena		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| true_			{ $$ = new Primitivo( true, this._$.first_line, this._$.first_column); }
	| false_		{ $$ = new Primitivo( false, this._$.first_line, this._$.first_column); }
	| identificador { $$ = new Identificador( $1, this._$.first_line, this._$.first_column); }
	;
