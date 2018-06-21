import ServerSyncService from '../services/ServerSyncService';

export default function serverSyncMiddleware({ getState }) {

    return next => action => {
        if (action.enforce) {
            next(action);
        } else {
            let syncService = ServerSyncService.getInstance();
            syncService.sendAction(action);
        }
    }
}