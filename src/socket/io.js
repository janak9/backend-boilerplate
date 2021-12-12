import socketio from 'socket.io';
import { logging } from '../helper/logging';
import * as events from './events';
import * as handlers from './handlers';

const io = socketio();

io.on('connection', socket => {
    socket.on(events.FRONTEND_ONLINE, async (data) => {
        logging.log('FRONTEND_ONLINE...', data);
        handlers.online(socket, data);
    });

    socket.on(events.FRONTEND_DISCONNECT, (data) => {
        logging.log('FRONTEND_DISCONNECT...');
        handlers.disconnect(socket, data);
    });
});

export default io;
