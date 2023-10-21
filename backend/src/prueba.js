
let Entorno = require("./Simbolos/Entorno");
let globales = require("./Instrucciones/globales");
let Database = require("./Instrucciones/TablesMain");
function prueba()    {
    let parser = require("./Analizador/Parser");
    var entrada = `
   
    create table tabla1(
        id int,
        edad Double,
        nombre Varchar,
        cumple date,
        genero Varchar
    );

    create table tabla2(
        cancion varchar,
        inauracion date
    );




    INSERT INTO tabla1 (id, edad, nombre, cumple, genero)
    VALUES (1, 45, "Juan", 2019-10-02, "hombre");

    INSERT INTO tabla1 (id, edad, nombre, cumple, genero)
    VALUES (2, 23, "Luis",2020-09-21, "hombre");

    INSERT INTO tabla1 (id, edad, nombre, cumple, genero)
    VALUES (3, 25, "Luisa",2020-07-15, "mujer");

    INSERT INTO tabla1 (id, edad, nombre, cumple, genero)
    VALUES (4, 15, "Ana",2020-05-14, "mujer");

    INSERT INTO tabla1 (id, edad, nombre, cumple, genero)
    VALUES (5, 11, "Zamora",2020-01-01, "mujer");

    UPDATE tabla1
    SET edad = 99,
        cumple = 2011-10-29
    WHERE nombre = "Zamora";

    --Select * from tabla1 where edad >= 25;

    --TRUNCATE TABLE tabla1;

    Select * from tabla1;

    DELETE FROM tabla1
    WHERE genero = "hombre";
    
    Select * from tabla1;

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