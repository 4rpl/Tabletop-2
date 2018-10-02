import React from 'react';
import { connect } from 'react-redux';
import { openContextMenu } from '../store/table/TableActions';

const mapStateToProps = function (state) {
    return state.game.contextMenu;
}

const mapDispatchToProps = function (dispatch) {
    return {
        onClose: () => {
            dispatch(openContextMenu(0, 0, []));
        },
    }
}

const ContextMenu = function ({ x, y, menuItems = [], onClose }) {

    if (menuItems.length === 0) {
        return null;
    }

    const itemsView = menuItems.map((item, index) => {
        const onMouseDown = (e) => {
            e.stopPropagation();
        };
        const onClick = (e) => {
            if (item.callback) {
                item.callback();
            }
            onClose();
        };
        return <li tabIndex="0" className="tt-noselect" key={index} onMouseDown={onMouseDown} onClick={onClick}>
            <span>{item.name}</span>
        </li>
    });

    return (
        <div
            style={{ top: y, left: x }}
            className="tt-context-menu">
            <ul>
                {itemsView}
            </ul>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);