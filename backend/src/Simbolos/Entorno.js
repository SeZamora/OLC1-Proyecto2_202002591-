
class Entorno {
    constructor(padre, nombre) {
        this.nombre = nombre
        this.anterior = padre
        this.tablaSimbolos = new Map()
        this.tablaMetodos = new Map()
        this.retorno = ""
        
    }




}

module.exports = Entorno