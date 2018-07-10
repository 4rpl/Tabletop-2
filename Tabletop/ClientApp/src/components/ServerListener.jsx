import { connect } from 'react-redux';
import ServerSyncService from '../services/ServerSyncService';
import { TableActionAccessTypes } from '../store/table/TableActions';

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
            access: TableActionAccessTypes.private
        });
    };

    return null;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerListener);