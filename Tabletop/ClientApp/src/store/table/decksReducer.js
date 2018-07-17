import { TableActions } from './TableActions';
import Config from '../../config';

const initialZIndex = Config.zIndex.deck;

function cardsReducer(state = [], action) {
    switch (action.type) {
        case TableActions.GET_TABLE: {
            return action.decks.map(deck => {
                return {
                    id: deck.id,
                    x: deck.x,
                    y: deck.y,
                    z: deck.z,
                    mx: deck.mx,
                    my: deck.my,
                    alpha: deck.alpha,
                    h: deck.h,
                    w: deck.w,
                    active: deck.active,
                    content: deck.content,
                    length: deck.length,
                };
            });
        }
        case TableActions.ADD_DECK: {
            return [
                ...state,
                {
                    id: action.id,
                    x: action.x,
                    y: action.y,
                    mx: action.mx,
                    my: action.my,
                    alpha: action.alpha,
                    z: initialZIndex + state.length,
                    h: action.h,
                    w: action.w,
                    active: action.active,
                    content: action.content,
                    length: action.length
                }
            ]
        }
        case TableActions.FLIP_DECK: {
            return state.map((deck, _) => {
                if (deck.id === action.id) {
                    return {
                        ...deck,
                        content: action.content
                    }
                } else {
                    return deck;
                }
            });
        }
        case TableActions.MOVE_DECK: {
            return state.map((deck, _) => {
                if (deck.id === action.id) {
                    return {
                        ...deck,
                        x: action.x,
                        y: action.y
                    };
                } else {
                    return deck;
                }
            })
        }
        case TableActions.DECK_UP: {
            const z = state.find(i => i.id === action.id).z;
            return state.map(deck => {
                if (deck.id === action.id) {
                    return {
                        ...deck,
                        active: true,
                        mx: action.mx,
                        my: action.my,
                        alpha: action.alpha,
                        z: initialZIndex + state.length
                    };
                } else if (deck.z > z) {
                    return {
                        ...deck,
                        z: deck.z - 1
                    }
                } else {
                    return deck;
                }
            })
        }
        case TableActions.DECK_GRAB: {
            return state.map(deck => {
                const z = state.find(i => i.id === action.id).z;
                if (deck.id === action.id) {
                    return {
                        ...deck,
                        active: true,
                        isOwner: true,
                        mx: action.mx,
                        my: action.my,
                        alpha: action.alpha,
                        z: initialZIndex + state.length
                    };
                } else if (deck.z > z) {
                    return {
                        ...deck,
                        z: deck.z - 1
                    }
                } else {
                    return deck;
                }
            });
        }
        case TableActions.DECK_DOWN: {
            return state.map(function (deck) {
                if (deck.id === action.id) {
                    return {
                        ...deck,
                        active: false
                    };
                } else {
                    return deck;
                }
            });
        }
        case TableActions.DECK_DROP: {
            return state.map(deck => {
                if (deck.id === action.id) {
                    return {
                        ...deck,
                        active: false
                    };
                } else {
                    return deck;
                }
            });
        }
        case TableActions.SHUFFLE_DECK: {
            return state.map(function (deck) {
                if (deck.id === action.id) {
                    return {
                        ...deck,
                        content: action.content
                    };
                } else {
                    return deck;
                }
            });
        }
        case TableActions.REMOVE_DECK: {
            return state.filter(deck => deck.id !== action.id);
        }
        case TableActions.CHANGE_DECK: {
            return state.map(deck => {
                if (deck.id === action.id) {
                    return {
                        ...deck,
                        length: action.length,
                        content: action.content
                    }
                } else {
                    return deck;
                }
            });
        }
        case TableActions.TAKE_TOP_DECK_CARD: {
            if (action.bottomId) {
                return state.filter(i => i.id !== action.deckId);
            }
            return state.map(deck => {
                if (deck.id === action.deckId) {
                    return {
                        ...deck,
                        length: deck.length - 1,
                        content: action.bottomContent,
                    }
                } else {
                    return deck;
                }
            });
        }
        case TableActions.HIDE_DECK_CONTENT: {
            return state.map(deck => {
                if (deck.id === action.id) {
                    return {
                        ...deck,
                        content: null
                    };
                } else {
                    return deck;
                }
            });
        }
        case TableActions.SHOW_DECK_CONTENT: {
            return state.map(deck => {
                if (deck.id === action.id) {
                    return {
                        ...deck,
                        content: action.content
                    };
                } else {
                    return deck;
                }
            });
        }
        case TableActions.REMOVE_USER: {
            if (!action.deckToDrop) {
                return state;
            }
            return state.map(deck => {
                if (deck.id === action.id) {
                    return {
                        ...deck,
                        active: false
                    };
                } else {
                    return deck;
                }
            });
        }
        case TableActions.CREATE_DECK: {
            const deck = action.deck;
            return [
                ...state,
                {
                    id: deck.id,
                    x: deck.x,
                    y: deck.y,
                    z: deck.z,
                    alpha: action.alpha,
                    mx: 0,
                    my: 0,
                    h: deck.h,
                    w: deck.w,
                    active: deck.active,
                    content: deck.content,
                    length: deck.length
                }
            ]
        }
        case TableActions.CARD_PUT_IN_DECK: {
            return state.map(deck => {
                if (deck.id === action.deckId) {
                    return {
                        ...deck,
                        content: action.content,
                        length: action.deckLength,
                    };
                } else {
                    return deck;
                }
            });
        }
        case TableActions.DECK_MERGE: {
            const top = state.find(i => i.id === action.topDeckId);
            const bottom = state.find(i => i.id === action.bottomDeckId);
            return [
                ...state.filter(i => i.id !== top.id && i.id !== bottom.id),
                {
                    ...bottom,
                    content: bottom.content ? top.content : null,
                    length: bottom.length + top.length,
                }
            ];
        }
        default: {
            return state;
        }
    }
}

export default cardsReducer;