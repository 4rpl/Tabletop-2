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
    syncService.onMessage = action => {
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