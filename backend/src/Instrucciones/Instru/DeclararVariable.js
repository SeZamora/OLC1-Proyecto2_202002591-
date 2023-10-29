const Operaciones = require("../../Operar/operacionP");
const Simbolo = require('../../Simbolos/Simbolo');


function declararVariable(instruccion, entornos, errores, simbolo,nameEntorno, baseDatos){
    //console.log("----------mandar variable1-----------")
    //console.log(instruccion)

    for (let i =0; i<instruccion.variables.length; i++){
        var todo = instruccion.variables[i];
        var valor;
        //console.log("----------Valor----------\n",todo)

        if (todo.tipodato === "VARCHAR"){
            valor = ""
        }else if (todo.tipodato === "INT"){
            valor = 0
        } else if (todo.tipodato === "DOUBLE"){
            valor = 0.0
        } else if (todo.tipodato === "BOOLEAN"){
            valor = false
        } else if (todo.tipodato === "DATE"){
            valor = "00-00-0000"
        }

        if (todo.valor != null){
            resultado = Operaciones(todo.valor, entornos, errores,simbolo, baseDatos);
         //console.log("----------Resultado----------\n",resultado)
            valor = resultado.valor;
        }
       
        const nuevoS = new Simbolo(todo.id, valor, todo.tipodato, todo.linea, todo.columna)
        //console.log("----------Nuevo simbolo---------\n", nuevoS)
        entornos.addSimbolo(nuevoS.id, nuevoS)
        simbolo.add(todo.id, valor, todo.tipodato, nameEntorno, todo.linea, todo.columna)
        //console.log("---------entornos--------\n", entornos)
        //console.log("---------simbolo--------\n", simbolo)

        
    }
}
module.exports = declararVariable;