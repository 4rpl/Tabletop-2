import React from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import { Route } from 'react-router';

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

    let askForGameId = () => {
        console.log(123);
        let gameId = prompt('Game Id?', '');
        if (gameId) {
            window.location = '/table/' + gameId;
        }
    }

    return (
        <div className="main-menu">
            <h1>Стол v.2</h1>
            <input type="text" placeholder="Имя" />
            <h2>
                <a href="/table">> Создать игру</a>
            </h2>
            <h2>
                <a href="#" onClick={askForGameId}>> К игре</a>
            </h2>
            <h2>
                <a href="/editor">> Редактор</a>
            </h2>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainMenu);