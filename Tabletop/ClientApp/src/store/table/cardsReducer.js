﻿import { TableActions } from './TableActions';
import Config from '../../config';

const initialZIndex = Config.zIndex.card;

function cardsReducer(state = [], action) {
    switch (action.type) {
        case TableActions.GET_TABLE: {
            return action.cards.map(card => {
                return {
                    id: card.id,
                    x: card.x,
                    y: card.y,
                    z: card.z,
                    mx: card.mx,
                    my: card.my,
                    alpha: card.alpha,
                    isOwner: action.isOwner,
                    h: card.h,
                    w: card.w,
                    active: card.active,
                    content: card.content
                };
            });
        }
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
                        mx: action.mx,
                        my: action.my,
                        alpha: action.alpha,
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
        case TableActions.CARD_GRAB: {
            return state.map(card => {
                const z = state.find(i => i.id === action.id).z;
                if (card.id === action.id) {
                    return {
                        ...card,
                        active: true,
                        isOwner: true,
                        mx: action.mx,
                        my: action.my,
                        alpha: action.alpha,
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
                    alpha: action.alpha,
                    z: initialZIndex + state.length,
                    h: action.h,
                    w: action.w,
                    active: false,
                    isOwner: action.isOwner,
                    content: action.content
                }
            ]
        }
        case TableActions.CARD_DROP: {
            return state.map(card => {
                if (card.id === action.id) {
                    return {
                        ...card,
                        active: false,
                        isOwner: false,
                    };
                } else {
                    return card;
                }
            });
        }
        case TableActions.REMOVE_CARD: {
            return state.filter(card => card.id !== action.id);
        }
        case TableActions.MOVE_CARD_ANG_CHANGE_CONTENT: {
            return state.map(card => {
                if (card.id === action.id) {
                    return {
                        ...card,
                        content: action.content,
                        x: action.x,
                        y: action.y,
                    };
                } else {
                    return card;
                }
            });
        }
        case TableActions.CHANGE_CARD_CONTENT: {
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
        case TableActions.REMOVE_USER: {
            if (!action.cardToDrop) {
                return state;
            }
            return state.map(card => {
                if (card.id === action.cardToDrop) {
                    return {
                        ...card,
                        active: false
                    };
                } else {
                    return card;
                }
            });
        }
        case TableActions.CREATE_DECK: {
            return state.filter(card => action.cardsToRemove.indexOf(card.id) === -1);
        }
        case TableActions.CARD_PUT_IN_DECK: {
            return state.filter(card => action.cardToRemove !== card.id);
        }
        case TableActions.TAKE_TOP_DECK_CARD: {
            if (action.bottomId) {
                return [
                    ...state,
                    {
                        id: action.bottomId,
                        x: action.x,
                        y: action.y,
                        mx: 0,
                        my: 0,
                        z: initialZIndex + state.length,
                        h: action.h,
                        w: action.w,
                        active: false,
                        isOwner: false,
                        content: action.bottomContent,
                    },
                    {
                        id: action.topId,
                        x: action.x,
                        y: action.y,
                        mx: action.mx,
                        my: action.my,
                        alpha: action.alpha,
                        z: initialZIndex + state.length + 1,
                        h: action.h,
                        w: action.w,
                        active: true,
                        isOwner: true,
                        content: action.topContent,
                    },
                ];
            }
            return [
                ...state,
                {
                    id: action.topId,
                    x: action.x,
                    y: action.y,
                    mx: action.mx,
                    my: action.my,
                    z: initialZIndex + state.length,
                    h: action.h,
                    w: action.w,
                    active: true,
                    isOwner: true,
                    content: action.topContent,
                },
            ];
        }
        default: {
            return state;
        }
    }
}

export default cardsReducer;