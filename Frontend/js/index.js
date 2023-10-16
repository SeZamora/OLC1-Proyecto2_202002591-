var contador=1;
function get_cont(){
    return contador++;
}

var vent_focus="pestana1";
function get_vent(){
    return vent_focus;
}

function set_vent(vent){
    vent_focus=vent;
}

var vent_focus2="pestana1";
function get_vent2(){
    return vent_focus2;
}

function set_vent2(vent){
    vent_focus2=vent;
}


var lista=new Array();
function linkedlist(pestana,nombre) {
    var obj=new Object();
    obj.pestana=pestana;
    obj.nombre=nombre;
    lista.push(obj);
}

function deletepes(pestana){
    console.log(pestana);
    for(var i=0;i<lista.length;i++){
        if(lista[i].pestana==pestana){
            delete lista[i];
        }
    }
    console.log("lista");
    console.log(lista);
    console.log("pesta");
    console.log(pestana);
}
var pestana_actual="pestana1";
/*--------------------------------------Funcion Al Cambiar Ventana---------------------------------------*/
function index(pestanias, pestana) {
    var id = pestana.replace('pestana', '');
    pestana_actual=pestana;
    set_vent('entrada' + id);
    set_vent2('salida' + id);
    var pestanna1 = document.getElementById(pestana);
    var listaPestannas = document.getElementById(pestanias);
    var cpestanna = document.getElementById('cpestana' + id);
    var listacPestannas = document.getElementById('contenido' + pestanias);

    var i = 0;
    while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined') {
        $(document).ready(function () {
            $(listacPestannas.getElementsByTagName('div')[i]).css('display', 'none');
            $(listaPestannas.getElementsByTagName('li')[i]).css('background', '');
            $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom', '');
        });
        i += 1;
    }

    $(document).ready(function () {
        $(cpestanna).css('display', '');
        $(pestanna1).css('background', '#70DB93');
        $(pestanna1).css('padding-bottom', '2px');
    });

    try {
        var act = document.getElementById('cpestana' + id);
        var tact = document.getElementById('entrada' + id);
        var tact2 = document.getElementById('salida' + id);

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        act.appendChild(tact2);

        var editor = CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "darcula",
            mode: "text/x-java"
        }).on('change', function (editor) {
            tact.value = editor.getValue();
        });

        var editor2 = CodeMirror(act, {
            lineNumbers: true,
            value: tact2.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "darcula",
            mode: "text/x-java"
        }).on('change', function (editor) {
        tact2.value = editor.getValue();
        });
    } catch (error) {}
}


/*---------------------------------------Funcion Agregar Pestania----------------------------------------*/
function agregar() {
  var x = get_cont();
  var lu = document.getElementById("lista");
  var li = document.createElement("li");
  li.setAttribute('id', 'pestana' + x);

  // Crea el enlace de pestaña
  var a = document.createElement("a");
  a.setAttribute('id', 'a' + x);
  a.setAttribute('href', 'javascript:index("pestanas", "pestana' + x + '")');
  a.text = 'pestana' + x;

  // Agrega el enlace a la pestaña
  li.appendChild(a);

  // Agrega la pestaña a la lista
  lu.appendChild(li);

  // Llama a la función index() para mostrar la pestaña activa
  index("pestanas", "pestana" + x);

  // Crea el elemento de contenido para la pestaña
  var contenido = document.getElementById("contenidopestanas");
  var divp = document.createElement("div");
  divp.setAttribute('id', 'cpestana' + x);
  divp.setAttribute('class', 'pestan');

  // Crea el primer textarea
  var ta1 = document.createElement("textarea");
  ta1.setAttribute('id', 'entrada' + x);
  ta1.setAttribute('name', 'entrada' + x);
  ta1.setAttribute('class', 'ta');
  ta1.setAttribute('style', 'display:none');

  divp.appendChild(ta1);

  // Crea el segundo textarea
  var ta2 = document.createElement("textarea");
  ta2.setAttribute('id', 'salida' + x);
  ta2.setAttribute('name', 'salida' + x);
  ta2.setAttribute('class', 'ta');
  ta2.setAttribute('style', 'display:none');

  divp.appendChild(ta2);

  // Agrega el elemento de contenido a la página
  contenido.appendChild(divp);

  // Inicializa los editores de texto para ambos textareas
  var editor1 = CodeMirror(divp, {
      lineNumbers: true,
      value: ta1.value,
      matchBrackets: true,
      styleActiveLine: true,
      theme: "darcula",
      mode: "text/x-java"
  }).on('change', function (editor) {
      ta1.value = editor.getValue();
  });

  var editor2 = CodeMirror(divp, {
      lineNumbers: true,
      value: ta2.value,
      matchBrackets: true,
      styleActiveLine: true,
      theme: "darcula",
      mode: "text/x-java"
  }).on('change', function (editor) {
      ta2.value = editor.getValue();
  });
}

function quitar() {

    try{
        var lu=document.getElementById("lista");
        lu.removeChild(document.getElementById(get_vent().replace("entrada","pestana")));
        var contenido=document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_vent().replace("entrada","cpestana")));
        contenido.removeChild(document.getElementById(get_vent().replace("salida","cpestana")));
        deletepes(get_vent());
    }catch(error){}
    
}

function copiar() {
    // Obtener el contenido de los textareas de entrada y salida
    var entrada = document.getElementById(get_vent()).value;
    var salida = document.getElementById(get_vent2());
  
    // Agregar el contenido de entrada al contenido de salida en la siguiente línea
    salida.value += entrada + '\n';
    index("pestanas", get_vent().replace("entrada","pestana"));


}



function analizar(){

    
    var ta = document.getElementById(get_vent());
    var contenido = ta.value;
    var url = "http://localhost:3000/Analizar/";


    $.post(url,{text1:contenido}, function(data,status){
        
        if (status.toString() == "success") {

            console.log("entre");

        }else{
            alert("Error estado de conexion: "+ status);
        }
    
    },"json");


    
}
