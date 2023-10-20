
function EliminarTabla(instruccion, entornos, errores, simbolo, entorno ,baseDatos){
    baseDatos.dropTable(instruccion.idtabla);
}

module.exports = EliminarTabla;