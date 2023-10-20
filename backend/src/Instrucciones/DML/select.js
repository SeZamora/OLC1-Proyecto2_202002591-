const Operaciones = require("../operaciones");


function SelectS (instruccion, entornos, errores, simbolo, entorno ,baseDatos){
    if (entorno == "Global"){
      
        if (instruccion.columnas == "*" && instruccion.as == null && instruccion.where == null){
            console.log("-----------Select *----------\n",instruccion,"\n-----------------")
            var resultado = baseDatos.getTable(instruccion.idtabla);
            console.log(resultado)
        }else if(instruccion.columnas == "*" && instruccion.as != null && instruccion.where == null){
            console.log("-----------Select AS----------\n",instruccion,"\n-----------------")
            var resultado = baseDatos.getTableAs(instruccion.idtabla, instruccion.as);
            console.log(resultado)
        }else if(instruccion.columnas == "*" && instruccion.as != null && instruccion.where != null){
            console.log("-----------Select Where----------\n",instruccion,"\n-----------------")
            Operaciones(instruccion.where, entornos, errores, simbolo, baseDatos);
            
            var resultado = baseDatos.RecorrerTabla(instruccion.idtabla);
            console.log(resultado)
        }    
    }
}

module.exports = SelectS;