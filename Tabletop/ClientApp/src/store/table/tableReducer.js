import cardsReducer from './cardsReducer';
import { TableActions } from './TableActions';

function tableReducer(state = {}, action) {
    switch (action.type) {
        case TableActions.EMPTY: {
            return state;
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
                //decks: decks(state.decks, action)
            };
        }
    }
}

export default tableReducer;