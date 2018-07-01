﻿import { TableActions } from './TableActions';

function usersReducer(state = [], action) {
    switch (action.type) {
        case TableActions.ADD_USER: {
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    x: action.x,
                    y: action.y
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
        default: {
            return state;
        }
    }
}

export default usersReducer;