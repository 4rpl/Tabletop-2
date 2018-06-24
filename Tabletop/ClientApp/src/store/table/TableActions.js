const GET_TABLE =           'GetTable';

const FLIP_CARD =           'FlipCard';
const MOVE_CARD =           'MoveCard';
const CARD_UP =             'CardUp';
const CARD_DOWN =           'CardDown';
const ADD_CARD =            'AddCard';
const REMOVE_CARD =         'RemoveCard';

const ADD_DECK =            'AddDeck';
const CHANGE_DECK =         'ChangeDeck';
const FLIP_DECK =           'FlipDeck';
const MOVE_DECK =           'MoveDeck';
const DECK_UP =             'DeckUp';
const DECK_DOWN =           'DeckDown';
const SHUFFLE_DECK =        'ShuffleDeck';
const TAKE_TOP_DECK_CARD =  'TakeTopDeckCard';
const REMOVE_DECK =         'RemoveDeck';

export const TableActions = {
    GET_TABLE,

    FLIP_CARD,
    MOVE_CARD,
    CARD_UP,
    CARD_DOWN,
    ADD_CARD,
    REMOVE_CARD,

    ADD_DECK,
    CHANGE_DECK,
    FLIP_DECK,
    MOVE_DECK,
    DECK_UP,
    DECK_DOWN,
    SHUFFLE_DECK,
    REMOVE_DECK,
    TAKE_TOP_DECK_CARD
}

export function flipCard(id) {
    return { type: FLIP_CARD, id };
}
export function moveCard(id, x, y) {
    return { type: MOVE_CARD, id, x, y };
}
export function cardUp(id, mx, my, z) {
    return { type: CARD_UP, id, mx, my, z };
}
export function cardDown(id, x, y) {
    return { type: CARD_DOWN, id, x, y };
}
export function addCard(id, x, y, mx, my, h, w, visible, active, contentTop, contentBottom) {
    return { type: ADD_CARD, id, x, y, mx, my, h, w, visible, active, contentTop, contentBottom };
}

export function flipDeck(id) {
    return { type: FLIP_DECK, id };
}
export function moveDeck(id, x, y) {
    return { type: MOVE_DECK, id, x, y };
}
export function deckUp(id, mx, my, z) {
    return { type: DECK_UP, id, mx, my, z };
}
export function deckDown(id, x, y, h, w) {
    return { type: DECK_DOWN, id, x, y, h, w };
}
export function shuffleDeck(id) {
    return { type: SHUFFLE_DECK, id };
}
export function takeTopDeckCard(id, mx, my) {
    return { type: TAKE_TOP_DECK_CARD, id, mx, my };
}