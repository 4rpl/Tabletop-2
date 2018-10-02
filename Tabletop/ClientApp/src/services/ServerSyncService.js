import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

export default class ServerSyncService {

    static instance = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = new ServerSyncService();
        }
        return this.instance;
    }

    hubUrl = '/game';
    __hubConnection = null;
    __connected = false;

    onMessage = () => { }

    async connect() {
        this.__hubConnection = new HubConnectionBuilder()
            .withUrl(this.hubUrl)
            .configureLogging(LogLevel.Information)
            .build();

        this.__hubConnection.on('PerformAction', action => {
            this.onMessage(action)
        });

        await this.__hubConnection.start();

        this.__connected = true;
        let name = '';
        while (!name) {
            name = prompt('Имя?');
        }
        this.__hubConnection.invoke('connect', { name });
    }

    async sendAction(action) {
        if (!this.__hubConnection && !this.__connected) {
            await this.connect();
        }
        if (!this.__hubConnection || !this.__connected) {
            throw "ServerSyncService: socket is not connected";
        }
        //console.log('sending:', action);
        this.__hubConnection.invoke(action.type, action);
    }

    closeConnection = () => {
        if (!this.__hubConnection || !this.__connected) {
            console.error("ServerSyncService: socket is not connected");
            return;
        }
        this.__hubConnection.close(1000, "Closing from client");
    }
}