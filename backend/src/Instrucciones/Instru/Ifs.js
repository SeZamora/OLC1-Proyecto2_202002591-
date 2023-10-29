const Operacion = require("../../Operar/operacionP");
const Entorno = require('../../Simbolos/Entorno');


function ifs (instruccion, entornos, errores, simbolo,nameEntorno, baseDatos){
    console.log("-----Ifs-----\n",instruccion)

    let resultado = Operacion(instruccion.condicion, entornos, errores, simbolo, baseDatos);
    if (resultado.valor){
        let Local = require('../Locales');
        var entornoLocal = new Entorno(entornos);
        entornoLocal.setRetorno(entornos.retorno)
        var imprimir = Local(instruccion.instrucciones, entornoLocal, errores, simbolo, baseDatos);
        console.log("----Imprimir If----\n",imprimir)
        return imprimir


    }else{
        if (instruccion.else !== null){
            let Local = require('../Locales');
            var entornoLocal = new Entorno(entornos);
            entornoLocal.setRetorno(entornos.retorno)
            var imprimir = Local(instruccion.else, entornoLocal, errores, simbolo, baseDatos);
            console.log("----Imprimir Else----\n",imprimir)
            return imprimir
        }else{
            return null
        }
    }
}

module.exports = ifs;