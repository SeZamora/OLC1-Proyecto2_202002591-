var fechaString = "2020-10-10";
var fecha = new Date(fechaString);
var fechas = fecha
fechas.setDate(fechas.getDate() + 11);
console.log(fechas);