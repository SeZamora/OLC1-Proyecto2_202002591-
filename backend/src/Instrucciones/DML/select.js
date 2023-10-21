const Operaciones = require("../operaciones");


function SelectS (instruccion, entornos, errores, simbolo, entorno ,baseDatos){
    if (entorno == "Global"){
        //console.log("-----------Select Global----------\n",instruccion,"\n-----------------")
        if (instruccion.columnas !== null && instruccion.as === null){
            if (instruccion.where !== null){
                //console.log("-----------Select Where----------\n",instruccion,"\n-----------------")
                var where =  Operaciones(instruccion.where, entornos, errores, simbolo, baseDatos);
                //console.log(where)
                condicion = new Function('row', 'return ' + where);
                // console.log(condicion)
                var resultado = baseDatos.selectFromTable(instruccion.idtabla, instruccion.columnas, condicion);
                console.log(resultado)
            }else if(instruccion.where === null){
                //console.log("-----------Select Sin Where----------\n",instruccion,"\n-----------------")
                var resultado = baseDatos.selectFromTable(instruccion.idtabla, instruccion.columnas);
                console.log(resultado)
            }
        }else if(instruccion.columnas[0] === "*" && instruccion.as !== null && instruccion.where === null){
            //console.log("-----------Select AS----------\n",instruccion,"\n-----------------")
            var resultado = baseDatos.getTableAs(instruccion.idtabla, instruccion.as);
            console.log(resultado)
        }
    }
}

module.exports = SelectS;