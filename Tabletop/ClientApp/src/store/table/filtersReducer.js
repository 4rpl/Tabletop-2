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
                    changes: null,
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
                    w: action.w,
                    changes: null,
                }
            ]
        }
        case TableActions.TOGGLE_FILTER_CHANGES: {
            return state.map(i => {
                return i.id === action.id ? {
                    ...i,
                    changes: action.isActive ? {
                        x: i.x,
                        y: i.y,
                        h: i.h,
                        w: i.w,
                        alpha: i.alpha,
                    } : null,
                } : i;
            });
        }
        case TableActions.SAVE_FILTER_CHANGES: {
            return state.map(i => {
                return i.id === action.id ? {
                    ...i,
                    x: action.x,
                    y: action.y,
                    h: action.h,
                    w: action.w,
                    alpha: action.alpha,
                    changes: null,
                } : i;
            });
        }
        case TableActions.SET_FILTER_CHANGES: {
            return state.map(i => {
                return i.changes ? {
                    ...i,
                    changes: {
                        ...i.changes,
                        x: action.x,
                        y: action.y,
                        h: action.h,
                        w: action.w,
                        alpha: action.alpha,
                    },
                } : i;
            });
        }
        case TableActions.SET_FILTER_CHANGE_FUNC: {
            return state.map(i => {
                return i.changes ? {
                    ...i,
                    changes: {
                        ...i.changes,
                        changeFunc: action.func,
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