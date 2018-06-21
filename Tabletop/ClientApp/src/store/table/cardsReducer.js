import { TableActions } from './TableActions';

function cardsReducer(state = [], action) {
    switch (action.type) {
        case TableActions.FLIP_CARD: {
            return state.map((card, _) => {
                return card.id === action.id
                    ? Object.assign({}, card, {
                        visible: !card.visible
                    })
                    : card;
            })
        }
        case TableActions.MOVE_CARD: {
            return state.map((card, _) => {
                if (card.id === action.id) {
                    return Object.assign({}, card, {
                        x: action.x,
                        y: action.y
                    });
                } else {
                    return card;
                }
            })
        }
        case TableActions.CARD_UP: {
            return state.map((card, _) => {
                if (card.z === action.z) {
                    return {
                        ...card,
                        active: true,
                        mx: action.mx,
                        my: action.my,
                        z: 100 + state.length
                    };
                } else if (card.z > action.z) {
                    return {
                        ...card,
                        z: card.z - 1
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
                    id: '1',
                    x: action.x,
                    y: action.y,
                    mx: action.mx,
                    my: action.my,
                    z: 100 + state.length + 1,
                    h: action.h,
                    w: action.w,
                    active: action.active,
                    visible: action.visible,
                    contentTop: action.contentTop,
                    contentBottom: action.contentBottom
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
        default: {
            return state;
        }
    }
}

export default cardsReducer;