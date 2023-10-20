
function AgregarColumna(instruccion, entornos, errores, simbolo, entorno ,baseDatos){
    //console.log("--------Agregar columna----------",instruccion,"------------------")
    //console.log("--------Id Tabla----------",instruccion.idtabla)
    baseDatos.addColumn(instruccion.idtabla, instruccion.idcolumna, instruccion.tipocolumna);
}
module.exports = AgregarColumna;