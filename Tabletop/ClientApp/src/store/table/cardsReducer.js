import { TableActions } from './TableActions';

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
            return state.map((card, _) => {
                if (card.id === action.id) {
                    return {
                        ...card,
                        active: true,
                        mx: action.mx,
                        my: action.my
                    };
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
                    z: 100 + state.length + 1,
                    h: action.h,
                    w: action.w,
                    active: action.active,
                    content: action.content
                }
            ]
        }
        case TableActions.CARD_DOWN: {
            return state.map(card => {
                if (card.Id === action.Id) {
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
        default: {
            return state;
        }
    }
}

export default cardsReducer;