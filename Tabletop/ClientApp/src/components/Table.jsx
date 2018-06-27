import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Deck from './Deck';
import { addCard, tableScale, tableMove, tableMouseUp, tableMouseDown } from '../store/table/TableActions';
import CallbackService from '../services/CallbackService';

const mapDispatchToProps = function (dispatch) {
    return {
        onTableScale: function (scale) {
            dispatch(tableScale(scale));
        },
        onTableMove: function (x, y) {
            dispatch(tableMove(x, y));
        },
        onTableMouseUp: function () {
            dispatch(tableMouseUp());
        },
        onTableMouseDown: function (mx, my) {
            dispatch(tableMouseDown(mx, my));
        },
        onAddCard: () => {
            dispatch(addCard(
                null, 0, 0, 0, 0, 142, 102, false, false,
                'Cards/1.png',
                'Cards/2.png'
            ));
        }
    }
}

const mapStateToProps = function (state) {
    return {
        game: state.game
    };
}

const Table = ({ game, onAddCard, onTableScale, onTableMove, onTableMouseUp, onTableMouseDown }) => {

    const table = game.table;
    const callbackService = CallbackService.getInstance();

    function MouseDown(e) {
        onTableMouseDown(table.x - e.clientX, table.y - e.clientY);
        callbackService.onMouseUp('TABLE', MouseUp);
        callbackService.onMouseMove('TABLE', MouseMove.bind(null, table.x - e.clientX, table.y - e.clientY));
        return false;
    }

    function MouseMove(mx, my, e) {
        onTableMove(e.clientX + mx, e.clientY + my);
        return false;
    }

    function MouseUp(e) {
        callbackService.unsubscribeOnMouseUp('TABLE');
        callbackService.unsubscribeOnMouseMove('TABLE');
        onTableMouseUp();
        return false;
    }

    function Wheel(e) {
        if (e.deltaY > 0) {
            onTableScale(-0.05);
        } else {
            onTableScale(0.05);
        }
        e.preventDefault();
    }

    let cards = game.cards.map(card => {
        return (
            <Card
                key={card.id}
                id={card.id}
                x={card.x}
                y={card.y}
                mx={card.mx}
                my={card.my}
                z={card.z}
                h={card.h}
                w={card.w}
                active={card.active}
                content={card.content}
                visible={card.visible} />
        );
    });

    let decks = game.decks.map(deck => {
        return (
            <Deck
                key={deck.id}
                id={deck.id}
                x={deck.x}
                y={deck.y}
                mx={deck.mx}
                my={deck.my}
                z={deck.z}
                h={deck.h}
                w={deck.w}
                active={deck.active}
                length={deck.length}
                content={deck.content} />
        )
    });

    return (
        <div className="table"
            style={{ top: table.y, left: table.x, transform: `scale(${table.scale})`, width: table.w, height: table.h }}
            onWheel={Wheel}
            onMouseDown={MouseDown}>
            <button onClick={onAddCard}>Add Card</button>
            {decks}
            {cards}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);