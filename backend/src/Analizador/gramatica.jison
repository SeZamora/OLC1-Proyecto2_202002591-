%{
    //? Imports

    const TIPO_DATO = require('../Tipos/TipoDato');   
    const INSTRUCCION = require('../Instrucciones/Instruccion');
    const TIPO_OPERACION = require('../Tipos/TipoOperacion');
    const TIPO_VALOR = require('../Tipos/TipoValor');
    const ListaErrores = require('../Errores/ListaErrores');
    const ListaSimbolos = require('../Simbolos/ListaSimbolos');

    //? Instructions
    var simbolos = new ListaSimbolos();
    var lista = new ListaErrores();
%}
/* lexical grammar */
%lex
%options case-insensitive 




%%
[ \s\r\n\t]             {/* Espacios se ignoran */}
<<EOF>>                         {return 'EOF';}

/* COMENTARIOS */
[-][-].*                                 {/* IGNORE */}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]    {/* IGNORE */}

/* =================== PALABRAS RESERVADAS =================== */
"true"                          {   return 'ttrue';     }
"or"                            {   return 'o';         }
"and"                           {   return 'y';         }
"not"                           {   return 'no';        }
"false"                         {   return 'tfalse';    }
"int"                           {   return 'tinteger';  }
"boolean"                       {   return 'tboolean';  }
"double"                        {   return 'tdouble';   }
"varchar"                       {   return 'tvarchar';  }  
"date"                          {   return 'tdate';     }  

"declare"                       {   return 'tdeclare';  } 
"default"                       {   return 'tdefault';  } 
"set"                           {   return 'tset';      }

"create"                        {   return 'tcreate';   }
"table"                         {   return 'ttable';    }
"alter"                         {   return 'talter';    }
"add"                           {   return 'tadd';      }
"drop"                          {   return 'tdrop';     }
"column"                        {   return 'tcolumn';   }
"rename"                        {   return 'trename';   }
"to"                            {   return 'tto';       }

"insert"                        {   return 'tinsert';   }
"into"                          {   return 'tinto';     }
"values"                        {   return 'tvalues';   }

"select"                        {   return 'tselect';   }
"from"                          {   return 'tfrom';     }
"where"                         {   return 'twhere';    }
"as"                            {   return 'tas';       }

"update"                        {   return 'tupdate';   }

"truncate"                      {   return 'ttruncate'; }

"delete"                        {   return 'tdelete';   }

"cast"                          {   return 'tcast';     }
"begin"                         {   return 'tbegin';    }
"end"                           {   return 'tend';      }

"if"                            {   return 'tif';       }
"else"                          {   return 'telse';     }
"then"                          {   return 'tthen';     }

"case"                          {   return 'tcase';     }
"when"                          {   return 'twhen';     }

"while"                         {   return 'twhile';    }

"for"                           {   return 'tfor';      }
"in"                            {   return 'tin';       }

"break"                         {   return 'tbreak';    }
"continue"                      {   return 'tcontinue'; }

"function"                      {   return 'tfunction'; }
"return"                        {   return 'treturn';   }
"returns"                       {   return 'treturns';  }

"procedure"                     {   return 'tmetodo';}

"print"                         {   return 'tprint';}
"lower"                       {   return 'tlower';}
"upper"                       {   return 'tupper';}
"round"                       {   return 'tround';}     
"len"                         {   return 'tlen';}
"typeof"                      {   return 'ttypeof';}




/* =================== EXPRESIONES REGULARES ===================== */
[@]([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")*                                                  return 'id';
([\"][^\n\"]+[\"])|([\'][^\n\']+[\'])                                                                 { yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
([0-9][0-9][0-9][0-9])([-])([0-1][0-9])([-])([0-9][0-9])                                                return 'fecha';
[0-9]+"."[0-9]+                                                                                         return 'decimal';
[0-9]+                                                                                                  return 'entero';
([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")*                                                     return 'idt';

/* ======================== SIGNOS ======================= */


"+"                             {return 'suma';}
"-"                             {return 'resta';}
"*"                             {return 'multi';}
"/"                             {return 'division';}
"%"                             {return 'mood';}
"("                             {return 'parena';}
")"                             {return 'parenc';}
"."                             {return 'punto';}
"="                             {return 'igual';}
","                             {return 'coma';}
":"                             {return 'dospuntos';}
";"                             {return 'puntocoma';}
"!="                            {return 'diferente';}
"<="                            {return 'menorigual';}
">="                            {return 'mayorigual';}
">"                             {return 'mayor';}
"<"                             {return 'menor';}


.                           {
                                lista.add("Léxico", "Caracter Inesperado: " + yytext, yylloc.first_line, yylloc.first_column ) ;

                            };


/lex

/*Operaciones logicas*/
%right 'o'
%right 'y'
%right 'no'
%left 'diferente' 'igual' 
%left 'mayor' 'menor' 'menorigual' 'mayorigual' 

/*Operaciones numericas*/
%left 'suma' 'resta'
%left 'multi' 'division' 'mood'
%left 'negativo'


%start INICIO

%% 

INICIO
    : SENTENCIAS EOF
    {
         //Objeto de Salida
            var salida = {
                lerrores: lista,
                instrucciones: $1,
                lsimbolos: simbolos,
            }
            
            lista = new ListaErrores();
            simbolos = new ListaSimbolos();
            return salida;
    }
;

SENTENCIAS :    SENTENCIAS SENTENCIA
            {
                //Insertar a la lista de instrucciones
                $1.push($2); 
                //Retornar la lista de instrucciones
                $$=$1
            }
            |   SENTENCIA
            {
                $$ = [$1];
            }
;

SENTENCIA: CREATETABLE
        {
                $$ = $1;
        }
        | ALTERTABLE
        {
                $$ = $1;
        }
        | DROPTABLE
        {
                $$ = $1;
        }
        | INSERT
        {
                $$ = $1;
        }
        | SELECT
        {
                $$ = $1;
        }
        | UPDATE
        {
                $$ = $1;
        }
        | TRUNCATE
        {
                $$ = $1;
        }
        | DELETE
        {
                $$ = $1;
        }
        |BEGINEND
        {
                $$ = $1;
        }
        | error puntocoma
        {
                lista.add("Sintáctico", "Token Inesperado " + $1 , @1.first_line, @1.first_column);
        }
;

DVARIABLES : tdeclare LIDS puntocoma {$$ = $2;}
;
LIDS:   LIDS IDS    { 
                        $1.push($2); 
                        $$=$1;
                    }
|           IDS             { $$ = [$1]; }
;
IDS : id TIPO coma              {$$= INSTRUCCION.declararv($2, $1, null, this._$.first_line, this._$.first_column );}
|     id TIPO                   {$$= INSTRUCCION.declararv($2, $1, null, this._$.first_line, this._$.first_column );}
|     id TIPO  tdefault EXP     {$$= INSTRUCCION.declararv($2, $1, $4, this._$.first_line, this._$.first_column );}
;

TIPO : tinteger        {$$ = TIPO_DATO.INT;}
|      tboolean        {$$ = TIPO_DATO.BOOLEAN;}
|      tdate           {$$ = TIPO_DATO.DATE;}
|      tdouble         {$$ = TIPO_DATO.DOUBLE;}
|      tvarchar        {$$ = TIPO_DATO.VARCHAR;}
;

ASIGNARV : tset id igual EXP puntocoma {$$ = INSTRUCCION.asignarv($2, $4, this._$.first_line, this._$.first_column );}
;

CREATETABLE : tcreate ttable idt parena LCOLUMNAS parenc puntocoma {$$ = INSTRUCCION.createt($3, $5, this._$.first_line, this._$.first_column );}
;
LCOLUMNAS : LCOLUMNAS COLUMNAS {$$ = $1; 
                                $1.push($2);}
|           COLUMNAS            {$$ = [$1];}
;
COLUMNAS : idt TIPO coma     {$$ = INSTRUCCION.columna($1, $2, this._$.first_line, this._$.first_column );}
|          idt TIPO          {$$ = INSTRUCCION.columna($1, $2, this._$.first_line, this._$.first_column );}
;

ALTERTABLE : talter ttable idt tadd idt TIPO puntocoma    {$$ = INSTRUCCION.agregarc($3, $5,$6, this._$.first_line, this._$.first_column );}
|  talter ttable idt tdrop tcolumn idt puntocoma          {$$ = INSTRUCCION.eliminarc($3, $6, this._$.first_line, this._$.first_column );}
|  talter ttable idt trename tto idt puntocoma            {$$ = INSTRUCCION.renamet($3, $6, this._$.first_line, this._$.first_column );}
|  talter ttable idt trename tcolumn idt tto idt puntocoma{$$ = INSTRUCCION.renamec($3, $6, $8, this._$.first_line, this._$.first_column );}
;

DROPTABLE : tdrop ttable idt puntocoma {$$ = INSTRUCCION.dropt($3, this._$.first_line, this._$.first_column );}
;

INSERT : tinsert tinto idt parena LCOLUM parenc tvalues parena LCOLUM parenc puntocoma {$$ = INSTRUCCION.insert($3, $5, $9, this._$.first_line, this._$.first_column );}
;
LCOLUM : LCOLUM IDINSERT { 
                            $1.push($2);
                            $$ = $1; 
                            }
|        IDINSERT             {$$ = [$1];}
;
IDINSERT : idt coma {$$ = $1;}
|          idt      {$$ = $1;}
|          EXP coma {$$ = $1;}
|          EXP      {$$ = $1;}
;

SELECT : tselect LID tfrom idt puntocoma                {$$ = INSTRUCCION.selects($2, null ,$4,null, this._$.first_line, this._$.first_column );}
| tselect LID tas LID tfrom idt puntocoma               {$$ = INSTRUCCION.selects($2,$4, $6, null, this._$.first_line, this._$.first_column );}
| tselect LID tfrom idt twhere EXP puntocoma            {$$ = INSTRUCCION.selects($2,null, $4, $6, this._$.first_line, this._$.first_column );}
| tselect LID tas LID tfrom idt twhere EXP puntocoma    {$$ = INSTRUCCION.selects($2, $4, $6, $8, this._$.first_line, this._$.first_column );}
| tselect EXP puntocoma                                 {$$ = INSTRUCCION.selectva($2, $2, this._$.first_line, this._$.first_column );}
| tselect EXP tas idt puntocoma                         {$$ = INSTRUCCION.selectva($2, $4, this._$.first_line, this._$.first_column );}
;
LID : LID SCOL {
                            $1.push($2);
                            $$ = $1;
                            }
|        SCOL             {$$ = [$1];}
;
SCOL : idt coma {$$ = $1;}
|      idt      {$$ = $1;}
|      multi    {$$ = $1;}
;

UPDATE : tupdate idt tset LUPDATE twhere EXP puntocoma {$$ = INSTRUCCION.update($2, $4, $6, this._$.first_line, this._$.first_column );         }
;
LUPDATE : LUPDATE SUPDATE {
                            $1.push($2);
                            $$ = $1; 
                            }
|        SUPDATE             {$$ = [$1];}
;
SUPDATE : EXP coma {$$ = $1;}
|          EXP      {$$ = $1;}
;

TRUNCATE : ttruncate ttable idt puntocoma {$$ = INSTRUCCION.truncate($3, this._$.first_line, this._$.first_column );}
;

DELETE : tdelete tfrom idt twhere EXP puntocoma {$$ = INSTRUCCION.delete($3, $5, this._$.first_line, this._$.first_column );}
;

BEGINEND : tbegin INSTRUCCIONES tend puntocoma {$$ = INSTRUCCION.beginend($2, this._$.first_line, this._$.first_column );}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION {
                            $1.push($2);
                            $$ = $1;
                            }
|        INSTRUCCION             {$$ = [$1];}
;

INSTRUCCION : DVARIABLES
        {
                $$ = $1;
        }
        | ASIGNARV
        {
                $$ = $1;
        }
        | CREATETABLE
        {
                $$ = $1;
        }
        | ALTERTABLE
        {
                $$ = $1;
        }
        | DROPTABLE
        {
                $$ = $1;
        }
        | INSERT
        {
                $$ = $1;
        }
        | SELECT
        {
                $$ = $1;
        }
        | UPDATE
        {
                $$ = $1;
        }
        | TRUNCATE
        {
                $$ = $1;
        }
        | DELETE
        {
                $$ = $1;
        }
        | IF 
        {
                $$ = $1;
        }
        | CASE 
        {
                $$ = $1;
        }
        | WHILE 
        {
                $$ = $1;
        }
        | FOR 
        {
                $$ = $1;
        }
        | BREAK 
        {
                $$ = $1;
        }
        | CONTINUE 
        {
                $$ = $1;
        }
        | RETURN 
        {
                $$ = $1;
        }
        | FUNCION 
        {
                $$ = $1;
        }
        | METODO 
        {
                $$ = $1;
        }
        | LLAMADA 
        {
                $$ = $1;
        }
        | PRINT 
        {
                $$ = $1;
        }
        | BEGINEND
        {
                $$ = $1;
        }
        | error puntocoma
        {
                lista.add("Sintáctico", "Token Inesperado " + $1 , @1.first_line, @1.first_column);
        }
;

IF : tif EXP tthen INSTRUCCIONES tend tif puntocoma                     {$$ = INSTRUCCION.si($2, $4,null, this._$.first_line, this._$.first_column );}
|   tif EXP tthen INSTRUCCIONES telse INSTRUCCIONES tend tif puntocoma  {$$ = INSTRUCCION.si($2, $4, $6, this._$.first_line, this._$.first_column );}
;

CASE: tcase idt INSTRUCASE telse EXP tend puntocoma {$$ = INSTRUCCION.caso($2, $3, $5, this._$.first_line, this._$.first_column );}
|  tcase INSTRUCASE telse EXP tend puntocoma        {$$ = INSTRUCCION.caso(null, $2, $4, this._$.first_line, this._$.first_column );}
;
INSTRUCASE : INSTRUCASE INTCASE {
                            $1.push($2);
                            $$ = $1; 
                            }
|        INTCASE             {$$ = [$1];}
;
INTCASE : twhen EXP tthen EXP {$$ = INSTRUCCION.cuando($2, $4, this._$.first_line, this._$.first_column );}
;

WHILE : twhile EXP tbegin INSTRUCCIONES tend puntocoma {$$ = INSTRUCCION.mientras($2, $4, this._$.first_line, this._$.first_column );}
;

FOR : tfor EXP tin EXP punto punto EXP tbegin INSTRUCCIONES tend puntocoma {$$ = INSTRUCCION.para($2, $4, $7, $9, this._$.first_line, this._$.first_column );}
;

BREAK : tbreak puntocoma {$$ = INSTRUCCION.break(this._$.first_line, this._$.first_column );}
;

CONTINUE : tcontinue puntocoma {$$ = INSTRUCCION.continue(this._$.first_line, this._$.first_column );}
;

FUNCION : tcreate tfunction idt parena PARAMETOS parenc treturns TIPO tbegin INSTRUCCIONES tend puntocoma {$$ = INSTRUCCION.funcion($3, $5, $8, $10, this._$.first_line, this._$.first_column );}
;
PARAMETOS : PARAMETOS coma PARAMETRO {
                            $1.push($3);
                            $$ = $1;
                            }
|        PARAMETRO             {$$ = [$1];}
;
PARAMETRO : id TIPO {$$ = INSTRUCCION.parametro($1, $2, this._$.first_line, this._$.first_column );}
;
RETURN : treturn EXP puntocoma {$$ = INSTRUCCION.devolver($2, this._$.first_line, this._$.first_column );}
;

METODO : tcreate tmetodo idt PARAMETOS tas tbegin INSTRUCCIONES tend puntocoma  {$$ = INSTRUCCION.metodo($3, $4, $7, this._$.first_line, this._$.first_column );}
| tcreate tmetodo idt tas tbegin INSTRUCCIONES tend puntocoma                   {$$ = INSTRUCCION.metodo($3, null, $6, this._$.first_line, this._$.first_column );}
;

LLAMADA : idt parena LUPDATE parenc puntocoma {$$ = INSTRUCCION.llamada($1, $3, this._$.first_line, this._$.first_column );}
| idt parena parenc puntocoma                 {$$ = INSTRUCCION.llamada($1, null, this._$.first_line, this._$.first_column );}
;

LLAMADAS: idt parena LUPDATE parenc         {$$ = INSTRUCCION.llamadas($1, $3, this._$.first_line, this._$.first_column );}
| idt parena parenc                         {$$ = INSTRUCCION.llamadas($1, null, this._$.first_line, this._$.first_column );}
;

PRINT : tprint EXP puntocoma {$$ = INSTRUCCION.print($2, this._$.first_line, this._$.first_column );}
;

LOWER : tlower parena EXP parenc  {$$ = INSTRUCCION.lower($3, this._$.first_line, this._$.first_column );}
;

UPPER : tupper parena EXP parenc {$$ = INSTRUCCION.upper($3, this._$.first_line, this._$.first_column );}
;

ROUND : tround parena EXP coma EXP parenc {$$ = INSTRUCCION.round($3, $5, this._$.first_line, this._$.first_column );}
;

LEN : tlen parena EXP parenc {$$ = INSTRUCCION.len($3, this._$.first_line, this._$.first_column );}
;

TRUNCATES : ttruncate parena EXP coma EXP parenc {$$ = INSTRUCCION.truncates($3, $5, this._$.first_line, this._$.first_column );}
;

TYPEOF : ttypeof parena EXP parenc {$$ = INSTRUCCION.typeof($3, this._$.first_line, this._$.first_column );}
;



EXP :   EXP suma EXP            {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.SUMA, this._$.first_line, this._$.first_column);           }
    |   EXP resta EXP            {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.RESTA, this._$.first_line, this._$.first_column);          }
    |   EXP multi EXP            {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.MULTIPLICACION, this._$.first_line, this._$.first_column); }
    |   EXP division EXP            {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.DIVISION, this._$.first_line, this._$.first_column);       }
    |   EXP mood EXP            {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.MODULO, this._$.first_line, this._$.first_column);         }
    |   resta EXP %prec negativo {$$ = INSTRUCCION.operacion($2,null, TIPO_OPERACION.NEGATIVO, this._$.first_line, this._$.first_column);     }
    |   parena EXP parenc            {$$ = $2;                                                                                                    }
    |   EXP igual EXP          {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.IGUAL, this._$.first_line, this._$.first_column);          }
    |   EXP diferente  EXP          {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.DIFERENTE, this._$.first_line, this._$.first_column);      }
    |   EXP menor   EXP          {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.MENOR, this._$.first_line, this._$.first_column);          }  
    |   EXP mayor   EXP          {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.MAYOR, this._$.first_line, this._$.first_column);          }
    |   EXP menorigual  EXP          {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.MENORIGUAL, this._$.first_line, this._$.first_column);     }
    |   EXP mayorigual  EXP          {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.MAYORIGUAL, this._$.first_line, this._$.first_column);     }
    |   EXP y EXP             {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.AND, this._$.first_line, this._$.first_column);            }
    |   EXP o EXP            {$$ = INSTRUCCION.operacion($1,$3, TIPO_OPERACION.OR, this._$.first_line, this._$.first_column);             }
    |   no EXP                {$$ = INSTRUCCION.operacion($2,null, TIPO_OPERACION.NOT, this._$.first_line, this._$.first_column);            }
    |   id                     {$$ = INSTRUCCION.valor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line, this._$.first_column);         } 
    |   decimal                {$$ = INSTRUCCION.valor($1, TIPO_VALOR.DOUBLE, this._$.first_line, this._$.first_column);                } 
    |   entero                 {$$ = INSTRUCCION.valor($1, TIPO_VALOR.INT, this._$.first_line, this._$.first_column);                   }
    |   fecha                  {$$ = INSTRUCCION.valor($1, TIPO_VALOR.DATE, this._$.first_line, this._$.first_column);                  }
    |   cadena                 {$$ = INSTRUCCION.valor($1, TIPO_VALOR.VARCHAR, this._$.first_line, this._$.first_column);               }
    |   ttrue                  {$$ = INSTRUCCION.valor($1, TIPO_VALOR.BOOLEAN, this._$.first_line, this._$.first_column);               }
    |   tfalse                 {$$ = INSTRUCCION.valor($1, TIPO_VALOR.BOOLEAN, this._$.first_line, this._$.first_column);               }
    |   idt                    {$$ = INSTRUCCION.valor($1, TIPO_VALOR.IDCOLUM, this._$.first_line, this._$.first_column);                    }
    |   LOWER                  {$$ = $1;}
    |   UPPER                  {$$ = $1;}
    |   ROUND                  {$$ = $1;}
    |   LEN                    {$$ = $1;}
    |   TRUNCATES               {$$ = $1;}
    |   TYPEOF                 {$$ = $1;}
    |   LLAMADAS               {$$ = $1;}
;