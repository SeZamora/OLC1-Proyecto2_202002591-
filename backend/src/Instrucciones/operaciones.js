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
        return igual(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }else if (expresion.tipo === TIPO_OPERACION.DIFERENTE){
        return diferente(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }

    else if (expresion.tipo === TIPO_OPERACION.AND){
        return and(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }else if (expresion.tipo === TIPO_OPERACION.OR){
        return or(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
    }else if (expresion.tipo === TIPO_OPERACION.NOT){
        return not(expresion.izquierda, expresion.derecha, entorno, errores, simbolo)
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
            valor: expresion.valor,
            tipo: TIPO_DATO.DATE,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }else if (expresion.tipo === TIPO_VALOR.IDCOLUM){
        //console.log("--------Identificador---------",expresion)
        var enviar = "row."+(expresion.valor)
        //console.log("--------Valor---------",valor)
        return {
            valor: enviar,
            tipo: expresion.tipo,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }

}


function mayorque(izquierda, derecha, entorno, errores, baseDatos){

    let izquierda_ = Operaciones(izquierda, entorno, errores, baseDatos);
    let derecha_ = Operaciones(derecha, entorno, errores, baseDatos);
    if (izquierda_.tipo == TIPO_DATO.VARCHAR){
        izquierda_.valor = "'" +izquierda_.valor +"'"
    }
    if (derecha_.tipo == TIPO_DATO.VARCHAR){
        derecha_.valor = "'" +derecha_.valor +"'"
    }

    return (izquierda_.valor +" > " +derecha_.valor);
}

function menorque(izquierda, derecha, entorno, errores, baseDatos){

    let izquierda_ = Operaciones(izquierda, entorno, errores, baseDatos);
    let derecha_ = Operaciones(derecha, entorno, errores, baseDatos);

    if (izquierda_.tipo == TIPO_DATO.VARCHAR){
        izquierda_.valor = "'" +izquierda_.valor +"'"
    }
    if (derecha_.tipo == TIPO_DATO.VARCHAR){
        derecha_.valor = "'" +derecha_.valor +"'"
    }

    return (izquierda_.valor +" < " +derecha_.valor);
}

function mayorigual(izquierda, derecha, entorno, errores, baseDatos){
    
    let izquierda_ = Operaciones(izquierda, entorno, errores, baseDatos);
    let derecha_ = Operaciones(derecha, entorno, errores, baseDatos);

    if (izquierda_.tipo == TIPO_DATO.VARCHAR){
        izquierda_.valor = "'" +izquierda_.valor +"'"
    }
    if (derecha_.tipo == TIPO_DATO.VARCHAR){
        derecha_.valor = "'" +derecha_.valor +"'"
    }

    return (izquierda_.valor +" >= " +derecha_.valor);    
}

function menorigual(izquierda, derecha, entorno, errores, baseDatos){

    let izquierda_ = Operaciones(izquierda, entorno, errores, baseDatos);
    let derecha_ = Operaciones(derecha, entorno, errores, baseDatos);

    if (izquierda_.tipo == TIPO_DATO.VARCHAR){
        izquierda_.valor = "'" +izquierda_.valor +"'"
    }
    if (derecha_.tipo == TIPO_DATO.VARCHAR){
        derecha_.valor = "'" +derecha_.valor +"'"
    }

    return (izquierda_.valor +" <= " +derecha_.valor);    
}

function igual(izquierda, derecha, entorno, errores, baseDatos){
    
    let izquierda_ = Operaciones(izquierda, entorno, errores, baseDatos);
    let derecha_ = Operaciones(derecha, entorno, errores, baseDatos);

    if (izquierda_.tipo == TIPO_DATO.VARCHAR){
        izquierda_.valor = "'" +izquierda_.valor +"'"
    }
    if (derecha_.tipo == TIPO_DATO.VARCHAR){
        derecha_.valor = "'" +derecha_.valor +"'"
    }

    return (izquierda_.valor +" === " +derecha_.valor);    
}

function diferente(izquierda, derecha, entorno, errores, baseDatos){
    
    let izquierda_ = Operaciones(izquierda, entorno, errores, baseDatos);
    let derecha_ = Operaciones(derecha, entorno, errores, baseDatos);

    if (izquierda_.tipo == TIPO_DATO.VARCHAR){
        izquierda_.valor = "'" +izquierda_.valor +"'"
    }
    if (derecha_.tipo == TIPO_DATO.VARCHAR){
        derecha_.valor = "'" +derecha_.valor +"'"
    }

    return (izquierda_.valor +" !== " +derecha_.valor);    
}

function and(izquierda, derecha, entorno, errores, baseDatos){

    let izquierda_ = Operaciones(izquierda, entorno, errores, baseDatos);
    let derecha_ = Operaciones(derecha, entorno, errores, baseDatos);

    if (izquierda_.tipo == TIPO_DATO.VARCHAR){
        izquierda_.valor = "'" +izquierda_.valor +"'"
    }
    if (derecha_.tipo == TIPO_DATO.VARCHAR){
        derecha_.valor = "'" +derecha_.valor +"'"
    }

    return (izquierda_ +" && " +derecha_);    
}

function or(izquierda, derecha, entorno, errores, baseDatos){
        
    let izquierda_ = Operaciones(izquierda, entorno, errores, baseDatos);
    let derecha_ = Operaciones(derecha, entorno, errores, baseDatos);

    if (izquierda_.tipo == TIPO_DATO.VARCHAR){
        izquierda_.valor = "'" +izquierda_.valor +"'"
    }
    if (derecha_.tipo == TIPO_DATO.VARCHAR){
        derecha_.valor = "'" +derecha_.valor +"'"
    }

    return (izquierda_ +" || " +derecha_);    
}

function not(izquierda, derecha, entorno, errores, baseDatos){         
   let derecha_ = Operaciones(derecha, entorno, errores, baseDatos);

   if (izquierda_.tipo == TIPO_DATO.VARCHAR){
        izquierda_.valor = "'" +izquierda_.valor +"'"
    }
    if (derecha_.tipo == TIPO_DATO.VARCHAR){
        derecha_.valor = "'" +derecha_.valor +"'"
    }

   return ("!" +derecha_);    
}
module.exports = Operaciones;