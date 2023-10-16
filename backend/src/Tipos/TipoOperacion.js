//? Operaciones relacionañes, logicas y aritmeticas

const TIPO_OPERACION = {
                    //! Aritmeticas
    SUMA: 'SUMA',
    RESTA: 'RESTA',
    MULTIPLICACION: 'MULTIPLICACION',
    DIVISION: 'DIVISION',
    POTENCIA: 'POTENCIA',
    MODULO: 'MODULO',
    NEGATIVO: 'NEGATIVO',
                    //! Relacionales
    IGUAL: 'IGUAL',
    DIFERENTE: 'DIFERENTE',
    MENORIGUAL: 'MENORIGUAL',
    MAYORIGUAL: 'MAYORIGUAL',
    MENOR: 'MENOR',
    MAYOR: 'MAYOR',
    TERNARIO: 'TERNARIO',
                    //! Logicas
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT'
            
}

module.exports = TIPO_OPERACION