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
        onCardUp: (id, mx, my, z) => {
            dispatch(cardUp(id, mx, my, z));
        },
        onCardDown: (id, x, y) => {
            dispatch(cardDown(id, x, y));
        }
    }
}

class Card extends React.Component {

    componentDidMount() {
        let { id, mx, my, active, isOwner } = this.props;
        if (active && isOwner) {
            this.applyCallbacks(id, mx, my);
        }
    }

    applyCallbacks(id, mx, my) {
        this.callbackService.onMouseUp(id, this.MouseUp.bind(this));
        this.callbackService.onMouseMove(id, this.MouseMove.bind(this, mx, my));
    }

    callbackService = CallbackService.getInstance();

    MouseDown(e) {
        let { id, x, y, z, active, onCardUp, parentAlpha } = this.props;
        //console.log('Down', id);
        if (!active && e.button === 0) {
            let px = Math.cos(parentAlpha) * e.clientX + Math.sin(parentAlpha) * e.clientY;
            let py = Math.cos(parentAlpha) * e.clientY - Math.sin(parentAlpha) * e.clientX;
            onCardUp(id, x - e.clientX, y - e.clientY, z);
            this.applyCallbacks(id, x - px, y - py);
        }
        e.stopPropagation();
        return false;
    }

    OnContextMenu(e) {
        let { id, onFlipCard } = this.props;
        e.preventDefault();
        onFlipCard(id);
        return false;
    }

    MouseMove(mx, my, e) {
        let { id, onMoveCard, parentAlpha } = this.props;
        //console.log('Move', id);
        let px = Math.cos(parentAlpha) * e.clientX + Math.sin(parentAlpha) * e.clientY;
        let py = Math.cos(parentAlpha) * e.clientY - Math.sin(parentAlpha) * e.clientX;
        onMoveCard(id, px + mx, py + my);
        return false;
    }

    MouseUp(e) {
        let { id, x, y, onCardDown } = this.props;
        //console.log('Up', id);
        onCardDown(id, x, y);
        this.callbackService.unsubscribeOnMouseUp(id);
        this.callbackService.unsubscribeOnMouseMove(id);
        return false;
    }

    render() {
        let { x, y, z, h, w, active, content } = this.props;

        let cardContent;
        if (content) {
            cardContent = <img alt="" src={process.env.PUBLIC_URL + content} />;
        } else {
            cardContent = <img alt="" src={process.env.PUBLIC_URL + 'Cards/logo.svg'} className="table-logo" />
        }

        return (
            <div
                style={{ top: y, left: x, width: w, height: h, zIndex: z }}
                onMouseDown={this.MouseDown.bind(this)}
                onContextMenu={this.OnContextMenu.bind(this)}
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