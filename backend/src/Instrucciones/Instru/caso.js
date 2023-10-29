const Operacion = require("../../Operar/operacionP");

function Caso(instruccion, entornos, errores, simbolo,nameEntorno, baseDatos){
    console.log("----Caso----\n",instruccion)

    if (instruccion.id !== null){
        console.log("----SOY CON ID NO NULL----\n")
        var resultado = null;
        for (let i = 0; i < instruccion.condiciones.length; i++){
            console.log("----Caso22----\n",instruccion.condiciones[i].condicion)
            var condicion = Operacion(instruccion.condiciones[i].condicion, entornos, errores, simbolo, baseDatos);
            var id = Operacion(instruccion.id, entornos, errores, simbolo, baseDatos);
            console.log("----caso condi----\n",condicion.valor)
            console.log("----casoid----\n",id.valor)
            if (condicion.valor === id.valor){
             
                resultado = instruccion.condiciones[i].instrucciones;
                console.log("----caso resultado----\n",resultado)
                return resultado.valor
            }
        }
        if (resultado === null){
            resultado = instruccion.else;
            return resultado.valor
        }

    }else{
        console.log("----SOY CON ID  NULL----\n")
        var resultado = null;
        for (let i = 0; i < instruccion.condiciones.length; i++){
            console.log("----Caso22----\n",instruccion.condiciones[i].condicion)
            var condicion = Operacion(instruccion.condiciones[i].condicion, entornos, errores, simbolo, baseDatos);
           
            
            console.log("----caso condi----\n",condicion.valor)



            if (condicion.valor === true){
                resultado = instruccion.condiciones[i].instrucciones;
                console.log("----caso resultado----\n",resultado)
                return resultado.valor
            }
        }
        if (resultado === null){
            resultado = instruccion.else;
            return resultado.valor
        }
    }
}

module.exports = Caso;