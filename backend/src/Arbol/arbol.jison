%{
  
    const TIPO_DATO = require('../Tipos/TipoDato');   
    const INSTRUCCION = require('../Instrucciones/Instruccion');
    const TIPO_OPERACION = require('../Tipos/TipoOperacion');
    const TIPO_VALOR = require('../Tipos/TipoValor');
    const ListaErrores = require('../Errores/ListaErrores');
    const ListaSimbolos = require('../Simbolos/ListaSimbolos');

   
    var lista = new ListaErrores();
    var simbolos = new ListaSimbolos();
    
    const Nodo = require('./Nodo.js');

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
\"(?:[{cor1}|{cor2}]|["\\"]["bnrt/["\\"]]|[^"["\\"])*\"                        { yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
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

INICIO: SENTENCIAS EOF
    {
        
            let raiz = new Nodo("RAIZ", @1.first_line, @1.first_column,'"#86bafd"');
            raiz.hijos.push($1);
            return raiz;
    }
;

SENTENCIAS :    SENTENCIAS SENTENCIA
            {
                    
                    $$ = $1
                    $$.hijos.push($2)

            }
            |   SENTENCIA
            {

                $$ =new Nodo("SENTENCIAS", @1.first_line, @1.first_column,'"#86bafd"');
                $$.hijos.push($1)
            }
;

SENTENCIA: CREATETABLE
        {
            $$ =new Nodo("SENTENCIA", @1.first_line, @1.first_column,'"#86bafd"');
                $$.hijos.push($1)
        }
        | ALTERTABLE
        {
                $$ =new Nodo("SENTENCIA", @1.first_line, @1.first_column,'"#86bafd"');
                $$.hijos.push($1)
        }
        | DROPTABLE
        {
                $$ =new Nodo("SENTENCIA", @1.first_line, @1.first_column,'"#86bafd"');
                $$.hijos.push($1)
        }
        | INSERT
        {
                $$ =new Nodo("SENTENCIA", @1.first_line, @1.first_column,'"#86bafd"');
                $$.hijos.push($1)
        }
        | SELECT
        {
                $$ =new Nodo("SENTENCIA", @1.first_line, @1.first_column,'"#86bafd"');
                $$.hijos.push($1)
        }
        | UPDATE
        {
                $$ =new Nodo("SENTENCIA", @1.first_line, @1.first_column,'"#86bafd"');
                $$.hijos.push($1)
        }
        | TRUNCATE
        {
                $$ =new Nodo("SENTENCIA", @1.first_line, @1.first_column,'"#86bafd"');
                $$.hijos.push($1)
        }
        | DELETE
        {
                $$ =new Nodo("SENTENCIA", @1.first_line, @1.first_column,'"#86bafd"');
                $$.hijos.push($1)
        }
        |BEGINEND 
        {
                $$ =new Nodo("SENTENCIA", @1.first_line, @1.first_column,'"#86bafd"');
                $$.hijos.push($1)
        }
        | error puntocoma
        {
                lista.add("Sintáctico", "Token Inesperado " + $1 , @1.first_line, @1.first_column);
        }
;

DVARIABLES : tdeclare LIDS puntocoma {$$ =new Nodo ("DECLARACIONES", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($2)}
;
LIDS:   LIDS IDS    { 
                        $$=$1;
                        $$.hijos.push($2);
                    }
|           IDS             { $$ = new Nodo("IDS", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1) }
;
IDS : EXP TIPO coma              {$$ = new Nodo ("DECLARACION", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)}
|     EXP TIPO                   {$$ =new Nodo ("DECLARACION", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)}
|     EXP TIPO  tdefault EXP     {$$ =new Nodo ("DECLARACION", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)

                                $$.hijos.push($4)}
;

TIPO : tinteger        {$$ = new Nodo("TIPO INT", @1.first_line, @1.first_column,'"#86bafd"');}
|      tboolean        {$$ = new Nodo("TIPO BOOLEAN", @1.first_line, @1.first_column,'"#86bafd"');}
|      tdate           {$$ = new Nodo("TIPO DATE", @1.first_line, @1.first_column,'"#86bafd"');}
|      tdouble         {$$ = new Nodo("TIPO DOUBLE", @1.first_line, @1.first_column,'"#86bafd"');}
|      tvarchar        {$$ = new Nodo("TIPO VARCHAR", @1.first_line, @1.first_column,'"#86bafd"');}
;

ASIGNARV : tset EXP igual EXP puntocoma {$$ =new Nodo("ASIGNAR V", @1.first_line, @1.first_column,'"#86bafd"');
                                        $$.hijos.push($2)
                                        $$.hijos.push($4)}
;

CREATETABLE : tcreate ttable idt parena LIDS parenc puntocoma {$$ =new Nodo("CREATE TABLE", @1.first_line, @1.first_column,'"#86bafd"');
                                                                $$.hijos.push($5)}
;
LCOLUMNAS : LCOLUMNAS COLUMNAS {$$ = $1; 
                                $1.push($2);}
|           COLUMNAS            {$$ = [$1];}
;
COLUMNAS : idt TIPO coma     {$$ = INSTRUCCION.columna($1, $2, this._$.first_line, this._$.first_column );}
|          idt TIPO          {$$ = INSTRUCCION.columna($1, $2, this._$.first_line, this._$.first_column );}
;

ALTERTABLE : talter ttable idt tadd idt TIPO puntocoma    {$$ =new Nodo("ALTERTABLE", @1.first_line, @1.first_column,'"#86bafd"');}
|  talter ttable idt tdrop tcolumn idt puntocoma          {$$ =new Nodo("ALTERTABLE", @1.first_line, @1.first_column,'"#86bafd"');}
|  talter ttable idt trename tto idt puntocoma            {$$ =new Nodo("ALTERTABLE", @1.first_line, @1.first_column,'"#86bafd"');}
|  talter ttable idt trename tcolumn idt tto idt puntocoma{$$ =new Nodo("ALTERTABLE", @1.first_line, @1.first_column,'"#86bafd"');}
;

DROPTABLE : tdrop ttable idt puntocoma {$$ =new Nodo("DROPTABLE", @1.first_line, @1.first_column,'"#86bafd"');}
;

INSERT : tinsert tinto idt parena LCOLUM parenc tvalues parena LCOLUM parenc puntocoma {$$ =new Nodo("INSERTTABLE", @1.first_line, @1.first_column,'"#86bafd"');}
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

SELECT : tselect LID tfrom idt puntocoma                {$$ =new Nodo("SELECT TABLE", @1.first_line, @1.first_column,'"#86bafd"');}
| tselect LID tas LID tfrom idt puntocoma               {$$ =new Nodo("SELECT TABLE", @1.first_line, @1.first_column,'"#86bafd"');}
| tselect LID tfrom idt twhere EXP puntocoma            {$$ =new Nodo("SELECT TABLE", @1.first_line, @1.first_column,'"#86bafd"');
                                                            $$.hijos.push($6)}
| tselect LID tas LID tfrom idt twhere EXP puntocoma    {$$ =new Nodo("SELECT TABLE", @1.first_line, @1.first_column,'"#86bafd"');
                                                            $$.hijos.push($8)}
| tselect EXP puntocoma                                 {$$ =new Nodo("SELECT TABLE", @1.first_line, @1.first_column,'"#86bafd"');
                                                            $$.hijos.push($2)}
| tselect EXP tas idt puntocoma                         {$$ =new Nodo("SELECT TABLE", @1.first_line, @1.first_column,'"#86bafd"');
                                                            $$.hijos.push($2)}
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

UPDATE : tupdate idt tset LUPDATE twhere EXP puntocoma {$$ =new Nodo("UPDATE TABLE", @1.first_line, @1.first_column,'"#86bafd"');}     
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

TRUNCATE : ttruncate ttable idt puntocoma {$$ =new Nodo("TRUNCATE TABLE", @1.first_line, @1.first_column,'"#86bafd"');}
;

DELETE : tdelete tfrom idt twhere EXP puntocoma {$$ =new Nodo("DELETE TABLE", @1.first_line, @1.first_column,'"#86bafd"');}
;

BEGINEND : tbegin INSTRUCCIONES tend puntocoma {$$ =new Nodo("BEGINEND", @1.first_line, @1.first_column,'"#86bafd"');
                                                $$.hijos.push($2)}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION {
                            $$ = $1;
                            $$.hijos.push($2);
                            }
|        INSTRUCCION             {$$ = new Nodo("INSTRUCCIONES", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)}
;

INSTRUCCION : DVARIABLES
        {
            $$ =new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
                    $$.hijos.push($1)

        }
        | ASIGNARV
        {
             $$ =new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
               $$.hijos.push($1)  
          
        }
        | CREATETABLE
        {
            $$ =new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | ALTERTABLE
        {
             $$ =new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | DROPTABLE
        {
             $$ =new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | INSERT
        {
             $$ =new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | SELECT
        {
             $$ =new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | UPDATE
        {
              $$ = new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | TRUNCATE
        {
            $$ = new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | DELETE
        {
             $$ = new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | IF 
        {
             $$ =new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | CASE 
        {
              $$ =  new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | WHILE 
        {
            $$ =  new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | FOR 
        {
            $$ =  new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | BREAK 
        {
            $$ =  new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | CONTINUE 
        {
             $$ =  new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | RETURN 
        {
              $$ = new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | FUNCION 
        {
              $$ = new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | METODO 
        {
             $$ =  new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | LLAMADA 
        {
             $$ =new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | PRINT 
        {
            $$ =new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | BEGINEND 
        {
            $$ =new Nodo("INSTRUCCION", @1.first_line, @1.first_column,'"#86bafd"');
             $$.hijos.push($1)
        }
        | error puntocoma
        {
                lista.add("Sintáctico", "Token Inesperado " + $1 , @1.first_line, @1.first_column);
        }
;

IF : tif EXP tthen INSTRUCCIONES tend tif puntocoma                     {$$ = new Nodo("IF", @1.first_line, @1.first_column,'"#86bafd"');
                                                                            $$.hijos.push($4)}
|   tif EXP tthen INSTRUCCIONES telse INSTRUCCIONES tend tif puntocoma  {$$ = new Nodo("IF", @1.first_line, @1.first_column,'"#86bafd"');
                                                                            $$.hijos.push($4)
                                                                            $$.hijos.push($6)}
;

CASE: tcase idt INSTRUCASE telse EXP tend puntocoma {$$ = new Nodo("CASE", @1.first_line, @1.first_column,'"#86bafd"');
                                                        $$.hijos.push($3)
                                                        $$.hijos.push($5)}
|  tcase INSTRUCASE telse EXP tend puntocoma        {$$ = new Nodo("CASE", @1.first_line, @1.first_column,'"#86bafd"');
                                                        $$.hijos.push($2)
                                                        $$.hijos.push($4)}
;
INSTRUCASE : INSTRUCASE INTCASE {
                            $$ = $1;
                            $$.hijos.push($2);
                            }
|        INTCASE             {$$= new Nodo("INSTRUCCION CASE", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)}
;
INTCASE : twhen EXP tthen EXP {$$ = new Nodo("Comparacion", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($2)
                                $$.hijos.push($4)}
;

WHILE : twhile EXP tbegin INSTRUCCIONES tend puntocoma {$$ =new Nodo("WHILE", @1.first_line, @1.first_column,'"#86bafd"');
                                                                            $$.hijos.push($4)}
;

FOR : tfor EXP tin EXP punto punto EXP tbegin INSTRUCCIONES tend puntocoma {$$ =new Nodo("FOR", @1.first_line, @1.first_column,'"#86bafd"');
                                                                            $$.hijos.push($9)}

;

BREAK : tbreak puntocoma {$$= new Nodo("BREAK", @1.first_line, @1.first_column,'"#86bafd"');}
;

CONTINUE : tcontinue puntocoma {$$= new Nodo("CONTINUE", @1.first_line, @1.first_column,'"#86bafd"');}
;

FUNCION : tcreate tfunction idt parena PARAMETOS parenc treturns TIPO tbegin INSTRUCCIONES tend puntocoma {$$ = new Nodo("FUNCION", @1.first_line, @1.first_column,'"#86bafd"');
                                                                                                            $$.hijos.push($5)
                                                                                                            $$.hijos.push($10)}
;
PARAMETOS : PARAMETOS coma PARAMETRO {
                            $$ = $1;
                            $$.hijos.push($3);
                            }
|        PARAMETRO             {$$ = new Nodo("PARAMETROS", @1.first_line, @1.first_column,'"#86bafd"');
                           
                            $$.hijos.push($1)
                                }
;
PARAMETRO : EXP TIPO {$$ = new Nodo("PARAMETRO", @1.first_line, @1.first_column,'"#86bafd"');
                       $$.hijos.push($2)
                       $$.hijos.push($1)
                       }
;
RETURN : treturn EXP puntocoma {$$ = new Nodo("RETURN", @1.first_line, @1.first_column,'"#86bafd"');
                                 $$.hijos.push($2)}
;

METODO : tcreate tmetodo idt PARAMETOS tas tbegin INSTRUCCIONES tend puntocoma  {$$ = new Nodo("METODO", @1.first_line, @1.first_column,'"#86bafd"');
                                                                                 $$.hijos.push($4)
                                                                                $$.hijos.push($7)}
| tcreate tmetodo idt tas tbegin INSTRUCCIONES tend puntocoma                   {$$ = new Nodo("METODO", @1.first_line, @1.first_column,'"#86bafd"');
                                                                                 $$.hijos.push($6)}      
;

LLAMADA : idt parena LUPDATE parenc puntocoma {$$ = new Nodo("LLAMADA", @1.first_line, @1.first_column,'"#86bafd"');}
| idt parena parenc puntocoma                 {$$ = new Nodo("LLAMADA", @1.first_line, @1.first_column,'"#86bafd"');}
;

LLAMADAS: idt parena LUPDATE parenc         {$$ = new Nodo("LLAMADA", @1.first_line, @1.first_column,'"#86bafd"');}
| idt parena parenc                         {$$ = new Nodo("LLAMADA", @1.first_line, @1.first_column,'"#86bafd"');}
;

PRINT : tprint EXP puntocoma {$$ = new Nodo("PRINT", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($2)}
;

LOWER : tlower parena EXP parenc  {$$ = new Nodo("LOWEL", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($3)}
;

UPPER : tupper parena EXP parenc {$$ = new Nodo("UPPER", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($3)}
                           
;

ROUND : tround parena EXP coma EXP parenc {$$ = new Nodo("ROUND", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($3)
                                $$.hijos.push($5)}
;

LEN : tlen parena EXP parenc {$$ = new Nodo("LEN", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($3)}
;

TRUNCATES : ttruncate parena EXP coma EXP parenc {$$ = new Nodo("TRUNCATE", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($3)
                                $$.hijos.push($5)}
;

TYPEOF : ttypeof parena EXP parenc {$$ = new Nodo("TYPEOF", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($3)}
;



EXP :   EXP suma EXP            {$$ = new Nodo("+", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3)  }
    |   EXP resta EXP            {$$ = new Nodo("-", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3)     }
    |   EXP multi EXP            {$$ = new Nodo("*", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3) }
    |   EXP division EXP            {$$ = new Nodo("/", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3)    }
    |   EXP mood EXP            {$$ = new Nodo("%", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3)}
    |   resta EXP %prec negativo {$$ = new Nodo("negativo", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($2)  }
    |   parena EXP parenc            {$$ = new Nodo("(E)", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($2) }
    |   EXP igual EXP          {$$ = new Nodo("=", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3)   }
    |   EXP diferente  EXP          {$$ != new Nodo("!=", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3) }
    |   EXP menor   EXP          {$$ = new Nodo("<", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3)  }  
    |   EXP mayor   EXP          {$$ = new Nodo(">", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3) }
    |   EXP menorigual  EXP          {$$ = new Nodo("<=", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3)     }
    |   EXP mayorigual  EXP          {$$ = new Nodo(">=", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3)   }
    |   EXP y EXP             {$$ = new Nodo("AND", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3)      }
    |   EXP o EXP            {$$ = new Nodo("OR", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)
                                $$.hijos.push($3) }
    |   no EXP                {  $$ = new Nodo("NOT", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1)        }
    |   id                     {$$ = new Nodo($1, @1.first_line, @1.first_column,'"#86bafd"');  } 
    |   decimal                {$$ = new Nodo($1, @1.first_line, @1.first_column,'"#86bafd"');  } 
    |   entero                 {$$ = new Nodo($1, @1.first_line, @1.first_column,'"#86bafd"');  }
    |   fecha                  {$$ = new Nodo($1, @1.first_line, @1.first_column,'"#86bafd"');  }
    |   cadena                 {$$ = new Nodo($1, @1.first_line, @1.first_column,'"#86bafd"');  }
    |   ttrue                  {$$ = new Nodo($1, @1.first_line, @1.first_column,'"#86bafd"');  }
    |   tfalse                 {$$ = new Nodo($1, @1.first_line, @1.first_column,'"#86bafd"'); }
    |   idt                    {$$ = new Nodo($1, @1.first_line, @1.first_column,'"#86bafd"'); }
    |   LOWER                  {$$ = new Nodo("EXP", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1) }
    |   UPPER                  {$$ = new Nodo("EXP", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1) }
    |   ROUND                  {$$ = new Nodo("EXP", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1) }
    |   LEN                    {$$ = new Nodo("EXP", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1) }
    |   TRUNCATES               { $$ = new Nodo("EXP", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1) }
    |   TYPEOF                 { $$ = new Nodo("EXP", @1.first_line, @1.first_column,'"#86bafd"');
                                 $$.hijos.push($1) }
    |   LLAMADAS               { $$ = new Nodo("EXP", @1.first_line, @1.first_column,'"#86bafd"');
                                $$.hijos.push($1) }
;

//hacer lo de sentencias en las demas