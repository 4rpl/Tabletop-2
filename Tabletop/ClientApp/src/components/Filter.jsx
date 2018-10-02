import React from 'react';
import { connect } from 'react-redux';
import { setFilterActive } from '../store/table/TableActions';

const mapStateToProps = state => {
    return {
        state,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetFilterActive: (id, isActive) => {
            dispatch(setFilterActive(id, isActive));
        }
    };
}

class Filter extends React.Component {

    constructor(props) {
        super();
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }

    onDoubleClick(e) {
        const { id, isActive, onSetFilterActive } = this.props;
        onSetFilterActive(id, !isActive);
    }

    render() {
        const { x, y, h, w, name, color, isActive } = this.props;
        const className = 'tt-filter tt-noselect' + (isActive ? ' tt-filter-active' : '');
        return (
            <div
                tabIndex="0"
                style={{ top: y, left: x, height: h, width: w, backgroundColor: color }}
                onDoubleClick={this.onDoubleClick}
                className={className}>
                <span className="tt-filter-name">{name}</span>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);