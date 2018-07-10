import React from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import Deck from './Deck';
import Cursor from './Cursor';
import Filter from './Filter';
import { addCard, tableScale, tableMove, tableMouseUp, tableMouseDown, moveUser, addFilter, tableRotate, cursorMove } from '../store/table/TableActions';
import CallbackService from '../services/CallbackService';
import ServerListener from './ServerListener';

const mapDispatchToProps = function (dispatch) {
    return {
        onTableScale: function (scale) {
            dispatch(tableScale(scale));
        },
        onTableMove: function (ax, ay, vx, vy, x, y) {
            dispatch(tableMove(ax, ay, vx, vy, x, y));
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
        onCursorMove: function (x, y) {
            dispatch(cursorMove(x, y));
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
        table: state.game.table,
        decks: state.game.decks,
        cards: state.game.cards,
        filters: state.game.filters,
        users: state.game.users,
        camera: state.game.camera,
    };
}

const _maxVelocity = 30;
const _moveAcceleration = 3;
const _moveTickMs = 20;
const tableRotateStep = Math.PI / 8;

class Table extends React.Component {
    
    componentDidMount() {
        const callbackService = CallbackService.getInstance();
        //callbackService.onMouseMove('CURSOR', this.CursorMove.bind(this));
        console.log(this.props.onAddFilter);
        document.onkeydown = this.keyPress.bind(this);
        document.onkeyup = this.keyPress.bind(this);
        document.onmousemove = this.updateCursor.bind(this);

        setInterval(this.updateCamera.bind(this), _moveTickMs);
    }

    updateCursor(e) {
        const { onCursorMove, table, camera } = this.props;

        const tox = table.w / 2 + camera.x;
        const toy = table.h / 2 + camera.y;
        const box = Math.cos(camera.alpha) * table.w / 2 - Math.sin(camera.alpha) * table.h / 2;
        const boy = Math.cos(camera.alpha) * table.h / 2 + Math.sin(camera.alpha) * table.w / 2;
        const tbx = (tox - box) / camera.scale;
        const tby = (toy - boy) / camera.scale;
        const bcx = e.clientX - tbx;
        const bcy = e.clientY - tby;
        const cx = Math.cos(camera.alpha) * bcx + Math.sin(camera.alpha) * bcy;
        const cy = Math.cos(camera.alpha) * bcy - Math.sin(camera.alpha) * bcx;
        console.log(cx, cy);
        onCursorMove(cx, cy);
    }

    updateCamera() {
        const { camera, onTableMove, table } = this.props;
        if (camera.ax || camera.ay || camera.vx || camera.vy) {
            let vx = camera.vx + camera.ax;
            let vy = camera.vy + camera.ay;
            let x = camera.vx + camera.x;
            let y = camera.vy + camera.y;
            if (camera.ax === 0 && camera.vx !== 0) {
                vx -= Math.sign(vx) * _moveAcceleration;
            }
            if (camera.ay === 0 && camera.vy !== 0) {
                vy -= Math.sign(vy) * _moveAcceleration;
            }
            if (x > table.w / 2) {
                x = table.w / 2;
            } else if (x < -table.w / 2) {
                x = -table.w / 2;
            }
            if (y > table.h / 2) {
                y = table.h / 2;
            } else if (y < -table.h / 2) {
                y = -table.h / 2;
            }
            if (vx > _maxVelocity) {
                vx = _maxVelocity;
            } else if (vx < -_maxVelocity) {
                vx = -_maxVelocity;
            }
            onTableMove(camera.ax, camera.ay, vx, vy, x, y);
        }
    }

    rotate(angle) {
        const { camera, onRotate } = this.props;
        const alpha = camera.alpha + angle;
        onRotate(alpha);
    }
    
    keyPress(e) {
        const { onTableMove } = this.props;
        const { ax, ay, vx, vy, x, y } = this.props.camera;
        switch (e.key) {
            case 'q': {
                this.rotate(-tableRotateStep);
                break;
            }
            case 'e': {
                this.rotate(tableRotateStep);
                break;
            }
            case 'w': {
                if (e.type === 'keydown') {
                    onTableMove(ax, _moveAcceleration, vx, (vy > 0 ? vy : 0), x, y);
                } else if (e.type === 'keyup' && ay > 0) {
                    onTableMove(ax, 0, vx, vy, x, y);
                }
                break;
            }
            case 'a': {
                if (e.type === 'keydown') {
                    onTableMove(_moveAcceleration, ay, (vx > 0 ? vx : 0), vy, x, y);
                } else if (e.type === 'keyup' && ax > 0) {
                    onTableMove(0, ay, vx, vy, x, y);
                }
                break;
            }
            case 's': {
                if (e.type === 'keydown') {
                    onTableMove(ax, -_moveAcceleration, vx, (vy < 0 ? vy : 0), x, y);
                } else if (e.type === 'keyup' && ay < 0) {
                    onTableMove(ax, 0, vx, vy, x, y);
                }
                break;
            }
            case 'd': {
                if (e.type === 'keydown') {
                    onTableMove(-_moveAcceleration, ay, (vy < 0 ? vy : 0), vy, x, y);
                } else if (e.type === 'keyup' && ax < 0) {
                    onTableMove(0, ay, vx, vy, x, y);
                }
                break;
            }
        }
    }

    MouseDown(e) {
        const { camera, onTableMouseDown } = this.props;
        const callbackService = CallbackService.getInstance();

        onTableMouseDown(camera.x - e.clientX, camera.y - e.clientY);
        callbackService.onMouseUp('TABLE', this.MouseUp.bind(this));
        callbackService.onMouseMove('TABLE', this.MouseMove.bind(this, camera.x - e.clientX, camera.y - e.clientY));
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
        const { onCursorMove } = this.props;
        const { cx, cy } = this.props.camera;
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
        const { camera, table, cards, decks, users, filters, onAddCard } = this.props;
        const cardViews = cards.map(card => {
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
                    alpha={card.alpha}
                    parentAlpha={camera.alpha}
                    active={card.active}
                    isOwner={card.isOwner}
                    content={card.content}
                    visible={card.visible} />
            );
        });

        const deckViews = decks.map(deck => {
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

        const userViews = users.map(user => {
            return (
                <Cursor
                    key={user.id}
                    name={user.name}
                    x={user.x}
                    y={user.y} />
            );
        });

        const filterViews = filters.map(filter => {
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
                    top: camera.y,
                    left: camera.x,
                    transform: `scale(${camera.scale}) rotate(${camera.alpha}rad)`,
                    width: table.w,
                    maxWidth: table.w,
                    height: table.h,
                    maxHeight: table.h
                }}
                onWheel={this.Wheel.bind(this)}>
                <button onClick={onAddCard}>+</button>
                {userViews}
                {deckViews}
                {cardViews}
                {filterViews}
                <ServerListener />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);