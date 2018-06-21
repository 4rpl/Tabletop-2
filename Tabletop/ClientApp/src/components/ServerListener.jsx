import React from 'react';
import { connect } from 'react-redux';
import ServerSyncService from '../services/ServerSyncService';

const mapStateToProps = state => {
    return { state };
};

const mapDispatchToProps = dispatch => {
    return { dispatch }
}

const ServerListener = ({ state, dispatch }) => {
    let syncService = ServerSyncService.getInstance();
    syncService.onMessage = (event) => {
        let action = JSON.parse(event.data);
        dispatch({
            ...action,
            enforce: true
        });
    };

    return null;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerListener);