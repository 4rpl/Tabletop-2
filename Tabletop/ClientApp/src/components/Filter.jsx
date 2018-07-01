import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = function (state) {
    return {
        state: state
    };
}

const Filter = function ({ id, x, y, h, w }) {
    return (
        <div
            style={{ top: y, left: x, height: h, width: w }}
            className="filter noselect">
        </div>
    );
}

export default connect(mapStateToProps)(Filter);