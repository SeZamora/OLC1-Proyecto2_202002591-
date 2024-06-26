//* Constructor de Instrucciones

const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion")


                      
const Instruccion = {
    declararv: function(_tipodato, id, _valor, _linea, _columna){
        return {
            tipodato: _tipodato,           
            id: id,                   
            valor: _valor,                    
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.DECLARACIONV
        }
    },
    declarev: function(_variables, _linea, _columna){
        return {
            variables: _variables,            
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.DECLAREV
        }
    },
    valor: function(_valor, _tipo, _linea, _columna){
        return{
            valor: _valor,
            tipo: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    operacion: function(_izquierda, _derecha, _operador, _linea, _columna){
        return {
            izquierda: _izquierda,
            derecha: _derecha,
            tipo: _operador,
            linea: _linea,
            columna: _columna
        }
    },
    asignarv: function(_id, _expresion, _linea, _columna){
        return {
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.ASIGNACIONV
        }
    },
    createt : function(_id, _columnas, _linea, _columna){
        return {
            id: _id,
            columnas: _columnas,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.CREATET
        }
    },
    columna: function(_id,_tipo, _linea, _columna){
        return {
            id: _id,
            tipodato: _tipo,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.COLUMNA
        }
    },
    agregarc : function(_idtabla, _idcolumna, _tipocolumna, _linea, _columna){
        return {
            idtabla: _idtabla,
            idcolumna: _idcolumna,
            tipocolumna: _tipocolumna,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.AGREGARC
        }
    },
    eliminarc : function(_idtabla, _idcolumna, _linea, _columna){
        return {
            idtabla: _idtabla,
            idcolumna: _idcolumna,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.ELIMINARC
        }
    },
    renamet : function(_idtabla, _idnuevo, _linea, _columna){
        return {
            idtabla: _idtabla,
            idnuevo: _idnuevo,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.RENAMET
        }
    },
    renamec : function(_idtabla, _idcolumna, _idnuevo, _linea, _columna){
        return {
            idtabla: _idtabla,
            idcolumna: _idcolumna,
            idnuevo: _idnuevo,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.RENAMEC
        }
    },
    dropt : function(_idtabla, _linea, _columna){
        return {
            idtabla: _idtabla,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.ELIMINART
        }
    },
    insert : function(_idtabla, _columnas ,_valores, _linea, _columna){
        return {
            idtabla: _idtabla,
            columnas: _columnas,
            valores: _valores,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.INSERT
        }
    },
    selects : function(_columnas,_as ,_tabla, _where, _linea, _columna){
        return {
            columnas: _columnas,
            as: _as,
            idtabla: _tabla,
            where: _where,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.SELECTS
        }
    },
    selectva : function(_condicion,_titulo, _linea, _columna){
        return {
            titulo: _titulo,
            condicion: _condicion,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.SELECTV
        }
    },
    update : function(_idtabla, _valores, _where, _linea, _columna){
        return {
            idtabla: _idtabla,
            valores: _valores,
            where: _where,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.UPDATE
        }
    },
    truncate : function(_idtabla, _linea, _columna){
        return {
            idtabla: _idtabla,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.TRUNCATE
        }
    },
    delete: function(_idtabla, _where, _linea, _columna){
        return {
            idtabla: _idtabla,
            where: _where,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.DELETE
        }
    },
    beginend : function(_instrucciones, _linea, _columna){
        return {
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.BEGINEND
        }
    },
    si : function(_condicion, _instrucciones, _else,_linea, _columna){
        return {
            condicion: _condicion,
            instrucciones: _instrucciones,
            else: _else,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.SI
        }
    },
    caso: function(_id, _condiciones, _else, _linea, _columna){
        return {
            id: _id,
            condiciones: _condiciones,
            else: _else,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.CASO
        }
    },

    cuando: function(_condicion, _instrucciones, _linea, _columna){
        return {
            condicion: _condicion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.CUANDO
        }
    },
    mientras : function(_condicion, _instrucciones, _linea, _columna){
        return {
            condicion: _condicion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.MIENTRAS
        }
    },
    para : function(_variable, _inicio, _fin, _instrucciones, _linea, _columna){
        return {
            variable: _variable,
            inicio: _inicio,
            fin: _fin,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.PARA
        }
       
    },
    break : function(_linea, _columna){
        return {
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.BREAK
        }
    },
    continue : function(_linea, _columna){
        return {
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.CONTINUE
        }
    }, 
    funcion: function(_id, _parametros,_tiposalida, _instrucciones, _linea, _columna){
        return {
            id: _id,
            parametros: _parametros,
            instrucciones: _instrucciones,
            tiposalida: _tiposalida,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.FUNCION
        }
    },
    parametro : function(_id, _tipodato, _linea, _columna){
        return {
            id: _id,
            tipodato: _tipodato,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.PARAMETRO
        }
    },
    devolver : function(_valor, _linea, _columna){
        return {
            valor: _valor,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.DEVOLVER
        }
    },
    metodo: function(_id, _parametros, _linea, _columna){
        return {
            id: _id,
            parametros: _parametros,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.METODO
        }
    },
    llamada : function(_id, _parametros, _linea, _columna){
        return {
            id: _id,
            parametros: _parametros,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.LLAMADA
        }
    },
    print : function(_valor, _linea, _columna){
        return {
            valor: _valor,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.PRINT
        }
    },
    lower : function(_valor, _linea, _columna){
        return {
            valor: _valor,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.LOWER
        }
    },
    upper : function(_valor, _linea, _columna){
        return {
            valor: _valor,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.UPPER
        }
    },
    round: function(_decimal, _entero, _linea, _columna){
        return {
            decimal: _decimal,
            entero: _entero,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.ROUND
        }
    },
    len : function(_valor, _linea, _columna){
        return {
            valor: _valor,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.LEN
        }
    },
    truncates: function(_decimal, _entero, _linea, _columna){
        return {
            decimal: _decimal,
            entero: _entero,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.TRUNCATES
        }
    },
    typeof : function(_valor, _linea, _columna){
        return {
            valor: _valor,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.TYPEOF
        }
    },
    llamadas: function(_id, _parametros, _linea, _columna){
        return {
            id: _id,
            parametros: _parametros,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.LLAMADAS
        }
    },
    cast : function(_valor, _tipodato, _linea, _columna){
        return {
            valor: _valor,
            tipodato: _tipodato,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.CAST
        }
    }




}

module.exports = Instruccion