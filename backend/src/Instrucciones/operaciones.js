const TIPO_VALOR = require('../Tipos/TipoValor');
const TIPO_OPERACION = require('../Tipos/TipoOperacion');
const TIPO_DATO = require('../Tipos/TipoDato');
const TIPO_INSTRUCCION = require('../Tipos/TipoInstruccion');

function Operaciones(expresion, entorno, errores, simbolo, baseDatos){
    //console.log("---------Operaciones---------\n",expresion,"\n-----------------")
    if(expresion.tipo === TIPO_VALOR.INT || expresion.tipo === TIPO_VALOR.DOUBLE || 
        expresion.tipo === TIPO_VALOR.VARCHAR || expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        expresion.tipo === TIPO_VALOR.BOOLEAN || expresion.tipo === TIPO_VALOR.DATE || expresion.tipo === TIPO_VALOR.IDCOLUM){
            return Valores(expresion, entorno, errores)
    }
        //aritmeticas
    else if(expresion.tipo === TIPO_OPERACION.SUMA){
        return suma(expresion.izquierda, expresion.derecha, entorno, errores,simbolo)
    }else if(expresion.tipo === TIPO_OPERACION.RESTA){
        return resta(expresion.izquierda, expresion.derecha, entorno, errores,simbolo)
    }else if(expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return multiplicacion(expresion.izquierda, expresion.derecha, entorno, errores,simbolo)
    }else if(expresion.tipo === TIPO_OPERACION.DIVISION){
        return division(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }else if(expresion.tipo === TIPO_OPERACION.POTENCIA){
        return potencia(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }else if(expresion.tipo === TIPO_OPERACION.MODULO){
        return modulo(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }else if(expresion.tipo === TIPO_OPERACION.NEGATIVO){
        return unario(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }

    else if(expresion.tipo === TIPO_OPERACION.MAYOR){
        return mayorque(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }else if(expresion.tipo === TIPO_OPERACION.MENOR){
        return menorque(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }else if(expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return mayorigual(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }else if(expresion.tipo === TIPO_OPERACION.MENORIGUAL){
        return menorigual(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }else if (expresion.tipo === TIPO_OPERACION.IGUAL){
        return igualigual(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }else if (expresion.tipo === TIPO_OPERACION.DIFERENTE){
        return diferente(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }
}

function Valores(expresion, entorno, errores, baseDatos){
    if(expresion.tipo === TIPO_VALOR.INT){
        return {
            valor: Number(expresion.valor),
            tipo: TIPO_DATO.INT,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }
    else if(expresion.tipo === TIPO_VALOR.DOUBLE){
        return {
            valor: Number(expresion.valor),
            tipo: TIPO_DATO.DOUBLE,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }
    else if(expresion.tipo === TIPO_VALOR.BOOLEAN){
        return {
            valor: expresion.valor.toLowerCase() ==='false' ? false: true,
            tipo: TIPO_DATO.BOOLEAN,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }
    else if(expresion.tipo === TIPO_VALOR.VARCHAR){
        return {
            valor: expresion.valor.substring(0, expresion.valor.length),
            tipo: TIPO_DATO.VARCHAR,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }
    else if(expresion.tipo === TIPO_VALOR.DATE){
        enviar =  new Date(expresion.valor)
        return {
            valor: enviar.toDateString(),
            tipo: TIPO_DATO.DATE,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }else if (expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        //console.log("--------Identificador---------",expresion)
        var valor = entorno.getVariable(expresion.valor)
        //console.log("--------Valor---------",valor)
        return {
            valor: valor.valor,
            tipo: valor.tipo,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }

}

module.exports = Operaciones;