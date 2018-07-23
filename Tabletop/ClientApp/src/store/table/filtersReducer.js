import { TableActions } from './TableActions';

function usersReducer(state = [], action) {
    switch (action.type) {
        case TableActions.GET_TABLE: {
            return action.filters.map(filter => {
                return {
                    id: filter.id,
                    x: filter.x,
                    y: filter.y,
                    h: filter.h,
                    w: filter.w
                };
            });
        }
        case TableActions.ADD_FILTER: {
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    color: action.color,
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