import React from 'react';
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
        const { id, mx, my, active, isOwner } = props;
        this.mouseDown = this.mouseDown.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        if (active && isOwner) {
            this.callbackService.onMouseUp(id, this.mouseUp.bind(this));
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.active && this.props.mouse.x !== nextProps.mouse.x
            || this.props.active && this.props.mouse.y !== nextProps.mouse.y
            || this.props.x !== nextProps.x
            || this.props.y !== nextProps.y
            || this.props.z !== nextProps.z
            || this.props.content !== nextProps.content
            || this.props.alpha !== nextProps.alpha
            || this.props.active !== nextProps.active;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { id, mx, my, active, isOwner, mouse, onMoveCard } = this.props;
        if (active && isOwner && (mouse.x !== prevProps.mouse.x || mouse.y !== prevProps.mouse.y)) {
            onMoveCard(id, mx + mouse.x, my + mouse.y);
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
                className={'card noselect' + (active ? ' grabbed' : '')}>
                {cardContent}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);