const GET_TABLE =           'GetTable';

const ADD_USER =            'AddUser';
const REMOVE_USER =         'RemoveUser';
const MOVE_USER =           'MoveUser';

const ADD_FILTER =          'AddFilter';
const REMOVE_FILTER =       'RemoveFilter';

const TABLE_SCALE =         'TableScale';
const TABLE_MOVE =          'TableMove';
const TABLE_MOUSE_DOWN =    'TableMouseDown';
const TABLE_MOUSE_UP =      'TableMouseUp';
const TABLE_ROTATE =        'TableRotate';
const CURSOR_MOVE =         'CursorMove';

const FLIP_CARD =           'FlipCard';
const MOVE_CARD =           'MoveCard';
const CARD_UP =             'CardUp';
const CARD_DROP =           'DropCard';
const ADD_CARD =            'AddCard';
const REMOVE_CARD =         'RemoveCard';
const HIDE_CARD_CONTENT =   'HideCardContent';
const SHOW_CARD_CONTENT =   'ShowCardContent';
const CARD_GRAB =           'GrabCard';

const ADD_DECK =            'AddDeck';
const CHANGE_DECK =         'ChangeDeck';
const FLIP_DECK =           'FlipDeck';
const MOVE_DECK =           'MoveDeck';
const DECK_UP =             'DeckUp';
const DECK_DOWN =           'DeckDown';
const SHUFFLE_DECK =        'ShuffleDeck';
const TAKE_TOP_DECK_CARD =  'TakeTopDeckCard';
const REMOVE_DECK =         'RemoveDeck';
const HIDE_DECK_CONTENT =   'HideDeckContent';
const SHOW_DECK_CONTENT =   'ShowDeckContent';

export const TableActionAccessTypes = {
    // Приватное действие. Не отсылается на сервер, пропускается в редьюсер
    private: 'private',
    // Уведомление. Отсылается на сервер, пропускается в редьюсер. Ответа не ожидаем
    notification: 'notification',
    // Действие, требующее подтверждения. Отсылается на сервер, не пропускается в редьюсер
    verificationRequired: 'verificationRequired',
}

export const TableActions = {
    GET_TABLE,

    ADD_USER,
    REMOVE_USER,
    MOVE_USER,

    ADD_FILTER,
    REMOVE_FILTER,

    TABLE_SCALE,
    TABLE_MOVE,
    TABLE_MOUSE_DOWN,
    TABLE_MOUSE_UP,
    TABLE_ROTATE,
    CURSOR_MOVE,

    FLIP_CARD,
    MOVE_CARD,
    CARD_UP,
    CARD_GRAB,
    CARD_DROP,
    ADD_CARD,
    REMOVE_CARD,
    HIDE_CARD_CONTENT,
    SHOW_CARD_CONTENT,

    ADD_DECK,
    CHANGE_DECK,
    FLIP_DECK,
    MOVE_DECK,
    DECK_UP,
    DECK_DOWN,
    SHUFFLE_DECK,
    REMOVE_DECK,
    HIDE_DECK_CONTENT,
    SHOW_DECK_CONTENT,
    TAKE_TOP_DECK_CARD
}

export function addFilter(x, y, h, w) {
    return { type: ADD_FILTER, x, y, h, w };
}
export function removeFilter(id) {
    return { type: REMOVE_FILTER, id };
}

export function tableScale(scale) {
    return { type: TABLE_SCALE, access: TableActionAccessTypes.private, scale };
}
export function tableMove(ax, ay, vx, vy, x, y) {
    return { type: TABLE_MOVE, access: TableActionAccessTypes.private, ax, ay, vx, vy, x, y };
}
export function tableRotate(alpha, x, y) {
    return { type: TABLE_ROTATE, access: TableActionAccessTypes.private, alpha, x, y };
}
export function moveCursor(x, y) {
    return { type: CURSOR_MOVE, access: TableActionAccessTypes.private, x, y }
}
export function moveUser(x, y) {
    return { type: MOVE_USER, access: TableActionAccessTypes.notification, x, y }
}

export function flipCard(id) {
    return { type: FLIP_CARD, access: TableActionAccessTypes.verificationRequired, id };
}
export function moveCard(id, x, y) {
    return { type: MOVE_CARD, access: TableActionAccessTypes.notification, id, x, y };
}
export function cardUp(id, alpha, mx, my, z) {
    return { type: CARD_UP, access: TableActionAccessTypes.verificationRequired, id, alpha, mx, my, z };
}
export function cardDown(id, x, y) {
    return { type: CARD_DROP, access: TableActionAccessTypes.verificationRequired, id, x, y };
}
export function addCard(id, x, y, mx, my, h, w, visible, active, contentTop, contentBottom) {
    return { type: ADD_CARD, access: TableActionAccessTypes.verificationRequired, id, x, y, mx, my, h, w, visible, active, contentTop, contentBottom };
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