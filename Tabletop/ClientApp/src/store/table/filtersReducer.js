import { TableActions } from './TableActions';

function usersReducer(state = [], action) {
    switch (action.type) {
        case TableActions.ADD_FILTER: {
            return [
                ...state,
                {
                    id: action.id,
                    x: action.x,
                    y: action.y,
                    h: action.h,
                    w: action.w
                }
            ]
        }
        case TableActions.REMOVE_FILTER: {
            return state.filter(filter => filter.id !== action.id);
        }
        default: {
            return state;
        }
    }
}

export default usersReducer;