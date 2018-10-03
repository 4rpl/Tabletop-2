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
        onDeckUp: function (id, alpha, mx, my, z) {
            dispatch(deckUp(id, alpha, mx, my, z));
        },
        onDeckDown: function (id, x, y, h, w) {
            dispatch(deckDown(id, x, y, h, w));
        },
        onTakeTopDeckCard: function (id, alpha, mx, my) {
            dispatch(takeTopDeckCard(id, alpha, mx, my));
        },
        onShuffleDeck: function (id) {
            dispatch(shuffleDeck(id));
        }
    };
}

class Deck extends React.Component {

    constructor(props) {
        super();
        const { id, active, isOwner } = props;
        this.mouseDown = this.mouseDown.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.keyPress = this.keyPress.bind(this);
        if (active && isOwner) {
            this.callbackService.onMouseUp(id, this.mouseUp.bind(this));
        }
    }
    
    shouldComponentUpdate(nextProps) {
        const { active, isOwner } = this.props;
        return active !== nextProps.active
            || (isOwner && this.props.mouse.x !== nextProps.mouse.x)
            || (isOwner && this.props.mouse.y !== nextProps.mouse.y)
            || (active && this.props.x !== nextProps.x)
            || (active && this.props.y !== nextProps.y)
            || this.props.content !== nextProps.content
            || this.props.content !== nextProps.content;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { id, mx, my, active, isOwner, mouse, onMoveDeck } = this.props;
        if (active && isOwner && (mouse.x !== prevProps.mouse.x || mouse.y !== prevProps.mouse.y)) {
            onMoveDeck(id, mx + mouse.x, my + mouse.y);
        }
    }

    callbackService = CallbackService.getInstance();

    mouseDown(e) {
        const { id, x, y, z, active, onDeckUp, mouse, onTakeTopDeckCard } = this.props;
        //console.log('Down');
        if (!active) {
            if (e.shiftKey) {
                onTakeTopDeckCard(id, mouse.alpha % (2 * Math.PI), x - mouse.x, y - mouse.y);
            } else if (e.button === 0) {
                onDeckUp(id, mouse.alpha % (2 * Math.PI), x - mouse.x, y - mouse.y, z);
                this.callbackService.onMouseUp(id, this.mouseUp.bind(this));
            }
        }
        e.stopPropagation();
        return false;
    }

    onContextMenu(e) {
        let { id, onFlipDeck } = this.props;
        e.preventDefault();
        e.stopPropagation();
        onFlipDeck(id);
        return false;
    }

    mouseUp(e) {
        const { id, x, y, onDeckDown } = this.props;
        //console.log('Up');
        onDeckDown(id, x, y);
        this.callbackService.unsubscribeOnMouseUp(id);
        return false;
    }

    keyPress(e) {
        const { id, onShuffleDeck } = this.props;
        if (e.keyCode === 'R'.charCodeAt(0)) {
            onShuffleDeck(id);
        }
        return false;
    }

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

    render() {
        let { x, y, z, h, w, active, alpha, content, length } = this.props;

        let deckContent;
        if (content) {
            deckContent = <img alt={content} src={process.env.PUBLIC_URL + content} />;
        } else {
            deckContent = <img alt="" src={process.env.PUBLIC_URL + 'Cards/logo.svg'} className="table-logo" />
        }

        return (
            <div style={{ top: y, left: x, width: w, height: h, zIndex: z, transform: `rotate(${-alpha}rad)` }}
                onMouseDown={this.mouseDown}
                onKeyDown={this.keyPress}
                tabIndex="-1"
                onContextMenu={this.onContextMenu}
                className={'tt-deck tt-noselect' + (active ? ' tt-active' : '')}>
                <span className="tt-deckCardsCounter">{length}</span>
                {deckContent}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Deck);