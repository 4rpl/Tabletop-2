import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = function (state) {
    return {
        state: state
    };
}

const Filter = function ({ id, x, y, h, w, name, color }) {
    return (
        <div
            style={{ top: y, left: x, height: h, width: w, backgroundColor: color }}
            className="tt-filter tt-noselect">
            <span className="tt-filter-name">{name}</span>
        </div>
    );
}

export default connect(mapStateToProps)(Filter);