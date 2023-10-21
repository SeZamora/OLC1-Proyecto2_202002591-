
const Operacion = require("../operaciones");
function Delete(instruccion, entornos, errores, simbolo, entorno ,baseDatos) {
    
     where = Operacion(instruccion.where, entornos, errores, simbolo, baseDatos);
    //console.log(where)
    condicion = new Function('row', 'return ' + where);

    baseDatos.deleteFromTable(instruccion.idtabla, condicion);
}

module.exports = Delete;