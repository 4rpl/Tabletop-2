import { TableActions } from './TableActions';

function usersReducer(state = [], action) {
    switch (action.type) {
        case TableActions.GET_TABLE: {
            return action.users.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    x: user.x,
                    y: user.y,
                    color: user.color,
                };
            });
        }
        case TableActions.ADD_USER: {
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    x: action.x,
                    y: action.y,
                    color: action.color,
                }
            ]
        }
        case TableActions.MOVE_USER: {
            return state.map(user => {
                return user.id === action.id
                    ? {
                        ...user,
                        x: action.x,
                        y: action.y
                    }
                    : user;
            })
        }
        case TableActions.REMOVE_USER: {
            return state.filter(user => user.id !== action.id);
        }
        case TableActions.MOVE_CARD: {
            return state.map(user => {
                return user.id === action.userId
                    ? {
                        ...user,
                        x: action.x - action.mx,
                        y: action.y - action.my,
                    }
                    : user;
            });
        }
        case TableActions.MOVE_DECK: {
            return state.map(user => {
                return user.id === action.userId
                    ? {
                        ...user,
                        x: action.x - action.mx,
                        y: action.y - action.my,
                    }
                    : user;
            });
        }
        default: {
            return state;
        }
    }
}

export default usersReducer;