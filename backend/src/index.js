"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyparser = __importStar(require("body-parser"));
var cors_1 = __importDefault(require("cors"));

var prueba = require("./prueba.js");

var app = express_1.default();
app.use(bodyparser.json());
app.use(cors_1.default());
app.use(bodyparser.urlencoded({ extended: true }));

app.post('/Analizar/', function (req, res) {
    var entrada = req.body.text1;
    var resultado = prueba(entrada);
    //console.log(resultado);
    res.json(resultado);

});

var server = app.listen(9000, function () {
    console.log('Servidor escuchando en puerto 9000...');
});