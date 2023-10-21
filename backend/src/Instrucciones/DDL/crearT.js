

function CrearTabla(instruccion, entornos, errores, simbolo, entorno ,baseDatos){

    /*
    baseDatos.createTable("clientes", { });
    baseDatos.addColumn("clientes", "id", "varchar");
    baseDatos.addColumn("clientes", "nombre", "varchar");
    console.log(baseDatos.data)
    baseDatos.addColumn("clientes", "edad", "varchar");
    baseDatos.insertIntoTable("clientes", { id: 1, nombre: "Juan", edad: 30 });
    baseDatos.insertIntoTable("clientes", { id: 2, nombre: "Ana", edad: 25 });

    baseDatos.addColumn("clientes", "email", "varchar");
    baseDatos.insertIntoTable("clientes", { id: 3, nombre: "Pedro", edad: 40, email: "hola@gmail.com" });
    baseDatos.insertIntoTable("clientes", { id: 4, nombre: "Luis", email: "coco@gmail.com" });
    baseDatos.createTable("tabla2", { fecha: "date", direccion: "varchar", edad: "int" });
    baseDatos.insertIntoTable("tabla2", { id: 1, nombre: "Juan", edad: 30, email: "juan@example.com" });
    baseDatos.updateTable("clientes", { edad: 31 }, (row) => row.nombre === "Juan");
    */

    //console.log("--------Create table----------",instruccion,"------------------")
    //console.log("--------Id Tabla----------",instruccion.id)
    const nombreTabla = instruccion.id;
    baseDatos.createTable(nombreTabla, { });
    for (let i = 0; i < instruccion.columnas.length; i++) {
        const columna = instruccion.columnas[i];
        //console.log("--------Columna----------",columna,"------------------")
        baseDatos.addColumn(nombreTabla, columna.id, columna.tipodato);
    }

  
}
module.exports = CrearTabla;