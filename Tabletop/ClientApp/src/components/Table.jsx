import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Deck from './Deck';
import Cursor from './Cursor';
import Filter from './Filter';
import { addCard, tableScale, tableMove, tableMouseUp, tableMouseDown, moveUser, addFilter, tableRotate } from '../store/table/TableActions';
import CallbackService from '../services/CallbackService';
import ServerListener from './ServerListener';

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
        onRotate: alpha => {
            dispatch(tableRotate(alpha));
        },
        onAddCard: () => {
            let rnd = Math.floor(Math.random() * 20 + 1);

            dispatch(addCard(
                null, 0, 0, 0, 0, 140, 92, false, false,
                `Cards/${rnd}.gif`,
                'Cards/0.jpg'
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
        console.log(this.props.onRotate);
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

        // TODO: optimize
        const tox = table.w / 2 + table.x;
        const toy = table.h / 2 + table.y;
        const box = Math.cos(table.alpha) * table.w / 2 - Math.sin(table.alpha) * table.h / 2;
        const boy = Math.cos(table.alpha) * table.h / 2 + Math.sin(table.alpha) * table.w / 2;
        const tbx = tox - box;
        const tby = toy - boy;
        const bcx = e.clientX - tbx;
        const bcy = e.clientY - tby;
        const cx = Math.cos(table.alpha) * bcx + Math.sin(table.alpha) * bcy;
        const cy = Math.cos(table.alpha) * bcy - Math.sin(table.alpha) * bcx;
        
        onCursorMove(cx, cy);
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
        const { game, onAddCard, onRotate } = this.props;
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
                    parentAlpha={table.alpha}
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
                style={{
                    top: table.y,
                    left: table.x,
                    transform: `scale(${table.scale}) rotate(${table.alpha}rad)`,
                    width: table.w,
                    maxWidth: table.w,
                    height: table.h,
                    maxHeight: table.h
                }}
                onWheel={this.Wheel.bind(this)}
                onMouseDown={this.MouseDown.bind(this)}>
                <button onClick={onAddCard}>+</button>
                {users}
                {decks}
                {cards}
                {filters}
                <ServerListener />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);