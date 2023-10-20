
function RenameTable(instruccion, entornos, errores, simbolo, entorno ,baseDatos){

    baseDatos.renameTable(instruccion.idtabla, instruccion.idnuevo);
}

module.exports = RenameTable;