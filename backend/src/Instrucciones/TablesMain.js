class Database {
    constructor() {
      this.data = {};
    }
  
    createTable(tableName, columns) {
      this.data[tableName] = {
        columns: columns,
        data: [],
      };
    }
  
    addColumn(tableName, columnName, dataType) {
      this.data[tableName].columns[columnName] = dataType;
    }
  
    renameTable(oldTableName, newTableName) {
      this.data[newTableName] = this.data[oldTableName];
      delete this.data[oldTableName];
    }
  
    dropColumn(tableName, columnName) {
      delete this.data[tableName].columns[columnName];
    }
  
    renameColumn(tableName, oldColumnName, newColumnName) {
      const dataType = this.data[tableName].columns[oldColumnName];
      delete this.data[tableName].columns[oldColumnName];
      this.data[tableName].columns[newColumnName] = dataType;
    }
  
    dropTable(tableName) {
      delete this.data[tableName];
    }
  
    insertIntoTable(tableName, values) {
      const table = this.data[tableName];
      if (!table) {
        console.log(`La tabla "${tableName}" no existe.`);
        return;
      }
  
      const validColumns = Object.keys(table.columns);
      const insertedColumns = Object.keys(values);
  
      for (const column of insertedColumns) {
        if (!validColumns.includes(column)) {
          console.log(`La columna "${column}" no existe en la tabla "${tableName}".`);
          return;
        }
      }
  
      table.data.push(values);
    }
  
    selectFromTable(tableName, columns, condition = () => true) {
      const selectedData = this.data[tableName].data.filter(condition);
      if (columns.length === 0 || columns[0] === '*') {
        return selectedData;
      } else {
        return selectedData.map((row) => {
          const result = {};
          for (const column of columns) {
            result[column] = row[column];
          }
          return result;
        });
      }
    }
  
    updateTable(tableName, changes, condition) {
      const table = this.data[tableName];
      table.data.forEach((row) => {
        if (condition(row)) {
          for (const column in changes) {
            row[column] = changes[column];
          }
        }
      });
    }
  
    truncateTable(tableName) {
      this.data[tableName].data = [];
    }
  
    deleteFromTable(tableName, condition) {
      this.data[tableName].data = this.data[tableName].data.filter((row) => !condition(row));
    }
  
    printTableData(tableName) {
      const table = this.data[tableName];
      if (!table) {
        console.log(`La tabla "${tableName}" no existe.`);
        return;
      }
  
      const columns = Object.keys(table.columns);
  
      // Imprime los nombres de las columnas
      console.log(columns.join('\t'));
  
      // Itera a través de las filas de datos y muestra los valores
      for (const row of table.data) {
        const values = columns.map((column) => row[column]);
        console.log(values.join('\t'));
      }
    }
    getTable(tableName) {
      const table = this.data[tableName];
      if (!table) {
        return `La tabla "${tableName}" no existe.`;
      }

      const columns = Object.keys(table.columns);
      const columnWidths = {};

      // Encuentra el ancho máximo para cada columna
      for (const column of columns) {
        columnWidths[column] = column.length;
      }

      // Itera a través de las filas de datos y encuentra el ancho máximo de cada valor
      for (const row of table.data) {
        for (const column of columns) {
          const value = row[column] === null ? 'NULL' : row[column].toString();
          if (value.length > columnWidths[column]) {
            columnWidths[column] = value.length;
          }
        }
      }

      // Construye la representación de la tabla
      let tableStr = '';
      tableStr += '-'.repeat(tableStr.length) + '\n';
      tableStr += '| ';
      for (const column of columns) {
        tableStr += column.padEnd(columnWidths[column]) + ' | ';
      }
      tableStr += '\n';
      tableStr += '-'.repeat(tableStr.length) + '\n';

      // Itera a través de las filas de datos y agrega los valores a la cadena
      for (const row of table.data) {
        let rowStr = '| ';
        for (const column of columns) {
          const value = row[column] === null ? 'NULL' : row[column].toString();
          rowStr += value.padEnd(columnWidths[column]) + ' | ';
        }
        tableStr += rowStr + '\n';
      }

      return tableStr;
    }

  getTableAs(tableName, customHeaders = []) {
      const table = this.data[tableName];
      if (!table) {
        console.log(`La tabla "${tableName}" no existe.`);
        return;
      }
    
      const columns = Object.keys(table.columns);
    
      // Encuentra el ancho máximo para cada columna
      const columnWidths = {};
      for (const column of columns) {
        columnWidths[column] = column.length;
      }
    
      // Itera a través de las filas de datos y encuentra el ancho máximo de cada valor
      for (const row of table.data) {
        for (const column of columns) {
          const value = row[column] === null ? 'NULL' : row[column].toString();
          if (value.length > columnWidths[column]) {
            columnWidths[column] = value.length;
          }
        }
      }
    
      // Construye la representación de la tabla con encabezados personalizados
      let tableStr = '';
      tableStr += '-'.repeat(tableStr.length) + '\n';
      
      // Agrega los encabezados personalizados o usa los nombres de columna predeterminados
      let headerRow = '| ';
      if (customHeaders.length === columns.length) {
        for (let i = 0; i < columns.length; i++) {
          headerRow += customHeaders[i].padEnd(columnWidths[columns[i]]) + ' | ';
        }
      } else {
        for (const column of columns) {
          headerRow += column.padEnd(columnWidths[column]) + ' | ';
        }
      }
      tableStr += headerRow + '\n';
    
      tableStr += '-'.repeat(tableStr.length) + '\n';
    
      // Itera a través de las filas de datos y agrega los valores a la cadena
      for (const row of table.data) {
        let rowStr = '| ';
        for (const column of columns) {
          const value = row[column] === null ? 'NULL' : row[column].toString();
          rowStr += value.padEnd(columnWidths[column]) + ' | ';
        }
        tableStr += rowStr + '\n';
      }
    
      return tableStr;
    }

    RecorrerTabla(tableName) {
      const table = this.data[tableName];
      if (!table) {
        console.log(`La tabla "${tableName}" no existe.`);
        return;
      }
  
      const columns = Object.keys(table.columns);
  
      // Imprime los nombres de las columnas
      console.log(columns.join('\t'));
      for (const row of table.data) {
        console.log(columns.map((column) => row[column]));

      }
    }
    
    
}
  
 
module.exports = Database;