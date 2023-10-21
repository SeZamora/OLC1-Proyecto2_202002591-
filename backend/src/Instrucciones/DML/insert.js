

const Operacion = require("../operaciones");

function Insertar(instruccion, entornos, errores, simbolo, entorno ,baseDatos){
    if (entorno == "Global"){
        const lista = {};
        //console.log(instruccion.columnas)
        c = instruccion.columnas
        //console.log(c.length)
        
        for (let i=0 ; i < c.length; i++){
            console.log("-----------Insert",i,"----------")
            var resultado = Operacion(instruccion.valores[i], entornos, errores, simbolo, baseDatos);

            lista[instruccion.columnas[i]] = resultado.valor;

        }
        baseDatos.insertIntoTable(instruccion.idtabla, lista);
        
    }
}

module.exports = Insertar;