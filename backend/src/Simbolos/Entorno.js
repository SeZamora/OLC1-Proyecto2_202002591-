
class Entorno {
    constructor(padre, nombre) {
        this.nombre = nombre
        this.anterior = padre
        this.tablaSimbolos = new Map()
        this.retorno = ""
        
    }

    addSimbolo(nombre, simbolo) {
        this.tablaSimbolos.set(nombre.toLowerCase(), simbolo)
    }

    getSimbolo(nombre) {
        for (let entorno = this; entorno != null; entorno = entorno.anterior) {
            var resultado = entorno.tablaSimbolos.get(nombre.toLowerCase())
            if (resultado != null) {
                return resultado
            }
        }
        return null
    }

    buscarSimbolo(nombre) {
        var resultado = this.tablaSimbolos.get(nombre.toLowerCase())
        if (resultado != null) {
            return true
        }
        return false
    }

    getSimboloE(nombre) {
        for (let entorno = this; entorno != null; entorno = entorno.anterior) {
            var resultado = entorno.tablaSimbolos.get(nombre.toLowerCase())
            if (resultado != null) {
                return {
                    resultado: resultado,
                    entorno: entorno.nombre
                }
            }
        }
        return null
    }

    actualizar(nombre, simbolo) {
        for (let entorno = this; entorno != null; entorno = entorno.anterior) {
            var encontrado = entorno.tablaSimbolos.get(nombre.toLowerCase())
            if (encontrado) {
                entorno.tablaSimbolos.set(nombre.toLowerCase(), simbolo)
                return true
            }
        }
        return false
    }

    setRetorno(tipo){
        this.retorno = tipo 
    }

}

module.exports = Entorno