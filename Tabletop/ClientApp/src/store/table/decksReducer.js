import { TableActions } from './TableActions';

function cardsReducer(state = [], action) {
    switch (action.type) {
        case TableActions.ADD_DECK: {
            return [
                ...state,
                {
                    id: action.id,
                    x: action.x,
                    y: action.y,
                    mx: action.mx,
                    my: action.my,
                    z: 100 + state.length + 1,
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
            return state.map(function (deck, _) {
                if (deck.z === action.z) {
                    return {
                        ...deck,
                        active: true,
                        mx: action.mx,
                        my: action.my
                    };
                } else {
                    return deck;
                }
            })
        }
        case TableActions.DECK_DOWN: {
            return state.map(function (deck) {
                if (deck.Id === action.Id) {
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
        default: {
            return state;
        }
    }
}

export default cardsReducer;