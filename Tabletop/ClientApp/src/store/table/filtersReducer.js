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
                    w: filter.w,
                    color: filter.color,
                    name: filter.name,
                    alpha: filter.alpha,
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
                    alpha: action.alpha,
                    x: action.x,
                    y: action.y,
                    h: action.h,
                    w: action.w
                }
            ]
        }
        case TableActions.TOGGLE_FILTER_CHANGES: {
            console.warn(action);
            return state.map(i => {
                return i.id === action.id ? {
                    ...i,
                    changes: action.isActive ? {
                        x: i.x,
                        y: i.y,
                        h: i.h,
                        w: i.w,
                    } : null,
                } : i;
            });
        }
        case TableActions.CHANGE_FILTER: {
            return state.map(i => {
                return i.id === action.id ? {
                    ...i,
                    isActive: action.isActive,
                } : i;
            });
        }
        case TableActions.SET_FILTER_CHANGES: {
            return state.map(i => {
                return i.id === action.id ? {
                    ...i,
                    changes: {
                        x: action.x,
                        y: action.y,
                        h: action.h,
                        w: action.w,
                    },
                } : i;
            });
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