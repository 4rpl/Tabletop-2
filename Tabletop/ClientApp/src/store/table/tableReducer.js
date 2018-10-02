import cardsReducer from './cardsReducer';
import decksReducer from './decksReducer';
import usersReducer from './usersReducer';
import filtersReducer from './filtersReducer';
import cameraReducer from './cameraReducer';
import chatReducer from './chatReducer';
import { TableActions } from './TableActions';

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
                chat: chatReducer(state.chat, action),
            }
        }
        case TableActions.OPEN_CONTEXT_MENU: {
            return {
                ...state,
                contextMenu: {
                    x: action.x,
                    y: action.y,
                    menuItems: action.menuItems,
                }
            }
        }
        default: {
            return {
                table: state.table || {},
                contextMenu: state.contextMenu || {},
                camera: cameraReducer(state.camera, action),
                users: usersReducer(state.users, action),
                filters: filtersReducer(state.filters, action),
                cards: cardsReducer(state.cards, action),
                decks: decksReducer(state.decks, action),
                chat: chatReducer(state.chat, action),
            };
        }
    }
}

export default tableReducer;