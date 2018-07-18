﻿import React from 'react';
import { connect } from 'react-redux';
import Victor from 'victor';
import Card from './Card';
import Deck from './Deck';
import Cursor from './Cursor';
import Filter from './Filter';
import { addCard, tableScale, tableMove, addFilter, tableRotate, moveCursor, moveUser } from '../store/table/TableActions';
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
        onAddFilter: (x, y, h, w) => {
            dispatch(addFilter(x, y, h, w));
        },
        onRotate: (alpha, x, y) => {
            dispatch(tableRotate(alpha, x, y));
        },
        onCursorMove: function (x, y) {
            dispatch(moveCursor(x, y));
        },
        onUserMove: function (x, y) {
            dispatch(moveUser(x, y));
        },
        onAddCard: () => {
            let rnd = Math.floor(Math.random() * 20 + 1);

            dispatch(addCard(
                null, 0, 0, 0, 0, 140, 92, false, false,
                `Cards/${rnd}.jpg`,
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

const _maxVelocity = 40;
const _moveAcceleration = 4;
const _moveTickMs = 20;
const tableRotateStep = Math.PI / 4;
const cursorCallbackId = 'CURSOR';
const userCallbackId = 'USER';

class Table extends React.Component {

    constructor(props) {
        super();
        const callbackService = CallbackService.getInstance();
        //callbackService.onMouseMove('CURSOR', this.CursorMove.bind(this));
        console.log(props.onAddFilter);
        document.onkeydown = this.keyPress.bind(this);
        document.onkeyup = this.keyPress.bind(this);
        callbackService.onMouseDown(cursorCallbackId, this.forceUpdateCursor.bind(this));
        callbackService.onMouseMove(cursorCallbackId, this.updateCursor.bind(this));
        this.wheel = this.wheel.bind(this);
        this.preload();

        setInterval(this.updateCamera.bind(this), _moveTickMs);
    }

    // TODO:
    //shouldComponentUpdate(nextProps) {
    //    return this.props.camera.x !== nextProps.camera.x
    //        || this.props.camera.y !== nextProps.camera.y
    //        || this.props.camera.scale !== nextProps.camera.scale
    //        || this.props.camera.alpha !== nextProps.camera.alpha
    //        || this.props.cards !== nextProps.cards
    //        || this.props.decks.filter(i => i.active).length > 0
    //        || this.props.cards.filter(i => i.active).length > 0;
    //}

    updateCursor(e) {
        const { onCursorMove, onUserMove, cards, decks } = this.props;
        const { x, y } = this.project(e.clientX, e.clientY);
        const mx = Math.round(x);
        const my = Math.round(y);

        if (cards.filter(i => i.active && i.isOwner).length === 0 &&
            decks.filter(i => i.active && i.isOwner).length === 0) {
            onUserMove(mx, my);
        } else {
            onCursorMove(mx, my);
        }
    }

    forceUpdateCursor(e) {
        const { onCursorMove, onUserMove, cards, decks } = this.props;
        const { x, y } = this.project(e.clientX, e.clientY);
        const mx = Math.round(x);
        const my = Math.round(y);

        onCursorMove(mx, my);
    }

    updateCamera() {
        const { camera, onTableMove } = this.props;
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
            //if (x > window.screen.width / 2) {
            //    x = window.screen.width / 2;
            //} else if (x < -table.w / 2) {
            //    x = -table.w / 2;
            //}
            //if (y > table.h / 2) {
            //    y = table.h / 2;
            //} else if (y < -table.h / 2) {
            //    y = -table.h / 2;
            //}
            if (vx > _maxVelocity) {
                vx = _maxVelocity;
            } else if (vx < -_maxVelocity) {
                vx = -_maxVelocity;
            }
            if (vy > _maxVelocity) {
                vy = _maxVelocity;
            } else if (vy < -_maxVelocity) {
                vy = -_maxVelocity;
            }
            onTableMove(camera.ax, camera.ay, vx, vy, x, y);
        }
    }

    rotate(angle) {
        const { camera, onRotate } = this.props;
        //const { x, y } = this.project(window.screen.width / 2, window.screen.height / 2);
        //const screenCenterX = window.screen.width / 2;
        //const screenCenterY = window.screen.height / 2;
        //const rotCenterX = screenCenterX - camera.x - table.w / 2;
        //const rotCenterY = screenCenterY - camera.y - table.h / 2;
        //const x = (Math.cos(-angle) * rotCenterX - Math.sin(-angle) * rotCenterY) * camera.scale;
        //const y = (Math.cos(-angle) * rotCenterY + Math.sin(-angle) * rotCenterX) * camera.scale;
        const alpha = camera.alpha + angle;
        onRotate(alpha, camera.x, camera.y);
    }

    tableMove(ax, ay, vx, vy, x, y) {
        const { onTableMove } = this.props;
        onTableMove(ax, ay, vx, vy, x, y);
    }
    
    keyPress(e) {
        const { ax, ay, vx, vy, x, y } = this.props.camera;
        switch (e.keyCode) {
            case 'Q'.charCodeAt(0): {
                if (e.type === 'keydown') {
                    this.rotate(-tableRotateStep);
                }
                break;
            }
            case 'E'.charCodeAt(0): {
                if (e.type === 'keydown') {
                    this.rotate(tableRotateStep);
                }
                break;
            }
            case 'W'.charCodeAt(0): {
                if (e.type === 'keydown') {
                    this.tableMove(ax, _moveAcceleration, vx, (vy > 0 ? vy : 0), x, y);
                } else if (e.type === 'keyup' && ay > 0) {
                    this.tableMove(ax, 0, vx, vy, x, y);
                }
                break;
            }
            case 'A'.charCodeAt(0): {
                if (e.type === 'keydown') {
                    this.tableMove(_moveAcceleration, ay, (vx > 0 ? vx : 0), vy, x, y);
                } else if (e.type === 'keyup' && ax > 0) {
                    this.tableMove(0, ay, vx, vy, x, y);
                }
                break;
            }
            case 'S'.charCodeAt(0): {
                if (e.type === 'keydown') {
                    this.tableMove(ax, -_moveAcceleration, vx, (vy < 0 ? vy : 0), x, y);
                } else if (e.type === 'keyup' && ay < 0) {
                    this.tableMove(ax, 0, vx, vy, x, y);
                }
                break;
            }
            case 'D'.charCodeAt(0): {
                if (e.type === 'keydown') {
                    this.tableMove(-_moveAcceleration, ay, (vx < 0 ? vx : 0), vy, x, y);
                } else if (e.type === 'keyup' && ax < 0) {
                    this.tableMove(0, ay, vx, vy, x, y);
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    project(x, y) {
        const { table, camera } = this.props;

        const bo = new Victor(table.w / 2, table.h / 2)
            .rotate(camera.alpha)
            .multiply({ x: camera.scale, y: camera.scale });
        const to = new Victor(camera.x, camera.y)
            .add({ x: table.w / 2, y: table.h / 2 })
            .subtract(bo);
        const c = new Victor(x, y)
            .subtract(to)
            .rotate(-camera.alpha)
            .divide({ x: camera.scale, y: camera.scale });

        return c;
    }

    wheel(e) {
        const { onTableScale } = this.props;

        if (e.deltaY > 0) {
            onTableScale(-0.05);
        } else {
            onTableScale(0.05);
        }
        e.preventDefault();
    }

    preload() {
        for (let i = 0; i < 20; ++i) {
            window['img_' + i] = new Image();
            window['img_' + i].src = `Cards/${i}.jpg`;
        }
    }

    render() {
        const { camera, table, cards, decks, users, filters, onAddCard } = this.props;
        const mouse = {
            x: camera.mx,
            y: camera.my,
            alpha: camera.alpha,
        }
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
                    mouse={mouse}
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
                    alpha={deck.alpha}
                    mouse={mouse}
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
                    y={user.y}
                    colour={user.colour} />
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
                onWheel={this.wheel}>
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