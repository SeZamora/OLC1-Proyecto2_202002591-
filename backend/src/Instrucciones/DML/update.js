
const Operacion = require("../operaciones");
function update(instruccion, entornos, errores, simbolo, entorno ,baseDatos) {
    const lista = {};
    for(let i =0; i < instruccion.valores.length; i++){
        
        var resultado = Operacion(instruccion.valores[i].derecha, entornos, errores, simbolo, baseDatos);
        //console.log("soy resulatodo",resultado)
        //console.log(instruccion.valores[i].izquierda)
        lista[instruccion.valores[i].izquierda.valor] = resultado.valor;
    }

    var where = Operacion(instruccion.where, entornos, errores, simbolo, baseDatos);
    //console.log(where)
    condicion = new Function('row', 'return ' + where);
    //console.log(instruccion.idtabla)
    //console.log(lista)
    //console.log(condicion)
    baseDatos.updateTable(instruccion.idtabla, lista, condicion);
}
module.exports = update;