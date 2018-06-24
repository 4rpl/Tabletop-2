﻿import React from 'react';
import { connect } from 'react-redux';
import { flipCard, moveCard, cardUp, cardDown } from '../store/table/TableActions';
import CallbackService from '../services/CallbackService';

const mapStateToProps = state =>
{
    return { state }
};

const mapDispatchToProps = function (dispatch) {
    return {
        onFlipCard: (id) => {
            dispatch(flipCard(id));
        },
        onMoveCard: (id, x, y) => {
            dispatch(moveCard(id, x, y));
        },
        onCardUp: (id, mx, my, z) => {
            dispatch(cardUp(id, mx, my, z));
        },
        onCardDown: (id, x, y) => {
            dispatch(cardDown(id, x, y));
        }
    }
}

const Card = function ({ id, x, y, mx, my, z, h, w, active, visible, content, onFlipCard, onMoveCard, onCardUp, onCardDown }) {

    let callbackService = CallbackService.getInstance();

    function MouseDown(e) {
        //console.log('Down', id);
        if (e.button === 0) {
            onCardUp(id, x - e.clientX, y - e.clientY, z);
            callbackService.onMouseUp(id, MouseUp);
            callbackService.onMouseMove(id, MouseMove.bind(null, x - e.clientX, y - e.clientY));
        }
        e.stopPropagation();
        return false;
    }

    function OnContextMenu(e) {
        e.preventDefault();
        onFlipCard(id);
        return false;
    }

    function MouseMove(mx, my, e) {
        //console.log('Move', id);
        onMoveCard(id, e.clientX + mx, e.clientY + my);
        return false;
    }

    function MouseUp(e) {
        //console.log('Up', id);
        onCardDown(id, x, y);
        callbackService.unsubscribeOnMouseUp(id);
        callbackService.unsubscribeOnMouseMove(id);
        return false;
    }

    return (
        <div
            style={{ top: y, left: x, width: w, height: h, zIndex: z }}
            onMouseDown={MouseDown}
            onContextMenu={OnContextMenu}
            className={'card noselect ' + (active ? 'grabbed' : '')}>
            <img alt={content} src={process.env.PUBLIC_URL + content} />
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);