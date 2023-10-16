import express from 'express';
import * as bodyparser from "body-parser";  
import cors from 'cors';


var app=express();
app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));



app.post('/Analizar/', function (req, res) {

    var entrada=req.body.text1;
    console.log("si entre");
    console.log(entrada);

});


var server = app.listen(3000, function () {
    console.log('Servidor escuchando en puerto 5000...');
});


