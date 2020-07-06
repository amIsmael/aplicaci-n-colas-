const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();



io.on('connection', (client) => {


    client.on('siguienteTicket', (data, callback) =>{
        let siguiente =  ticketControl.siguiente();

        console.log(siguiente);
        callback(siguiente);

    });

    //emitir un evento 'estadoActual'
    client.emit('estadoActual',{
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    //esperamos el evento atender ticket, mandamos data e informamos qué sucedió
    client.on('atenderTicket', (data, callback)=>{
        
        //sino vienen el escritorio no podemos hacer nada, so callback
        if(!data.escritorio){
            return callback ({
                err:true,
                mensaje: 'necesitar un escritorio para asignar'
            });
        }

        //llamamos la función de atenderTicket que me regresa el ticket a atender
        let atenderTicket =  ticketControl.atenderTicket( data.escritorio );
        //                                                  ...(escritorio)


        //lo regresamos para que se pueda trabajar en el front-end
        callback(atenderTicket);
        //aquí ya sabemos que hay alguien que va a atender el ticket

        //a partir de aquí tenemos que lanzar evento para notificar en ultimos4

        client.broadcast.emit('ultimos4',{
            ultimos4: ticketControl.getUltimos4()
        });

    });

});