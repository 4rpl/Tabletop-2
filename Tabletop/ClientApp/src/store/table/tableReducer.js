import cardsReducer from './cardsReducer';
import decksReducer from './decksReducer';
import { TableActions } from './TableActions';

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
        default: {
            return {
                table: state.table || {
                    x: 0,
                    y: 0,
                    scale: 1,
                    w: 3000,
                    h: 1600
                },
                cards: cardsReducer(state.cards, action),
                decks: decksReducer(state.decks, action)
            };
        }
    }
}

export default tableReducer;