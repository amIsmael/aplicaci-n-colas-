

// Comando para establecer conexión 
var socket = io();

//obtenemos parámetros del url
//función para javascript

var searchParams = new URLSearchParams( window.location.search );

//si (la ruta .contiene ('escritorio') ) {....}
if( !searchParams.has( 'escritorio' ) ){
    window.location = 'index.html';
    throw new Error('el escritorio es necesario');
    
}
var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);

$('h1').text('escritorio ' + escritorio);

$('button').on('click', function(){
    
    socket.emit('atenderTicket', { escritorio: escritorio }, function( resp ){

        label.text('Ticket ' + resp.numero );
        if (resp === 'no hay tickets pendientes'){
            label.text(resp);
            alert(resp);
            return;
        }


    });

});