
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

        console.log("-----Arbol Error----------",raiz.lerrores,"---------")

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
-- Crear tablas
CREATE TABLE Productos (
    ProductoID INT,
    Nombre VARCHAR,
    Precio DOUBLE,
    Stock INT
);

CREATE TABLE Ventas (
    VentaID INT,
    ProductoID INT,
    Cantidad INT,
    FechaVenta DATE,
    Total DOUBLE,
    MetodoPago VARCHAR,
    EstadoVenta VARCHAR
);
CREATE TABLE Productos2 (
    ProductoID INT,
    Nombre VARCHAR,
    Precio DOUBLE,
    Stock INT
);

CREATE TABLE Ventas2 (
    VentaID INT,
    ProductoID INT,
    Cantidad INT,
    FechaVenta DATE,
    Total DOUBLE,
    MetodoPago VARCHAR,
    EstadoVenta VARCHAR
);
-- Alterar tabla (Modificar columna Precio)
ALTER TABLE Productos
RENAME COLUMN Precio TO PrecioUnitario;

-- Alterar tabla (Agregar columna Categoria)
ALTER TABLE Productos
ADD Categoria VARCHAR;

-- Drop tablas avanzadas
DROP TABLE Ventas2;
DROP TABLE Productos2;


-- Insertar datos
INSERT INTO Productos (ProductoID, Nombre, PrecioUnitario, Stock, Categoria)
VALUES (1, "Producto X", 1000.00, 50, "Electrónicos");
INSERT INTO Productos (ProductoID, Nombre, PrecioUnitario, Stock, Categoria)
VALUES (2, "Producto Y", 750.50, 30, "Ropa");

INSERT INTO Ventas (VentaID, ProductoID, Cantidad, FechaVenta, Total, MetodoPago, EstadoVenta)
VALUES (501, 1, 10, "2023-10-17", 10000.00, "Tarjeta", "Completado");
INSERT INTO Ventas (VentaID, ProductoID, Cantidad, FechaVenta, Total, MetodoPago, EstadoVenta)
VALUES (502, 2, 5, "2023-10-16", 3752.50, "Efectivo", "Pendiente");

-- Seleccionar datos con WHERE (Operaciones lógicas y relacionales)
SELECT ProductoID, Nombre, PrecioUnitario, Categoria
FROM Productos
WHERE Stock > 0 AND PrecioUnitario >= 800.00 AND PrecioUnitario <= 1200.00;

SELECT VentaID, FechaVenta, Total, EstadoVenta
FROM Ventas
WHERE (MetodoPago = "Tarjeta" OR MetodoPago = "Efectivo") AND EstadoVenta = "Completado";

Select * from Productos;

-- Truncar tabla
TRUNCATE TABLE Ventas;
select * from Ventas;

-- Borrar datos
DELETE FROM Productos WHERE ProductoID = 2;
select * from Productos;

BEGIN
    DECLARE @valor1 INT DEFAULT 55;
    DECLARE @valor2 INT DEFAULT 30;

    select @valor1;
    select @valor2 AS Valor2;

    DECLARE @nota INT;
    SET @nota = 99;

    CASE
        WHEN @nota > 85 THEN "Excelente"
        WHEN @nota >= 61 AND @nota <= 85 THEN "Aprobado"
        ELSE "No Aprobado"
    END;


    CASE @nota
        WHEN 100 THEN "Sobresaliente"
        WHEN 99 THEN "Muy bueno"
        WHEN 98 THEN "Bueno"
        ELSE "no es 70"
    END;
END;



`;

prueba(entrada);