const OPEN_CONTEXT_MENU =               'OpenContextMenu';

const CHANGE_CHAT_INPUT =               'ChangeChatInput';
const SEND_MESSAGE =                    'SendMessage';

const GET_TABLE =                       'GetTable';

const ADD_USER =                        'AddUser';
const REMOVE_USER =                     'RemoveUser';
const MOVE_USER =                       'MoveUser';

const ADD_FILTER =                      'AddFilter';
const TOGGLE_FILTER_CHANGES =           'ToggleFilterChanges';
const SET_FILTER_CHANGES =              'SetFilterChanges';
const APPLY_FILTER_CHANGES =            'ApplyFilterChanges';
const REMOVE_FILTER =                   'RemoveFilter';

const TABLE_SCALE =                     'TableScale';
const TABLE_MOVE =                      'TableMove';
const TABLE_MOUSE_DOWN =                'TableMouseDown';
const TABLE_MOUSE_UP =                  'TableMouseUp';
const TABLE_ROTATE =                    'TableRotate';
const CURSOR_MOVE =                     'CursorMove';

const FLIP_CARD =                       'FlipCard';
const MOVE_CARD =                       'MoveCard';
const CARD_UP =                         'CardUp';
const CARD_DROP =                       'DropCard';
const ADD_CARD =                        'AddCard';
const REMOVE_CARD =                     'RemoveCard';
const CHANGE_CARD_CONTENT =             'ChangeCardContent';
const MOVE_CARD_ANG_CHANGE_CONTENT =    'MoveCardAndChangeContent';
const CARD_GRAB =                       'GrabCard';
const CARD_PUT_IN_DECK =                'PutCardInDeck';

const CREATE_DECK =                     'CreateDeck';
const ADD_DECK =                        'AddDeck';
const CHANGE_DECK =                     'ChangeDeck';
const FLIP_DECK =                       'FlipDeck';
const MOVE_DECK =                       'MoveDeck';
const DECK_UP =                         'DeckUp';
const DECK_DOWN =                       'DeckDown';
const DECK_DROP =                       'DropDeck';
const SHUFFLE_DECK =                    'ShuffleDeck';
const TAKE_TOP_DECK_CARD =              'TakeTopDeckCard';
const REMOVE_DECK =                     'RemoveDeck';
const HIDE_DECK_CONTENT =               'HideDeckContent';
const SHOW_DECK_CONTENT =               'ShowDeckContent';
const DECK_GRAB =                       'GrabDeck';
const DECK_MERGE =                      'MergeDecks';
const CHANGE_DECK_CONTENT =             'ChangeDeckContent';
const MOVE_DECK_AND_CHANGE_CONTENT =    'MoveDeckAndChangeContent';

export const TableActionAccessTypes = {
    // Приватное действие. Не отсылается на сервер, пропускается в редьюсер
    private: 'private',
    // Уведомление. Отсылается на сервер, пропускается в редьюсер. Ответа не ожидаем
    notification: 'notification',
    // Действие, требующее подтверждения. Отсылается на сервер, не пропускается в редьюсер
    verificationRequired: 'verificationRequired',
}

export const TableActions = {
    OPEN_CONTEXT_MENU,

    CHANGE_CHAT_INPUT,
    SEND_MESSAGE,

    GET_TABLE,

    ADD_USER,
    REMOVE_USER,
    MOVE_USER,

    ADD_FILTER,
    TOGGLE_FILTER_CHANGES,
    SET_FILTER_CHANGES,
    APPLY_FILTER_CHANGES,
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
    CHANGE_CARD_CONTENT,
    MOVE_CARD_ANG_CHANGE_CONTENT,

    CREATE_DECK,
    ADD_DECK,
    CHANGE_DECK,
    FLIP_DECK,
    MOVE_DECK,
    DECK_UP,
    DECK_GRAB,
    DECK_DOWN,
    DECK_DROP,
    SHUFFLE_DECK,
    REMOVE_DECK,
    HIDE_DECK_CONTENT,
    SHOW_DECK_CONTENT,
    TAKE_TOP_DECK_CARD,
    CARD_PUT_IN_DECK,
    DECK_MERGE,
    CHANGE_DECK_CONTENT,
    MOVE_DECK_AND_CHANGE_CONTENT,
}

export function openContextMenu(x, y, menuItems) {
    return { type: OPEN_CONTEXT_MENU, access: TableActionAccessTypes.private, x, y, menuItems };
}

export function addFilter(x, y, h, w, alpha) {
    return { type: ADD_FILTER, access: TableActionAccessTypes.verificationRequired, x, y, h, w, alpha };
}
export function setFilterActive(id, isActive) {
    return { type: TOGGLE_FILTER_CHANGES, access: TableActionAccessTypes.private, id, isActive };
}
export function setFilterChange(id, x, y, w, h, alpha) {
    return { type: SET_FILTER_CHANGES, access: TableActionAccessTypes.private, id, x, y, w, h, alpha };
}
export function removeFilter(id) {
    return { type: REMOVE_FILTER, id };
}

export function sendMessage(message) {
    return { type: SEND_MESSAGE, access: TableActionAccessTypes.verificationRequired, message };
}
export function changeChatInput(value) {
    return { type: CHANGE_CHAT_INPUT, access: TableActionAccessTypes.private, value };
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
    return { type: FLIP_DECK, access: TableActionAccessTypes.verificationRequired, id };
}
export function moveDeck(id, x, y) {
    return { type: MOVE_DECK, access: TableActionAccessTypes.notification, id, x, y };
}
export function deckUp(id, alpha, mx, my, z) {
    return { type: DECK_UP, access: TableActionAccessTypes.verificationRequired, id, alpha, mx, my, z };
}
export function deckDown(id, x, y, h, w) {
    return { type: DECK_DOWN, access: TableActionAccessTypes.verificationRequired, id, x, y, h, w };
}
export function shuffleDeck(id) {
    return { type: SHUFFLE_DECK, access: TableActionAccessTypes.verificationRequired, id };
}
export function takeTopDeckCard(id, alpha, mx, my) {
    return { type: TAKE_TOP_DECK_CARD, access: TableActionAccessTypes.verificationRequired, id, alpha, mx, my };
}