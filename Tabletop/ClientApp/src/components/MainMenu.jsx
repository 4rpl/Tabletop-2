import React from 'react';
import { connect } from 'react-redux';

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
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Logo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
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