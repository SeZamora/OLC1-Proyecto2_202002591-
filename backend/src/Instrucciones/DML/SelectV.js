const Operacion = require("../../Operar/operacionP");


function SelectV (instruccion, entornos, errores, simbolo, entorno ,baseDatos){
    console.log("-----------Select Va----------\n",instruccion,"\n-----------------")
    let resultado = Operacion(instruccion.condicion, entornos, errores, simbolo, entorno ,baseDatos)
    let titulo
    let result = ""
    if (instruccion.titulo !== null){
        titulo = instruccion.titulo
    }else{
        titulo = resultado.valor
    }

    result += ("-----------------------\n");
  
    // Imprime la primera palabra enmarcada
    result += (`|  ${titulo} | \n`);

    result += ("-----------------------\n");
  
    // Imprime la segunda palabra enmarcada
    result += (`| ${resultado.valor} | \n`);
  
    // Imprime la parte inferior del marco
    result += ("-----------------------")
    

    
    return result

}

module.exports = SelectV;