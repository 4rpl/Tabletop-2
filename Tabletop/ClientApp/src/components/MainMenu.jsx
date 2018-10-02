import React from 'react';
import { connect } from 'react-redux';
import Api from '../services/Api';

const mapStateToProps = function (state) {
    return {
        state: state
    };
}

const mapDispatchToProps = function (dispatch) {
    return {

    };
}

const MainMenu = () => {

    const create = () => {
        let id = prompt('Id');
        Api.create(id).then(responce => {
            if (responce.redirected) {
                window.location = responce.url;
            }
        });
    }

    const join = () => {
        let id = prompt('Id');
        let pwd = prompt('Pwd');
        Api.join(id, pwd).then(responce => {
            if (responce.redirected) {
                window.location = responce.url;
            }
        });
    }

    const editor = () => {
    }

    return (
        <div>
            <button onClick={create}>Создать комнату</button>
            <button onClick={join}>Присоединиться к игре</button>
            <button onClick={editor}>Редактор</button>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainMenu);