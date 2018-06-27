import React from 'react';
import { connect } from 'react-redux';
import { flipDeck, moveDeck, deckUp, deckDown, shuffleDeck, takeTopDeckCard } from '../store/table/TableActions';
import CallbackService from '../services/CallbackService';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const mapStateToProps = function (state) {
    return {
        state: state
    };
}

const mapDispatchToProps = function (dispatch) {
    return {
        onFlipDeck: function (id) {
            dispatch(flipDeck(id));
        },
        onMoveDeck: function (id, x, y) {
            dispatch(moveDeck(id, x, y));
        },
        onDeckUp: function (id, mx, my, z) {
            dispatch(deckUp(id, mx, my, z));
        },
        onDeckDown: function (id, x, y, h, w) {
            dispatch(deckDown(id, x, y, h, w));
        },
        takeTopDeckCard: function (id, mx, my) {
            dispatch(takeTopDeckCard(id, mx, my));
        },
        shuffleDeck: function (id) {
            dispatch(shuffleDeck(id));
        }
    };
}

const Deck = function ({ id, x, y, mx, my, z, h, w, active, content, length, onFlipDeck, onMoveDeck, onDeckUp, onDeckDown, takeTopDeckCard, shuffleDeck }) {
    let callbackService = CallbackService.getInstance();

    function MouseDown(e) {
        //console.log('Down');
        if (e.shiftKey) {
            takeTopDeckCard(id, x - e.clientX, y - e.clientY);
        } else if (e.button === 0) {
            onDeckUp(id, x - e.clientX, y - e.clientY, z);
            callbackService.onMouseUp(id, MouseUp);
            callbackService.onMouseMove(id, MouseMove.bind(null, x - e.clientX, y - e.clientY));
        }
        e.stopPropagation();
        return false;
    }

    function OnContextMenu(e) {
        e.preventDefault();
        onFlipDeck(id);
        return false;
    }

    function MouseMove(mx, my, e) {
        //console.log('Move');
        onMoveDeck(id, e.clientX + mx, e.clientY + my);
        return false;
    }

    function MouseUp(e) {
        //console.log('Up');
        onDeckDown(id, x, y, h, w);
        callbackService.unsubscribeOnMouseUp(id);
        callbackService.unsubscribeOnMouseMove(id);
        return false;
    }

    function OnKeyPress(e) {
        if (e.keyCode === 82) {
            shuffleDeck(id);
        }
        return false;
    }

    let contentImg = <img alt={content} src={process.env.PUBLIC_URL + content} />;
    //let animation = (
    //    <div>
    //        <div style={{ top: y, left: x, width: w, height: h, zIndex: z - 1, visibility: 'visible' }} className="deckAnimaiton deckAnimaitonLeft noselect">
    //            {contentImg}
    //        </div>
    //        <div style={{ top: y, left: x, width: w, height: h, zIndex: z - 1 }} className="deckAnimaiton deckAnimaitonRight noselect">
    //            {contentImg}
    //        </div>
    //    </div>
    //);
    //let animation = (
    //    <ReactCSSTransitionGroup
    //        transitionName="shuffleAnimaiton"
    //        transitionEnterTimeout={500}
    //        transitionLeaveTimeout={300}>
    //        <h1>123</h1>
    //    </ReactCSSTransitionGroup>
    //);
    return (
        <div style={{ top: y, left: x, width: w, height: h, zIndex: z }}
            onMouseDown={MouseDown}
            onKeyDown={OnKeyPress}
            tabIndex="-1"
            onContextMenu={OnContextMenu}
            className="deck noselect">
            <span className="deckCardsCounter">{length}</span>
            {contentImg}
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Deck);