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

const Cursor = function ({ x, y, name, colour }) {
    return (
        <div
            style={{ top: y, left: x, borderColor: colour }}
            className="cursor noselect">
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cursor);