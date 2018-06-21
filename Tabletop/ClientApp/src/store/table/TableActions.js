const FLIP_CARD = 'FLIP_CARD';
const MOVE_CARD = 'MOVE_CARD';
const CARD_UP = 'CARD_UP';
const CARD_DOWN = 'CARD_DOWN';
const ADD_CARD = 'ADD_CARD';

export const TableActions = {
    FLIP_CARD,
    MOVE_CARD,
    CARD_UP,
    CARD_DOWN,
    ADD_CARD
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