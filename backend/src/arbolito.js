
const parser = require('./Arbol/arbol.js')
var entrada = `
   
BEGIN
    declare @prueba Varchar,@prueba2 int;
    declare @nombre Varchar default "hola";
    declare @cosa boolean;
    
    insert into nuevoNombre (columna1,columna2,columna3) values (1,2,"hola");

    select @nombre;
END;

create table prueba(
    cosa1 int,
    cosa2 int,
    cosa3 Varchar
);

Alter Table prueba
rename to nuevoNombre;

DROP table prueba;

insert into nuevoNombre (columna1,columna2,columna3) values (1,2,"hola");

begin 
    if 1=1 then
        select * from nuevoNombre;
    else
        select * from nuevoNombre;
    end if;
end;


Begin
    DECLARE @nota INT;
    SET @nota = 70;
    CASE nota
    WHEN nota > 85 THEN "Excelente"
    WHEN nota >= 61 AND nota <= 85 THEN "Aprobado"
    ELSE "No Aprobado"
    END;
END;

Begin
    WHILE @contador < 10
    BEGIN
    declare @contador int;
    SET @contador = @contador+1+12+2134-12*3/(2+8);
    END;
    create table prueba(
        cosa1 int,
        cosa2 int,
        cosa3 Varchar
    );
    
    insert into nuevoNombre (columna1,columna2,columna3) values (1,2,"hola");


    FOR contador IN 1..10
    BEGIN
    
    insert into nuevoNombre (columna1,columna2,columna3) values (1,2,"hola");

    Print "Contador: ";
    END;
end;

begin
    CREATE FUNCTION CalcularAreaCirculo(@pi DOUBLE, @radio DOUBLE)
    RETURNS DOUBLE
    BEGIN
    DECLARE @area DOUBLE;
    -- Fórmula para calcular el área del círculo: π * radio^2
    SET @area = @pi * @radio * @radio;
    RETURN @area;
    END;
end;

create table prueba(
    cosa1 int,
    cosa2 int,
    cosa3 Varchar
);


begin
    CREATE PROCEDURE CalcularAreaCirculo
        @pi DOUBLE, 
        @radio DOUBLE
    AS
    BEGIN
    DECLARE @area DOUBLE;
    -- Fórmula para calcular el área del círculo: π * radio^2
    SET @area = @pi * @radio * @radio;
    END;
end;

begin
    -- Llamar a la función para calcular el área de un círculo con radio 5.
    DECLARE @radioCirculo DOUBLE DEFAULT 5.0;
    DECLARE @pi DOUBLE default 3.14159265359;
    DECLARE @areaCirculo DOUBLE;
    SET @areaCirculo = CalcularAreaCirculo(@pi, @radioCirculo);
    PRINT "El área del círculo con radio " ;
    
    insert into nuevoNombre (columna1,columna2,columna3) values (1,2,"hola");

    SELECT LOWER("HOLA MUNDO");
    SELECT UPPER("hola mundo");
    SELECT ROUND(5.678, 2); -- Redondea a 2 decimales
    SELECT LEN("Hola mundo"); --10
    SELECT TRUNCATE(8.945, 1); -- Trunca a 1 decimal
    SELECT TYPEOF(123); -- Devuelve el tipo INT
end;
`;

const raiz = parser.parse(entrada);

const contenido = `digraph G { 
    graph [ratio=.548];
    node [style=filled, color=black, shape=circle, width=1
        fontname=Helvetica, fontweight=bold, fontcolor=black,
        fontsize=10, fixedsize=true];
`+ raiz.graficar() + " \n }";

console.log(contenido)