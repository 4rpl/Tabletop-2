import cardsReducer from './cardsReducer';
import decksReducer from './decksReducer';
import usersReducer from './usersReducer';
import filtersReducer from './filtersReducer';
import cameraReducer from './cameraReducer';
import { TableActions } from './TableActions';

const _minScale = 0.4;
const _maxScale = 1;

function tableReducer(state = {}, action) {
    switch (action.type) {
        case TableActions.GET_TABLE: {
            return {
                table: {
                    w: action.w,
                    h: action.h
                },
                camera: cameraReducer(state.camera, action),
                users: usersReducer(state.users, action),
                filters: filtersReducer(state.filters, action),
                cards: cardsReducer(state.cards, action),
                decks: decksReducer(state.decks, action),
            }
        }
        default: {
            return {
                table: state.table || {},
                camera: cameraReducer(state.camera, action),
                users: usersReducer(state.users, action),
                filters: filtersReducer(state.filters, action),
                cards: cardsReducer(state.cards, action),
                decks: decksReducer(state.decks, action)
            };
        }
    }
}

export default tableReducer;