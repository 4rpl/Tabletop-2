import ServerSyncService from '../services/ServerSyncService';
import { TableActions } from './table/TableActions';

export default function serverSyncMiddleware({ getState }) {

    return next => action => {
        if (action.enforce) {
            next(action);
        } else {
            let syncService = ServerSyncService.getInstance();
            switch (action.type) {
                default: {
                    syncService.sendAction(action);
                    break;
                }
            }
        }
    }
}