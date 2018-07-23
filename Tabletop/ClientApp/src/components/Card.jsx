import React from 'react';
import { connect } from 'react-redux';
import { flipCard, moveCard, cardUp, cardDown } from '../store/table/TableActions';
import CallbackService from '../services/CallbackService';

const mapStateToProps = state => {
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
        onCardUp: (id, alpha, mx, my, z) => {
            dispatch(cardUp(id, alpha, mx, my, z));
        },
        onCardDown: (id, x, y) => {
            dispatch(cardDown(id, x, y));
        }
    }
}

class Card extends React.Component {

    constructor(props) {
        super();
        const { id, active, isOwner } = props;
        this.mouseDown = this.mouseDown.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
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
            || this.props.content !== nextProps.content;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { id, mx, my, w, h, active, isOwner, mouse, table, onMoveCard } = this.props;
        if (active && isOwner && (mouse.x !== prevProps.mouse.x || mouse.y !== prevProps.mouse.y)) {
            let x = mx + mouse.x;
            let y = my + mouse.y;
            if (x > table.w - w) {
                x = table.w - w;
            } else if (x < 0) {
                x = 0;
            }
            if (y > table.h - h) {
                y = table.h - h;
            } else if (y < 0) {
                y = 0;
            }

            onMoveCard(id, x, y);
        }
    }

    callbackService = CallbackService.getInstance();

    mouseDown(e) {
        let { id, x, y, z, active, onCardUp, mouse } = this.props;
        //console.log('Down', id);
        if (!active && e.button === 0) {
            onCardUp(id, mouse.alpha % (2 * Math.PI), x - mouse.x, y - mouse.y, z);
            this.callbackService.onMouseUp(id, this.mouseUp.bind(this));
        }
        e.stopPropagation();
        return false;
    }

    onContextMenu(e) {
        const { id, onFlipCard } = this.props;
        e.preventDefault();
        onFlipCard(id);
        return false;
    }
    
    mouseUp(e) {
        const { id, x, y, onCardDown } = this.props;
        //console.log('Up', id);
        onCardDown(id, x, y);
        this.callbackService.unsubscribeOnMouseUp(id);
        return false;
    }

    render() {
        const { x, y, z, h, w, active, alpha, content } = this.props;

        let cardContent;
        if (content) {
            cardContent = <img alt="" src={process.env.PUBLIC_URL + content} />;
        } else {
            cardContent = <img alt="" src={process.env.PUBLIC_URL + 'Cards/logo.svg'} className="table-logo" />
        }
        return (
            <div
                style={{ top: y, left: x, width: w, height: h, zIndex: z, transform: `rotate(${-alpha}rad)` }}
                onMouseDown={this.mouseDown}
                onContextMenu={this.onContextMenu}
                className={'tt-card tt-noselect' + (active ? ' tt-active' : '')}>
                {cardContent}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);