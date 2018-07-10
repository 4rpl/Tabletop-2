import { TableActions } from './TableActions';

const _minScale = 0.4;
const _maxScale = 1;

function cameraReducer(state = {}, action) {
    switch (action.type) {
        case TableActions.GET_TABLE: {
            return {
                alpha: 0,
                scale: 1,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                ax: 0,
                ay: 0,
                mx: 0,
                my: 0,
            };
        }
        case TableActions.TABLE_SCALE: {
            if (state.scale >= _maxScale && action.scale > 0) {
                return state;
            }
            if (state.scale <= _minScale && action.scale < 0) {
                return state;
            }
            return {
                ...state,
                scale: state.scale + action.scale
            };
        }
        case TableActions.TABLE_MOVE: {
            return {
                ...state,
                ax: action.ax,
                ay: action.ay,
                vx: action.vx,
                vy: action.vy,
                x: action.x,
                y: action.y,
            };
        }
        case TableActions.TABLE_ROTATE: {
            return {
                ...state,
                alpha: action.alpha
            };
        }
        case TableActions.CURSOR_MOVE: {
            return {
                ...state,
                mx: action.x,
                my: action.y,
            };
        }
        default: {
            return state;
        }
    }
}

export default cameraReducer;