const Entorno = require('../Simbolos/Entorno');

function beginend(instruccion, entornos, errores, simbolo, entorno ,baseDatos) {
    const Local = require('./Locales');
    let entornoLocal = new Entorno(entornos);
    //console.log("------Entornos--------\n",entornos,"\n-----------------")
    //console.log("------Entorno Local--------\n",entornoLocal,"\n-----------------")
    //console.log("------Instrucciones--------\n",instruccion.instrucciones,"\n-----------------")

    var retornar = Local(instruccion.instrucciones, entornoLocal, errores, simbolo, baseDatos);
    return retornar;
}

module.exports = beginend;