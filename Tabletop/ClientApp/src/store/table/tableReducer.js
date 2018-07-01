import cardsReducer from './cardsReducer';
import decksReducer from './decksReducer';
import usersReducer from './usersReducer';
import filtersReducer from './filtersReducer';
import { TableActions } from './TableActions';

const _minScale = 0.4;
const _maxScale = 1;

function tableReducer(state = {}, action) {
    switch (action.type) {
        case TableActions.GET_TABLE: {
            return {
                table: state.table || {
                    x: 0,
                    y: 0,
                    scale: 1,
                    w: action.w,
                    h: action.h
                },
                users: action.users.map(user => {
                    return {
                        id: user.id,
                        name: user.name,
                        x: user.x,
                        y: user.y
                    };
                }),
                filters: action.filters.map(filter => {
                    return {
                        id: filter.id,
                        x: filter.x,
                        y: filter.y,
                        h: filter.h,
                        w: filter.w
                    };
                }),
                cards: action.cards.map(card => {
                    return {
                        id: card.id,
                        x: card.x,
                        y: card.y,
                        z: card.z,
                        mx: card.mx,
                        my: card.my,
                        h: card.h,
                        w: card.w,
                        active: card.active,
                        content: card.content
                    };
                }),
                decks: action.decks.map(deck => {
                    return {
                        id: deck.id,
                        x: deck.x,
                        y: deck.y,
                        z: deck.z,
                        mx: deck.mx,
                        my: deck.my,
                        h: deck.h,
                        w: deck.w,
                        active: deck.active,
                        content: deck.content,
                        length: deck.length
                    }
                })
            }
        }
        case TableActions.TABLE_SCALE: {
            if (state.table.scale >= _maxScale && action.scale > 0) {
                return state;
            }
            if (state.table.scale <= _minScale && action.scale < 0) {
                return state;
            }
            return {
                ...state,
                table: {
                    ...state.table,
                    scale: state.table.scale + action.scale
                }
            };
        }
        case TableActions.TABLE_MOUSE_UP: {
            return {
                ...state,
                table: {
                    ...state.table,
                    active: false
                }
            };
        }
        case TableActions.TABLE_MOUSE_DOWN: {
            return {
                ...state,
                table: {
                    ...state.table,
                    active: true,
                    mx: action.mx,
                    my: action.my
                }
            };
        }
        case TableActions.TABLE_MOVE: {
            return {
                ...state,
                table: {
                    ...state.table,
                    x: action.x,
                    y: action.y
                }
            };
        }
        default: {
            return {
                table: state.table || {
                    x: 0,
                    y: 0,
                    mx: 0,
                    my: 0,
                    scale: 1,
                    w: 3000,
                    h: 1600
                },
                users: usersReducer(state.users, action),
                filters: filtersReducer(state.filters, action),
                cards: cardsReducer(state.cards, action),
                decks: decksReducer(state.decks, action)
            };
        }
    }
}

export default tableReducer;