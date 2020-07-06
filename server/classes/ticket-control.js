
/*Toda clase es bueno que lleve su contructora par inicializarla
 el contructor es lo que va a inicializar la clase, por ejemplo 
 let ticketcontrol = new ticketControl
 cuando ejecuto arriba se inicializa el constructor
 */

const { json } = require('express');
const fs =  require('fs');


class Ticket{

    constructor(numero, escritorio){

        this.numero = numero;
        this.escritorio = escritorio;

    }

}

class TicketControl {

    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();
//para persistir los datos en caso de desconexión o pérdida de luz
//los guardamos en un texto nomás pa ejemplificar
        this.tickets = [];
        this.ultimos4 = [];


        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarConteo();
        }

    }

    siguiente(){

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);


        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }


    atenderTicket( escritorio ){
        //verificamos que haya algo que atender
        if( this.tickets.length === 0 ){
            return 'no hay tickets pendientes'
        }

        //sacamos el numero del arreglo, para deslindarlo del objeto 
        //rompemos relación con que todos los objetos son pasados por referencia
        let numeroTicket =  this.tickets[0].numero;
        
        //eliminamos primer posición para no acumular data
        this.tickets.shift();

        //sacamos/creamos nuevo ticket que vamos a atender
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //metemos el dato al inicio del arreglo de los últimos4
        //con unshift lo metemos al inicio, cada que se agrega, se mete al inicio y corre los demás
        this.ultimos4.unshift(atenderTicket);

        //si ya tiene más de 4 datos, porque vamos avanzando eliminamos del arreglo

        if( this.ultimos4.length > 4 ){
            this.ultimos4.splice(-1,1); //borra el último
        }

        console.log('Los últimos 4:');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo(){

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('se ha inicializado el sistema');
        this.grabarArchivo();
        
    }
    
    
    grabarArchivo(){

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
    
        //tenemos que mandar la información como string
        let jsonDataString = JSON.stringify(jsonData);
    
        //para guardar la información necesitamos el fs
        fs.writeFileSync( './server/data/data.json',jsonDataString );
        //              ('dóndeva',      quéquieresgrabar)
    
        
        
    }


}



module.exports = {
    
    TicketControl

}