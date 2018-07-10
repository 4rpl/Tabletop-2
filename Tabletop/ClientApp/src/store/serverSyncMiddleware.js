import ServerSyncService from '../services/ServerSyncService';
import { TableActions, TableActionAccessTypes } from './table/TableActions';

export default function serverSyncMiddleware({ getState }) {

    return next => action => {
        const syncService = ServerSyncService.getInstance();

        const access = action.access;
        // Передавать лишние данные не нужно
        action.access = undefined;

        switch (access) {
            case TableActionAccessTypes.private: {
                next(action);
                break;
            }
            case TableActionAccessTypes.notification: {
                syncService.sendAction(action);
                next(action);
                break;
            }
            case TableActionAccessTypes.verificationRequired: {
                syncService.sendAction(action);
                break;
            }
            default: {
                console.error('Неизвестный тип доступа:', access);
                break;
            }
        }
    }
}