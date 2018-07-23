import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = function (state) {
    return {
        state: state
    };
}

const mapDispatchToProps = function (dispatch) {
    return {};
}

const Cursor = function ({ x, y, name, color }) {
    if (!x || !y) {
        return null;
    }
    return (
        <div
            style={{ top: y, left: x, borderColor: color }}
            className="tt-cursor tt-noselect">
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cursor);