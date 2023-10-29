const Operacion = require("../../Operar/operacionP");

function Print(instruccion, entornos, errores, simbolo,nameEntorno, baseDatos){
    //console.log("----Print----\n",instruccion)

    let valor = instruccion.valor;

    let resultado = Operacion(valor, entornos, errores, simbolo, baseDatos);
    return resultado.valor
}

module.exports = Print;