import React from 'react';
import { connect } from 'react-redux';
import { toggleFilterChanges, setFilterChange, setFilterChangeFunc, saveFilterChanges } from '../store/table/TableActions';
import CallbackService from '../services/CallbackService';

const mapStateToProps = state => {
    return {
        table: state.game.table,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleFilterChanges: (id, isActive) => {
            dispatch(toggleFilterChanges(id, isActive));
        },
        onFilterChange: (x, y, w, h, alpha) => {
            dispatch(setFilterChange(x, y, w, h, alpha));
        },
        onSetFilterChangeFunc: func => {
            dispatch(setFilterChangeFunc(func));
        },
        onSaveFilterChanges: () => dispatch(saveFilterChanges()),
    };
};

class Filter extends React.Component {

    constructor(props) {
        super();
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onTlDown = this.onTlDown.bind(this);
        this.onTrDown = this.onTrDown.bind(this);
        this.onBlDown = this.onBlDown.bind(this);
        this.onBrDown = this.onBrDown.bind(this);
    }

    onDoubleClick(e) {
        const { id, changes, onToggleFilterChanges } = this.props;
        onToggleFilterChanges(id, !changes);
    }

    callbackService = CallbackService.getInstance();

    onTlDown(e) {
        const { onSetFilterChangeFunc, changes } = this.props;
        const { x, y, w, h } = changes;
        this.onChangesDown((mx, my, alpha) => {
            return {
                x: (w + x > mx) ? mx : (x + w),
                y: (h + y > my) ? my : (y + h),
                w: (w + x > mx) ? (w + x - mx) : mx - x - w,
                h: (h + y > my) ? (h + y - my) : my - y - h,
                alpha: alpha,
            };
        });
    }
    onTrDown(e) {
        const { onSetFilterChangeFunc, changes } = this.props;
        const { x, y, w, h } = changes;
        this.onChangesDown((mx, my, alpha) => {
            return {
                x: (mx > x) ? x : mx,
                y: (h + y > my) ? my : (y + h),
                w: (mx > x) ? (mx - x) : (x - mx),
                h: (h + y > my) ? (h + y - my) : my - y - h,
                alpha: alpha,
            };
        });
    }
    onBlDown(e) {
        const { onSetFilterChangeFunc, changes } = this.props;
        const { x, y, w, h } = changes;
        this.onChangesDown((mx, my, alpha) => {

            return {
                x: (w + x > mx) ? mx : (x + w),
                y: (my > y) ? y : my,
                w: (w + x > mx) ? (w + x - mx) : mx - x - w,
                h: (my > y) ? (my - y) : (y - my),
                alpha: alpha,
            };
        });
    }
    onBrDown(e) {
        const { onSetFilterChangeFunc, changes } = this.props;
        const { x, y, w, h } = changes;
        this.onChangesDown((mx, my, alpha) => {
            return {
                x: (mx > x) ? x : mx,
                y: (my > y) ? y : my,
                w: (mx > x) ? (mx - x) : (x - mx),
                h: (my > y) ? (my - y) : (y - my),
                alpha: alpha,
            };
        });
    }
    onBodyDown(e) {
        const { onSetFilterChangeFunc, changes } = this.props;
        const { x, y, w, h } = changes;
        this.onChangesDown((mx, my, alpha) => {
            return {
                x: (mx > x) ? x : mx,
                y: (my > y) ? y : my,
                w: (mx > x) ? (mx - x) : (x - mx),
                h: (my > y) ? (my - y) : (y - my),
                alpha: alpha,
            };
        });
    }

    onChangesDown(func) {
        const { onSetFilterChangeFunc } = this.props;
        onSetFilterChangeFunc(func);
        this.callbackService.onMouseUp('filterChange', () => {
            onSetFilterChangeFunc(null);
            this.callbackService.unsubscribeOnMouseUp('filterChange');
        });
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { x, y, h, w, name, color, changes, mouse, table, onFilterChange } = this.props;

        //console.warn(mouse);
        if (changes && changes.changeFunc && (mouse.x !== prevProps.mouse.x || mouse.y !== prevProps.mouse.y)) {
            let mx = mouse.x;
            let my = mouse.y;
            if (mx > table.w - w) {
                mx = table.w - w;
            } else if (mx < 0) {
                mx = 0;
            }
            if (my > table.h - h) {
                my = table.h - h;
            } else if (my < 0) {
                my = 0;
            }

            const { x, y, w, h, alpha } = changes.changeFunc(mx, my);

            onFilterChange(x, y, w, h, alpha);
        }
    }

    mouseUp(e) {
        const { id, x, y, onCardDown } = this.props;
        //console.log('Up', id);
        onCardDown(id, x, y);
        this.callbackService.unsubscribeOnMouseUp(id);
        return false;
    }

    render() {
        const { x, y, h, w, name, color, changes, alpha, onSaveFilterChanges } = this.props;
        const changesView = changes ? (
            <div style={{ top: changes.y, left: changes.x, height: changes.h, width: changes.w, transform: `rotate(${-changes.alpha}rad)` }}
                className="tt-filter-ch">

                <div className="tt-filter-ch-inner" onDoubleClick={onSaveFilterChanges}></div>

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