
let Entorno = require("./Simbolos/Entorno");
let globales = require("./Instrucciones/globales");
let Database = require("./Instrucciones/TablesMain");
function prueba()    {
    let parser = require("./Analizador/Parser");
    var entrada = `
   
    create table tabla1(
        id int,
        edad Double,
        nombre Varchar
        cumple date
    );

    create table tabla2(
        cancion varchar,
        inauracion date
    );




    INSERT INTO tabla1 (id, edad, nombre, cumple)
    VALUES (1, 45, "Juan", 2019-10-02);

    INSERT INTO tabla1 (id, edad, nombre, cumple)
    VALUES (2, 23, "Luis",2020-09-21);

    INSERT INTO tabla1 (id, edad, nombre, cumple)
    VALUES (3, 25, "Sebastian",2020-07-15);

    INSERT INTO tabla1 (id, edad, nombre, cumple)
    VALUES (4, 15, "Jorge",2020-05-14);

    INSERT INTO tabla1 (id, edad, nombre, cumple)
    VALUES (5, 31, "Zamora",2020-01-01);

    Select * AS indetificacion, years, name, birth from tabla1 where edad >24;
    
    `;
    var arbol = parser.parse(entrada);
    
    console.log("-----Arbol Error----------",arbol.lerrores,"---------")
  
    a = arbol.instrucciones;
   // console.log("-----Arbol----------",a,"---------")
    
    const global = new Entorno(null, "global");
    const database = new Database();

    let imprimir = globales(arbol.instrucciones,global,arbol.lerrores,arbol.lsimbolos, database);
    //console.log(database.data["tabla1"].data)
   //database.printTableData("clientes");
}

prueba();