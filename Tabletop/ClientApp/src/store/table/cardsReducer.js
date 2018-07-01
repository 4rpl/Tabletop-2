import { TableActions } from './TableActions';
import Config from '../../config';

const initialZIndex = Config.zIndex.card;

function cardsReducer(state = [], action) {
    switch (action.type) {
        case TableActions.FLIP_CARD: {
            return state.map((card, _) => {
                return card.id === action.id
                    ? {
                        ...card,
                        content: action.content
                    }
                    : card;
            })
        }
        case TableActions.MOVE_CARD: {
            return state.map((card, _) => {
                if (card.id === action.id) {
                    return {
                        ...card,
                        x: action.x,
                        y: action.y
                    };
                } else {
                    return card;
                }
            })
        }
        case TableActions.CARD_UP: {
            return state.map(card => {
                const z = state.find(i => i.id === action.id).z;
                if (card.id === action.id) {
                    return {
                        ...card,
                        active: true,
                        isOwner: action.isOwner,
                        mx: action.mx,
                        my: action.my,
                        z: initialZIndex + state.length
                    };
                } else if (card.z > z) {
                    return {
                        ...card,
                        z: card.z - 1
                    }
                } else {
                    return card;
                }
            });
        }
        case TableActions.ADD_CARD: {
            return [
                ...state,
                {
                    id: action.id,
                    x: action.x,
                    y: action.y,
                    mx: action.mx,
                    my: action.my,
                    z: initialZIndex + state.length,
                    h: action.h,
                    w: action.w,
                    active: action.active,
                    isOwner: action.isOwner,
                    content: action.content
                }
            ]
        }
        case TableActions.CARD_DOWN: {
            return state.map(card => {
                if (card.id === action.id) {
                    return {
                        ...card,
                        active: false
                    };
                } else {
                    return card;
                }
            });
        }
        case TableActions.REMOVE_CARD: {
            return state.filter(card => card.id !== action.id);
        }
        case TableActions.HIDE_CARD_CONTENT: {
            return state.map(card => {
                if (card.id === action.id) {
                    return {
                        ...card,
                        content: 'Cards/placeholder.png'
                    };
                } else {
                    return card;
                }
            });
        }
        case TableActions.SHOW_CARD_CONTENT: {
            return state.map(card => {
                if (card.id === action.id) {
                    return {
                        ...card,
                        content: action.content
                    };
                } else {
                    return card;
                }
            });
        }
        default: {
            return state;
        }
    }
}

export default cardsReducer;