

// Comando para establecer conexión 
var socket = io();

var lable =  $('#lblNuevoTicket');


//para saber cuando ya se conectó socket al server
socket.on('connect', function(){
    console.log('Conectado al servidor');
});

//para saber cuando si se desconecta el socket del server
socket.on('disconnect', function(){
// ON para ESCUCHAR INFORMACIÓN/SUCESOS 
    console.log('Perdimos la conexión con el servidor');
});

socket.on('estadoActual',function( respuesta ){
    console.log(respuesta);
    lable.text( respuesta.actual );

});


$('button').on('click', function(){
    
    socket.emit('siguienteTicket',null, function(siguienteTicket){

        lable.text(siguienteTicket);



    });
    
});