export default class ServerSyncService {

    static instance = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = new ServerSyncService();
            this.instance.connect();
        }
        return this.instance;
    }

    connect = () => {
        this.__socket = new WebSocket('wss://localhost:44344/api/Table/RequestSession');
        this.__socket.onopen = event => {
            this.onOpen(event);
        };
        this.__socket.onclose = event => {
            this.onClose(event);
        };
        this.__socket.onerror = event => {
            this.onError(event);
        };
        this.__socket.onmessage = event => {
            this.onMessage(event);
        };
    }

    onMessage = (event) => { };
    onError = (event) => { };
    onOpen = (event) => { };
    onClose = (event) => { };

    sendAction = action => {
        if (!this.__socket || this.__socket.readyState !== WebSocket.OPEN) {
            console.error("ServerSyncService: socket is not connected");
            return;
        }
        let payload = JSON.stringify(action);
        this.__socket.send(payload);
    }

    closeConnection = () => {
        if (!this.__socket || this.__socket.readyState !== WebSocket.OPEN) {
            console.error("ServerSyncService: socket is not connected");
            return;
        }
        this.__socket.close(1000, "Closing from client");
    }
}