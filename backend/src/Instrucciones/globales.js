
const CrearTabla = require('./DDL/crearT');
const AgregarColumna = require('./DDL/agregarC');
const EliminarColumna = require('./DDL/eliminarC');
const RenameTable = require('./DDL/renameT');
const RenameColumn = require('./DDL/renameC');
const EliminarTabla = require('./DDL/eliminarT');
const Insertar = require('./DML/insert');
const Selects = require('./DML/select');
const Update = require('./DML/update');
const Delete = require('./DML/delete');
const BeginEnd = require('./BeginEnd');
const SelectV = require('./DML/SelectV');
function globales(instrucciones, entornos, errores, simbolo, baseDatos){
    var salida = ""
    //console.log("-----------Instruccion----------",instrucciones)
    for( let i = 0; i < instrucciones.length; i++) {
       
        if (instrucciones[i].tipo == "CREATET"){
            //console.log("-----------Global Create table----------")
            var consola = CrearTabla(instrucciones[i], entornos, errores, simbolo,"Global", baseDatos);

        }else if (instrucciones[i].tipo == "AGREGARC"){
            //console.log("-----------Agregar Columna----------")
            var consola = AgregarColumna(instrucciones[i], entornos, errores, simbolo,"Global", baseDatos);
        }else if (instrucciones[i].tipo == "ELIMINARC"){
            //console.log("-----------Eliminar Columna----------")
            var consola = EliminarColumna(instrucciones[i], entornos, errores, simbolo,"Global", baseDatos);
        }else if (instrucciones[i].tipo == "RENAMET"){
            //console.log("-----------Rename Table----------")
            var consola = RenameTable(instrucciones[i], entornos, errores, simbolo,"Global", baseDatos);
        }else if (instrucciones[i].tipo == "RENAMEC"){
            //console.log("-----------Rename Column----------")
            var consola = RenameColumn(instrucciones[i], entornos, errores, simbolo,"Global", baseDatos);
        }else if(instrucciones[i].tipo == "ELIMINART"){
            //console.log("-----------Drop Table----------")
            var consola = EliminarTabla(instrucciones[i], entornos, errores, simbolo,"Global", baseDatos);
        }else if(instrucciones[i].tipo == "INSERT"){
            console.log("-----------Insert----------")
            var consola = Insertar(instrucciones[i], entornos, errores, simbolo,"Global", baseDatos);
     
        }else if(instrucciones[i].tipo == "SELECTS"){
            console.log("-----------Update----------")
            var consola = Selects(instrucciones[i], entornos, errores, simbolo,"Global", baseDatos);
            salida = salida + consola + "\n \n";
        }else if(instrucciones[i].tipo == "UPDATE"){
            console.log("-----------Update----------")
            var consola = Update(instrucciones[i], entornos, errores, simbolo,"Global", baseDatos);
        }else if(instrucciones[i].tipo == "TRUNCATE"){
            console.log("-----------TRUNCATE----------")
            baseDatos.truncateTable(instrucciones[i].idtabla);
        }else if(instrucciones[i].tipo == "DELETE"){
            console.log("-----------DELETE----------")
            var consola = Delete(instrucciones[i], entornos, errores, simbolo,"Global", baseDatos);
            
        }else if(instrucciones[i].tipo == "BEGINEND"){
            console.log("-----------BeginEnd----------")
            var consola = BeginEnd(instrucciones[i], entornos, errores, simbolo,"Global", baseDatos);
            salida = salida + consola;
        }else if (instrucciones[i].tipo == "SELECTV"){
            console.log("-----------SelectV----------")
            var consola = SelectV(instrucciones[i], entornos, errores, simbolo,"Global", baseDatos);
            salida = salida + consola + "\n \n";
        }

      
    }
    return salida;
}
module.exports = globales;