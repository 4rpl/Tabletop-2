import React from 'react';
import { connect } from 'react-redux';
import { flipCard, moveCard, cardUp, cardDown } from '../store/table/TableActions';

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

const Card = function ({ id, x = 0, y = 0, mx = 0, my = 0, z = id, h = 142, w = 102, active = false, visible = false, contentTop = 'TOP', contentBottom = 'BOTTOM', onFlipCard, onMoveCard, onCardUp, onCardDown }) {

    function MouseDown(e) {
        //console.log('Down', x, y);
        if (e.button === 0) {
            onCardUp(id, x - e.clientX, y - e.clientY, z);
        }
        e.stopPropagation();
        return false;
    }

    function OnContextMenu(e) {
        e.preventDefault();
        onFlipCard(id);
        return false;
    }

    function MouseMove(e) {
        //console.log('Move', x, y);
        onMoveCard(id, e.clientX + mx, e.clientY + my);
        return false;
    }

    function MouseUp(e) {
        //console.log('Up', x, y);
        onCardDown(id, x, y);
        return false;
    }

    if (active) {
        document.onmousemove = MouseMove;
        document.onmouseup = MouseUp;
    } else {
        document.onmousemove = undefined;
        document.onmouseup = undefined;
    }

    return (
        <div
            style={{ top: y, left: x, width: w, height: h, zIndex: z }}
            onMouseDown={MouseDown}
            onContextMenu={OnContextMenu}
            className="card noselect">
            {visible ? contentTop : contentBottom}
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);