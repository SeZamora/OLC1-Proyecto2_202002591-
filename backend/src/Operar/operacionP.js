const TIPO_VALOR = require('../Tipos/TipoValor');
const TIPO_OPERACION = require('../Tipos/TipoOperacion');
const TIPO_DATO = require('../Tipos/TipoDato');
const TIPO_INSTRUCCION = require('../Tipos/TipoInstruccion');
const Tipos = require('./Tipos')

function OperacionP(expresion, entorno, errores, simbolo, baseDatos){
    //console.log("---------OperacionP---------\n",expresion,"\n-----------------")
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
    
        return {
            valor: new Date(expresion.valor),
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
    }else if (expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        let expre = entorno.getSimbolo(expresion.valor)
        return{
            valor: expre.valor,
            tipo: expre.tipo,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }

}


function mayorque(izquierda, derecha, entorno, errores, baseDatos){

    let izquierda_ = OperacionP(izquierda, entorno, errores, baseDatos);
    let derecha_ = OperacionP(derecha, entorno, errores, baseDatos);
    let resultado = false

    if(izquierda_.valor > derecha_.valor){
        resultado = true
    }
    return {
        valor: resultado,
        tipo: TIPO_DATO.BOOLEAN,
        linea: izquierda.linea,
        columna: izquierda.columna
    }
}

function menorque(izquierda, derecha, entorno, errores, baseDatos){

    let izquierda_ = OperacionP(izquierda, entorno, errores, baseDatos);
    let derecha_ = OperacionP(derecha, entorno, errores, baseDatos);
    let resultado = false

    if(izquierda_.valor < derecha_.valor){
        resultado = true
    }
    return {
        valor: resultado,
        tipo: TIPO_DATO.BOOLEAN,
        linea: izquierda.linea,
        columna: izquierda.columna
    }
}

function mayorigual(izquierda, derecha, entorno, errores, baseDatos){
    
    let izquierda_ = OperacionP(izquierda, entorno, errores, baseDatos);
    let derecha_ = OperacionP(derecha, entorno, errores, baseDatos);
    let resultado = false

    if(izquierda_.valor >= derecha_.valor){
        resultado = true
    }
    return {
        valor: resultado,
        tipo: TIPO_DATO.BOOLEAN,
        linea: izquierda.linea,
        columna: izquierda.columna
    }    
}

function menorigual(izquierda, derecha, entorno, errores, baseDatos){

    let izquierda_ = OperacionP(izquierda, entorno, errores, baseDatos);
    let derecha_ = OperacionP(derecha, entorno, errores, baseDatos);
    let resultado = false

    if(izquierda_.valor <= derecha_.valor){
        resultado = true
    }
    return {
        valor: resultado,
        tipo: TIPO_DATO.BOOLEAN,
        linea: izquierda.linea,
        columna: izquierda.columna
    }   
}

function igual(izquierda, derecha, entorno, errores, baseDatos){
    
    let izquierda_ = OperacionP(izquierda, entorno, errores, baseDatos);
    let derecha_ = OperacionP(derecha, entorno, errores, baseDatos);
    let resultado = false

    if(izquierda_.valor === derecha_.valor){
        resultado = true
    }
    return {
        valor: resultado,
        tipo: TIPO_DATO.BOOLEAN,
        linea: izquierda.linea,
        columna: izquierda.columna
    } 
}

function diferente(izquierda, derecha, entorno, errores, baseDatos){
    
    let izquierda_ = OperacionP(izquierda, entorno, errores, baseDatos);
    let derecha_ = OperacionP(derecha, entorno, errores, baseDatos);
    let resultado = true

    if(izquierda_.valor === derecha_.valor){
        resultado = false
    }
    return {
        valor: resultado,
        tipo: TIPO_DATO.BOOLEAN,
        linea: izquierda.linea,
        columna: izquierda.columna
    }    
}

function and(izquierda, derecha, entorno, errores, baseDatos){

    let izquierda_ = OperacionP(izquierda, entorno, errores, baseDatos);
    let derecha_ = OperacionP(derecha, entorno, errores, baseDatos);

    let resultado = false
    
    if(izquierda_.valor && derecha_.valor){
        resultado = true
    }

    return {
        valor: resultado,
        tipo: TIPO_DATO.BOOLEAN,
        linea: izquierda.linea,
        columna: izquierda.columna
    }
}

function or(izquierda, derecha, entorno, errores, baseDatos){
        
    let izquierda_ = OperacionP(izquierda, entorno, errores, baseDatos);
    let derecha_ = OperacionP(derecha, entorno, errores, baseDatos);

    let resultado = false
    
    if(izquierda_.valor || derecha_.valor){
        resultado = true
    }

    return {
        valor: resultado,
        tipo: TIPO_DATO.BOOLEAN,
        linea: izquierda.linea,
        columna: izquierda.columna
    }   
}

function not(izquierda, derecha, entorno, errores, baseDatos){         
    let izquierda_ = OperacionP(izquierda, entorno, errores, baseDatos);
    let resultado = !izquierda_.valor

    return{
        valor: resultado,
        tipo: TIPO_DATO.BOOLEAN,
        linea: izquierda.linea,
        columna: izquierda.columna
    }
}

function suma(izquierda, derecha, entorno, errores, simbolo){
    let izquierda_ = OperacionP(izquierda, entorno, errores, simbolo);
    let derecha_ = OperacionP(derecha, entorno, errores, simbolo);

    let tipoSalida =  Tipos(izquierda_.tipo, derecha_.tipo, TIPO_OPERACION.SUMA)
    
    if(tipoSalida != null){
        if (tipoSalida === TIPO_DATO.INT){
            let sumavar = 0
            let resultado = 0
            if(izquierda_.tipo === TIPO_DATO.VARCHAR){
                for (var i=0; i < izquierda_.valor.length; i++){
                    sumavar = sumavar + izquierda_.valor.charCodeAt(i)
                }
                resultado = sumavar + derecha_.valor
            }else if(derecha_.tipo === TIPO_DATO.VARCHAR){
                for (var i=0; i < derecha_.valor.length; i++){
                    sumavar = sumavar + derecha_.valor.charCodeAt(i)
                }
                resultado = sumavar + izquierda_.valor
            }else{
                resultado = izquierda_.valor + derecha_.valor
            }
            return {
                valor: resultado,
                tipo: TIPO_DATO.INT,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }else if(tipoSalida === TIPO_DATO.DOUBLE){
            let sumavar = 0
            let resultado = 0
            if(izquierda_.tipo === TIPO_DATO.VARCHAR){
                for (var i=0; i < izquierda_.valor.length; i++){
                    sumavar = sumavar + izquierda_.valor.charCodeAt(i)
                }
                resultado = sumavar + derecha_.valor
            }else if(derecha_.tipo === TIPO_DATO.VARCHAR){
                for (var i=0; i < derecha_.valor.length; i++){
                    sumavar = sumavar + derecha_.valor.charCodeAt(i)
                }
                resultado = sumavar + izquierda_.valor
            }else{
                resultado = izquierda_.valor + derecha_.valor
            }
            return {
                valor: resultado,
                tipo: TIPO_DATO.DOUBLE,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }else if(tipoSalida === TIPO_DATO.DATE){
            let resultado
            if (izquierda_.tipo === TIPO_DATO.INT || izquierda_.tipo === TIPO_DATO.DOUBLE){
                let fecha = new Date(derecha_.valor);
                fecha.setDate(fecha.getDate() + izquierda_.valor);
                resultado = fecha
            }else if (derecha_.tipo === TIPO_DATO.INT || derecha_.tipo === TIPO_DATO.DOUBLE){
                let fecha = new Date(izquierda_.valor);
                fecha.setDate(fecha.getDate() + derecha_.valor);
                resultado = fecha
            }else if(izquierda_.tipo === TIPO_DATO.VARCHAR){
                let fecha = new Date(derecha_.valor);
                let sumavar = 0
                for (var i=0; i < izquierda_.valor.length; i++){
                    sumavar = sumavar + izquierda_.valor.charCodeAt(i)
                }
                fecha.setDate(fecha.getDate() + sumavar);
                resultado = fecha
            }else if(derecha_.tipo === TIPO_DATO.VARCHAR){
                let fecha = new Date(izquierda_.valor);
                let sumavar = 0

                for (var i=0; i < derecha_.valor.length; i++){
                    sumavar = sumavar + derecha_.valor.charCodeAt(i)
                }
                fecha.setDate(fecha.getDate() + sumavar);
                resultado = fecha
            }
            return{
                valor: resultado,
                tipo: TIPO_DATO.DATE,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }else if (tipoSalida === TIPO_DATO.VARCHAR){
            let resultado = izquierda_.valor + derecha_.valor
            return {
                valor: resultado,
                tipo: TIPO_DATO.VARCHAR,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }
    }


}

function resta(izquierda, derecha, entorno, errores, simbolo){
    let izquierda_ = OperacionP(izquierda, entorno, errores, simbolo);
    let derecha_ = OperacionP(derecha, entorno, errores, simbolo);

    let tipoSalida =  Tipos(izquierda_.tipo, derecha_.tipo, TIPO_OPERACION.RESTA)
    
    if(tipoSalida != null){
        if (tipoSalida === TIPO_DATO.INT){
            let sumavar = 0
            let resultado = 0
            if(izquierda_.tipo === TIPO_DATO.VARCHAR){
                for (var i=0; i < izquierda_.valor.length; i++){
                    sumavar = sumavar + izquierda_.valor.charCodeAt(i)
                }
                resultado = sumavar - derecha_.valor
            }else if(derecha_.tipo === TIPO_DATO.VARCHAR){
                for (var i=0; i < derecha_.valor.length; i++){
                    sumavar = sumavar + derecha_.valor.charCodeAt(i)
                }
                resultado = izquierda_.valor - sumavar
            }else{
                resultado = izquierda_.valor - derecha_.valor
            }
            return {
                valor: resultado,
                tipo: TIPO_DATO.INT,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }else if(tipoSalida === TIPO_DATO.DOUBLE){
            let sumavar = 0
            let resultado = 0
            if(izquierda_.tipo === TIPO_DATO.VARCHAR){
                for (var i=0; i < izquierda_.valor.length; i++){
                    sumavar = sumavar + izquierda_.valor.charCodeAt(i)
                }
                resultado = sumavar - derecha_.valor
            }else if(derecha_.tipo === TIPO_DATO.VARCHAR){
                for (var i=0; i < derecha_.valor.length; i++){
                    sumavar = sumavar + derecha_.valor.charCodeAt(i)
                }
                resultado = izquierda_.valor - sumavar
            }else{
                resultado = izquierda_.valor - derecha_.valor
            }
            return {
                valor: resultado,
                tipo: TIPO_DATO.DOUBLE,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }else if(tipoSalida === TIPO_DATO.DATE){
            let resultado
            if (izquierda_.tipo === TIPO_DATO.INT || izquierda_.tipo === TIPO_DATO.DOUBLE){
                let fecha = new Date(derecha_.valor);
                fecha.setDate(fecha.getDate() - izquierda_.valor);
                resultado = fecha
            }else if (derecha_.tipo === TIPO_DATO.INT || derecha_.tipo === TIPO_DATO.DOUBLE){
                let fecha = new Date(izquierda_.valor);
                fecha.setDate(fecha.getDate() - derecha_.valor);
                resultado = fecha
            }else if(izquierda_.tipo === TIPO_DATO.VARCHAR){
                let fecha = new Date(derecha_.valor);
                let sumavar = 0
                for (var i=0; i < izquierda_.valor.length; i++){
                    sumavar = sumavar + izquierda_.valor.charCodeAt(i)
                }
                fecha.setDate(sumavar - fecha.getDate() );
                resultado = fecha
            }else if(derecha_.tipo === TIPO_DATO.VARCHAR){
                let fecha = new Date(izquierda_.valor);
                let sumavar = 0

                for (var i=0; i < derecha_.valor.length; i++){
                    sumavar = sumavar + derecha_.valor.charCodeAt(i)
                }
                fecha.setDate(fecha.getDate() - sumavar);
                resultado = fecha
            }
            return{
                valor: resultado,
                tipo: TIPO_DATO.DATE,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }else if (tipoSalida === TIPO_DATO.VARCHAR){
            let resultado = izquierda_.valor - derecha_.valor
            return {
                valor: resultado,
                tipo: TIPO_DATO.VARCHAR,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }
    }

}

function multiplicacion(izquierda, derecha, entorno, errores, simbolo){
    let izquierda_ = OperacionP(izquierda, entorno, errores, simbolo);
    let derecha_ = OperacionP(derecha, entorno, errores, simbolo);

    let tipoSalida =  Tipos(izquierda_.tipo, derecha_.tipo, TIPO_OPERACION.MULTIPLICACION)

    if (tipoSalida !== null){
        if (tipoSalida === TIPO_DATO.INT){
            let resultado = izquierda_.valor * derecha_.valor
            return {
                valor: resultado,
                tipo: TIPO_DATO.INT,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }else if (tipoSalida === TIPO_DATO.DOUBLE){
            let resultado = izquierda_.valor * derecha_.valor
            return {
                valor: resultado,
                tipo: TIPO_DATO.DOUBLE,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }
    }


}

function division(izquierda, derecha, entorno, errores, simbolo){
    let izquierda_ = OperacionP(izquierda, entorno, errores, simbolo);
    let derecha_ = OperacionP(derecha, entorno, errores, simbolo);

    let tipoSalida =  Tipos(izquierda_.tipo, derecha_.tipo, TIPO_OPERACION.DIVISION)

    if (tipoSalida !== null){
        if (tipoSalida === TIPO_DATO.INT){
            let resultado = izquierda_.valor / derecha_.valor
            return {
                valor: resultado,
                tipo: TIPO_DATO.INT,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }else if (tipoSalida === TIPO_DATO.DOUBLE){
            let resultado = izquierda_.valor / derecha_.valor
            return {
                valor: resultado,
                tipo: TIPO_DATO.DOUBLE,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }
    }
}

function modulo(izquierda, derecha, entorno, errores, simbolos){
    let izquierda_ = OperacionP(izquierda, entorno, errores, simbolos);
    let derecha_ = OperacionP(derecha, entorno, errores, simbolos);

    let tipoSalida =  Tipos(izquierda_.tipo, derecha_.tipo, TIPO_OPERACION.MODULO)

    if (tipoSalida !== null){
        if (tipoSalida === TIPO_DATO.INT){
            let resultado = izquierda_.valor % derecha_.valor
            return {
                valor: resultado,
                tipo: TIPO_DATO.INT,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }else if (tipoSalida === TIPO_DATO.DOUBLE){
            let resultado = izquierda_.valor % derecha_.valor
            return {
                valor: resultado,
                tipo: TIPO_DATO.DOUBLE,
                linea: izquierda.linea,
                columna: izquierda.columna
            }
        }
    }
}

function unario (izquierda, derecha, entorno, errores, simbolos){
    let izquierda_ = OperacionP(izquierda, entorno, errores, simbolos);
   

    let tipoSalida =  Tipos(izquierda_.tipo, derecha_.tipo, TIPO_OPERACION.NEGATIVO)

    if(tipoSalida === TIPO_DATO.DOUBLE || tipoSalida === TIPO_DATO.INT){
        let resultado = izquierda_.valor * -1
        return {
            valor: resultado,
            tipo: tipoSalida,
            linea: izquierda.linea,
            columna: izquierda.columna
        }
    }
}

module.exports = OperacionP;