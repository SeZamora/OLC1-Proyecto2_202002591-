
let Entorno = require("./Simbolos/Entorno");
let globales = require("./Instrucciones/globales");
let Database = require("./Instrucciones/TablesMain");


function prueba(entrada)    {

    const fs = require('fs');
    const { exec } = require("child_process");
    

    let parser = require("./Analizador/Parser");
    let parse = require('./Arbol/arbol.js');
    var arbol = parser.parse(entrada);

    let raiz = parse.parse(entrada);

    /*

    let grafica = `digraph G {
        graph [ratio=.548];
        node [style=filled, color=black, shape=circle, width=1
            fontname=Helvetica, fontweight=bold, fontcolor=black,
            fontsize=10, fixedsize=true];
    `+ raiz.graficar()+ " \n }";

    fs.writeFile("temp.txt", grafica, err => {
        if (err) {
         console.error('Falló escribir el archivo ', err);
        } else console.log('archivo creado correctamente');
       });
    
    exec("dot -Tsvg temp.txt -o temp.svg", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        import('open').then(open => {
            open("temp.svg")
        }).catch(error => {
            console.error('Error al importar el módulo open', error);
        });
       
    });

    */
    //console.log("-----Arbol Error----------",arbol.lerrores,"---------")
  
    a = arbol.instrucciones;
   // console.log("-----Arbol----------",a,"---------")
    errores = arbol.lerrores;
    simbolos = arbol.lsimbolos;
    const global = new Entorno(null, "global");
    const database = new Database();

    let imprimir = globales(arbol.instrucciones,global,errores,simbolos, database);
    //console.log(database.data["tabla1"].data)
   //database.printTableData("clientes");
   var respuesta={
    message:"Resultado correcto",       
    salida: imprimir,  
    errores: errores,
    simbolos: simbolos
    }
    console.log (imprimir);
    return respuesta;
}

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

BEGIN
    declare @boolean1 boolean;

    set @boolean1 = "hola" != "hjola";

    declare @String varchar;

    set @String = "hola";

    Print(@boolean1);
END;



`;

prueba(entrada);