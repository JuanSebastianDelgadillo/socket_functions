const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket', (mensaje, callback) => {

        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    client.emit('actualTicket', {
        actual: ticketControl.ticketActual()
    });

    client.emit('getUltimos4', {
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTickets(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    });

});