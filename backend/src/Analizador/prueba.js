function createDatabase(initialData = {}) {
    const database = { tables: initialData };
  
        // Función para crear una tabla (DDL)
    function createTable(tableName, columns) {
        database.tables[tableName] = { columns, rows: [] };
    }
    
    // Función para agregar una columna a la tabla (DDL)
    function addColumn(tableName, columnName, columnType) {
        database.tables[tableName].columns[columnName] = columnType;
    }
    
    // Función para cambiar el nombre de la tabla (DDL)
    function renameTable(oldTableName, newTableName) {
        database.tables[newTableName] = database.tables[oldTableName];
        delete database.tables[oldTableName];
    }
    
    // Función para eliminar una columna de la tabla (DDL)
    function dropColumn(tableName, columnName) {
        delete database.tables[tableName].columns[columnName];
        database.tables[tableName].rows.forEach((row) => {
        delete row[columnName];
        });
    }
    
    // Función para cambiar el nombre de una columna (DDL)
    function renameColumn(tableName, oldColumnName, newColumnName) {
        const table = database.tables[tableName];
        table.columns[newColumnName] = table.columns[oldColumnName];
        delete table.columns[oldColumnName];
        table.rows.forEach((row) => {
        row[newColumnName] = row[oldColumnName];
        delete row[oldColumnName];
        });
    }
    
    // Función para eliminar una tabla (DDL)
    function dropTable(tableName) {
        delete database.tables[tableName];
    }
    
    // Función para insertar un registro (DML)
    function insertRecord(tableName, values) {
        database.tables[tableName].rows.push(values);
    }
    
    // Función para seleccionar datos (DML)
    function selectData(tableName, columns, condition) {
        const table = database.tables[tableName];
        const selectedData = table.rows.map((row) => {
        const resultRow = {};
        if (!condition || condition(row)) {
            columns.forEach((column) => {
            resultRow[column] = row[column];
            });
        }
        return resultRow;
        });
        return selectedData;
    }
    
    // Función para actualizar datos (DML)
    function updateData(tableName, updates, condition) {
        const table = database.tables[tableName];
        table.rows.forEach((row) => {
        if (!condition || condition(row)) {
            for (const column in updates) {
            row[column] = updates[column];
            }
        }
        });
    }
    
    // Función para eliminar registros (DML)
    function deleteData(tableName, condition) {
        const table = database.tables[tableName];
        table.rows = table.rows.filter((row) => !condition || !condition(row));
    }
    
    // Función para truncar una tabla (DML)
    function truncateTable(tableName) {
        database.tables[tableName].rows = [];
    }
    
    function listTables() {
        const tableNames = Object.keys(database.tables);
        console.log('Tablas en la base de datos:');
        tableNames.forEach((tableName, index) => {
          console.log(`${index + 1}. ${tableName}`);
          console.log('   Contenido:');
          const table = database.tables[tableName];
          if (table.rows.length === 0) {
            console.log('   (Tabla vacía)');
          } else {
            table.rows.forEach((row, rowIndex) => {
              console.log(`   Fila ${rowIndex + 1}:`);
              for (const column in row) {
                console.log(`     ${column}: ${row[column]}`);
              }
            });
          }
        });
    }

    return {
        createTable,
        addColumn,
        renameTable,
        dropColumn,
        renameColumn,
        dropTable,
        insertRecord,
        selectData,
        updateData,
        deleteData,
        truncateTable,
        listTables,
    };
}
  
  // Ejemplo de uso
  const myDatabase = createDatabase();
  myDatabase.createTable('products', { id: 'int', name: 'varchar', price: 'double' });
  myDatabase.insertRecord('products', { id: 1, name: 'Product 1', price: 19.99 });
  myDatabase.listTables();
  