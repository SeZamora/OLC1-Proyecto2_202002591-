
let Entorno = require("./Simbolos/Entorno");
let globales = require("./Instrucciones/globales");
function prueba()    {
    let parser = require("./Analizador/Parser");
    var entrada = `
   
    create table prueba(
        cosa1 int,
        cosa2 int,
        cosa3 Varchar
    );

    

    `;
    var arbol = parser.parse(entrada);
    
    console.log("-----Arbol Error----------",arbol.lerrores,"---------")
  
    a = arbol.instrucciones;
    console.log("-----Arbol----------",a,"---------")
    
    const global = new Entorno(null, "global");
    let imprimir = globales(arbol.instrucciones,global,arbol.lerrores,arbol.lsimbolos);
    
}

prueba();