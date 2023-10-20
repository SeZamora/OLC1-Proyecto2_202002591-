
function renameColumn(instruccion, entornos, errores, simbolo, entorno ,baseDatos){
    baseDatos.renameColumn(instruccion.idtabla, instruccion.idcolumna, instruccion.idnuevo);
}
module.exports = renameColumn;