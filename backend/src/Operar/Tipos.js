const TIPO_DATO = require("../Tipos/TipoDato")
const TIPO_OPERACION = require("../Tipos/TipoOperacion")

function Tipos(tipo1, tipo2, operacion){
    switch (operacion) {
        case TIPO_OPERACION.SUMA:
            //Enteros
            if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.INT
            }else if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            }else if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.DATE){
                return TIPO_DATO.DATE
            }else if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.VARCHAR){
                return TIPO_DATO.INT
            //Doubles
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.DOUBLE
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.DATE){
                return TIPO_DATO.DATE
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.VARCHAR){
                return TIPO_DATO.DOUBLE
            //date
            }else if(tipo1 === TIPO_DATO.DATE && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.DATE
            }else if(tipo1 === TIPO_DATO.DATE && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DATE
            }else if(tipo1 === TIPO_DATO.DATE && tipo2 === TIPO_DATO.VARCHAR){
                return TIPO_DATO.DATE
            //String
            }else if(tipo1 === TIPO_DATO.VARCHAR && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.INT
            }else if(tipo1 === TIPO_DATO.VARCHAR && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            }else if(tipo1 === TIPO_DATO.VARCHAR && tipo2 === TIPO_DATO.DATE){
                return TIPO_DATO.DATE
            }else if(tipo1 === TIPO_DATO.VARCHAR && tipo2 === TIPO_DATO.VARCHAR){
                return TIPO_DATO.VARCHAR
            }
            return null

        case TIPO_OPERACION.RESTA:
            //Enteros
            if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.INT
            }else if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            }else if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.DATE){
                return TIPO_DATO.DATE
            }else if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.VARCHAR){
                return TIPO_DATO.INT
            //Doubles
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.DOUBLE
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.DATE){
                return TIPO_DATO.DATE
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.VARCHAR){
                return TIPO_DATO.DOUBLE
            //date
            }else if(tipo1 === TIPO_DATO.DATE && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.DATE
            }else if(tipo1 === TIPO_DATO.DATE && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DATE
            }else if(tipo1 === TIPO_DATO.DATE && tipo2 === TIPO_DATO.VARCHAR){
                return TIPO_DATO.DATE
            //String
            }else if(tipo1 === TIPO_DATO.VARCHAR && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.INT
            }else if(tipo1 === TIPO_DATO.VARCHAR && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            }else if(tipo1 === TIPO_DATO.VARCHAR && tipo2 === TIPO_DATO.DATE){
                return TIPO_DATO.DATE
            }else if(tipo1 === TIPO_DATO.VARCHAR && tipo2 === TIPO_DATO.VARCHAR){
                return TIPO_DATO.VARCHAR
            }
            return null

        case TIPO_OPERACION.MULTIPLICACION:
            //Enteros
            if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.INT
            }else if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            //Doubles
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.DOUBLE
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            }
            return null
        

        case TIPO_OPERACION.DIVISION:
            //Enteros
            if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.INT
            }else if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            //Doubles
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.DOUBLE
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            }
            return null
        
        case TIPO_OPERACION.MODULO:
            //Enteros
            if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.DOUBLE
            }else if(tipo1 === TIPO_DATO.INT && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            //Doubles
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.INT){
                return TIPO_DATO.DOUBLE
            }else if(tipo1 === TIPO_DATO.DOUBLE && tipo2 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            }
            return null

        case TIPO_OPERACION.UNARIO:
            //Enteros
            if(tipo1 === TIPO_DATO.INT){
                return TIPO_DATO.INT
            }else if(tipo1 === TIPO_DATO.DOUBLE){
                return TIPO_DATO.DOUBLE
            }
            return null
        }

}

module.exports = Tipos