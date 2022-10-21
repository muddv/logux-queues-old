import { Server } from '@logux/server';
import { SUBPROTOCOL } from '../protocol/protocol.js';
const SERVER = new Server(Server.loadOptions(process, {
    subprotocol: SUBPROTOCOL,
    supports: SUBPROTOCOL,
    fileUrl: import.meta.url
}));
SERVER.auth(({ userId, cookie }) => {
    if (userId === "10") {
        return true;
    }
    else {
        return cookie['token'] === 'good';
    }
});
SERVER.autoloadModules();
SERVER.listen();
