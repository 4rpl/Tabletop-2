import { TableActions } from './TableActions';

function tableReducer(state = { value: '', log: [], }, action) {
    switch (action.type) {
        case TableActions.GET_TABLE: {
            return {
                value: '',
                log: [
                    {
                        from: 'System',
                        color: '#ddd',
                        date: new Date(),
                        message: 'Successfully connected!',
                    },
                ]
            };
        }
        case TableActions.ADD_USER: {
            return {
                ...state,
                log: [
                    {
                        from: action.name,
                        color: action.color,
                        date: new Date(),
                        message: 'Has connected',
                    },
                    ...state.log,
                ],
            };
        }
        case TableActions.REMOVE_USER: {
            return {
                ...state,
                log: [
                    {
                        from: action.name,
                        color: '#ddd',
                        date: new Date(),
                        message: 'Has disconnected',
                    },
                    ...state.log,
                ],
            };
        }
        case TableActions.SEND_MESSAGE: {
            return {
                ...state,
                log: [
                    {
                        from: action.name,
                        color: action.color,
                        date: action.date,
                        message: action.message,
                    },
                    ...state.log,
                ],
                value: '',
            };
        }
        case TableActions.CHANGE_CHAT_INPUT: {
            return {
                ...state,
                value: action.value,
            };
        }
        default: {
            return state;
        }
    }
}

export default tableReducer;