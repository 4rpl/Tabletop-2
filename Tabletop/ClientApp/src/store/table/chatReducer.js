import { TableActions } from './TableActions';

function tableReducer(state = [], action) {
    switch (action.type) {
        case TableActions.GET_TABLE: {
            return [
                {
                    from: 'System',
                    color: '#ddd',
                    date: new Date(),
                    message: 'Successfully connected!',
                },
            ];
        }
        case TableActions.ADD_USER: {
            return [
                {
                    from: action.name,
                    color: action.color,
                    date: new Date(),
                    message: 'Has connected',
                },
                ...state,
            ];
        }
        case TableActions.REMOVE_USER: {
            return [
                {
                    from: action.name,
                    color: '#ddd',
                    date: new Date(),
                    message: 'Has disconnected',
                },
                ...state,
            ];
        }
        case TableActions.SEND_MESSAGE: {
            return [
                {
                    from: action.name,
                    color: action.color,
                    date: action.date,
                    message: action.message,
                },
                ...state,
            ];
        }
        default: {
            return state;
        }
    }
}

export default tableReducer;