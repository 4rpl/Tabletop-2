import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Deck from './Deck';
import Cursor from './Cursor';
import Filter from './Filter';
import { addCard, tableScale, tableMove, tableMouseUp, tableMouseDown, moveUser, addFilter } from '../store/table/TableActions';
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
        onCursorMove: function (x, y) {
            dispatch(moveUser(x, y));
        },
        onAddFilter: (x, y, h, w) => {
            dispatch(addFilter(x, y, h, w));
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

class Table extends React.Component {
    
    componentDidMount() {
        const callbackService = CallbackService.getInstance();
        callbackService.onMouseMove('CURSOR', this.CursorMove.bind(this));
        console.log(this.props.onAddFilter);
    }

    MouseDown(e) {
        const { game, onTableMouseDown } = this.props;
        const table = game.table;
        const callbackService = CallbackService.getInstance();

        onTableMouseDown(table.x - e.clientX, table.y - e.clientY);
        callbackService.onMouseUp('TABLE', this.MouseUp.bind(this));
        callbackService.onMouseMove('TABLE', this.MouseMove.bind(this, table.x - e.clientX, table.y - e.clientY));
        return false;
    }

    MouseMove(mx, my, e) {
        const { onTableMove } = this.props;

        onTableMove(e.clientX + mx, e.clientY + my);
        return false;
    }

    MouseUp(e) {
        const { onTableMouseUp } = this.props;
        const callbackService = CallbackService.getInstance();

        callbackService.unsubscribeOnMouseUp('TABLE');
        callbackService.unsubscribeOnMouseMove('TABLE');
        onTableMouseUp();
        return false;
    }

    CursorMove(e) {
        const { onCursorMove, game } = this.props;
        const table = game.table;
        onCursorMove(e.clientX - table.x, e.clientY - table.y);
        return false;
    }

    Wheel(e) {
        const { onTableScale } = this.props;

        if (e.deltaY > 0) {
            onTableScale(-0.05);
        } else {
            onTableScale(0.05);
        }
        e.preventDefault();
    }

    render() {
        const { game, onAddCard } = this.props;
        const table = game.table;

        const cards = game.cards.map(card => {
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
                    isOwner={card.isOwner}
                    content={card.content}
                    visible={card.visible} />
            );
        });

        const decks = game.decks.map(deck => {
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
                    isOwner={deck.isOwner}
                    length={deck.length}
                    content={deck.content} />
            );
        });

        const users = game.users.map(user => {
            return (
                <Cursor
                    key={user.id}
                    name={user.name}
                    x={user.x}
                    y={user.y} />
            );
        });

        const filters = game.filters.map(filter => {
            return (
                <Filter
                    key={filter.id}
                    x={filter.x}
                    y={filter.y}
                    h={filter.h}
                    w={filter.w} />
            );
        })

        return (
            <div className="table"
                style={{ top: table.y, left: table.x, transform: `scale(${table.scale})`, width: table.w, height: table.h }}
                onWheel={this.Wheel.bind(this)}
                onMouseDown={this.MouseDown.bind(this)}>
                <button onClick={onAddCard}>+</button>
                {users}
                {decks}
                {cards}
                {filters}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);