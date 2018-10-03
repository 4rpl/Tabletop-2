import React from 'react';
import { connect } from 'react-redux';
import { setFilterActive, setFilterChange } from '../store/table/TableActions';
import CallbackService from '../services/CallbackService';

const mapStateToProps = state => {
    return {
        mouse: state.mouse,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleFilterChanges: (id, isActive) => {
            dispatch(setFilterActive(id, isActive));
        },
        onFilterChange: (id, x, y, w, h, alpha) => {
            dispatch(setFilterChange(id, x, y, w, h, alpha));
        },
    };
};

class Filter extends React.Component {

    constructor(props) {
        super();
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onTlDown = this.onTlDown.bind(this);
        this.onTrDown = this.onTlDown.bind(this);
        this.onBlDown = this.onTlDown.bind(this);
        this.onBrDown = this.onTlDown.bind(this);
    }

    onDoubleClick(e) {
        const { id, changes, onToggleFilterChanges } = this.props;
        onToggleFilterChanges(id, !changes);
    }

    callbackService = CallbackService.getInstance();

    onTlDown(e) {
        //const { x, y, h, w, mouse, changes } = this.props;
        this.onMouseDown();
    }
    onTrDown(e) {
        //const { x, y, h, w, mouse, changes } = this.props;
    }
    onBlDown(e) {
        //const { x, y, h, w, mouse, changes } = this.props;
    }
    onBrDown(e) {
        //const { x, y, h, w, mouse, changes } = this.props;
    }

    onMouseDown(x, y) {
        const { id, onFilterChange } = this.props;
        //if (!active && e.button === 0) {
        //    onCardUp(id, mouse.alpha % (2 * Math.PI), x, y);
        //    this.callbackService.onMouseUp(id, this.mouseUp.bind(this));
        //}
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
        const { x, y, h, w, name, color, changes, alpha } = this.props;
        const changesView = changes ? (
            <div style={{ top: y, left: x, height: h, width: w, transform: `rotate(${-alpha}rad)` }}
                className="tt-filter-ch">

                <div className="tt-filter-ch-inner"></div>

                <div className="tt-filter-ch-corner tl" onMouseDown={this.onTlDown}></div>
                <div className="tt-filter-ch-corner tr" onMouseDown={this.onTrDown}></div>
                <div className="tt-filter-ch-corner bl" onMouseDown={this.onBlDown}></div>
                <div className="tt-filter-ch-corner br" onMouseDown={this.onBrDown}></div>
            </div>
        ) : null;
        return (
            <div>
                <div
                    tabIndex="0"
                    style={{ top: y, left: x, height: h, width: w, backgroundColor: color, transform: `rotate(${-alpha}rad)` }}
                    onDoubleClick={this.onDoubleClick}
                    className="tt-filter tt-noselect">
                    <span className="tt-filter-name">{name}</span>
                </div>
                {changesView}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);