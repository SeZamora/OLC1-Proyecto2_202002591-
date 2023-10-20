
function EliminarColumna(instruccion, entornos, errores, simbolo, entorno ,baseDatos){
    //console.log("--------Eliminar columna----------",instruccion,"------------------")
    //console.log("--------Id Tabla----------",instruccion.idtabla)
    baseDatos.dropColumn(instruccion.idtabla, instruccion.idcolumna);
}

module.exports = EliminarColumna;