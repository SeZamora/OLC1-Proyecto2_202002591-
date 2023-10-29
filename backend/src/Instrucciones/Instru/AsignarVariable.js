const Operacion = require("../../Operar/operacionP");

function AsignarV(instruccion, entornos, errores, simbolo,nameEntorno, baseDatos){

    //console.log("----Asignar Variable----\n",instruccion)
    //console.log("----Entornos----\n",entornos)

    const id = instruccion.id;

    var valor = Operacion(instruccion.expresion, entornos, errores, simbolo, baseDatos);
    var temp = entornos.getSimboloE(id)
    let variable = temp.resultado
    variable.valor = valor.valor
    entornos.actualizar(id , variable)
    simbolo.update(id, temp.entorno, valor.valor)

    //console.log("----Entornos----\n",entornos)
}

module.exports = AsignarV;