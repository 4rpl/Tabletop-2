import React from 'react';
import { Route } from 'react-router';
import Game from './components/Game';
//import MainMenu from './components/MainMenu';
import Editor from './components/Editor';
import MainMenu from './components/MainMenu';

export default () => (
    <div>
        <Route exact path='/' component={MainMenu} />
        <Route exact path='/t/:id' component={Game} />
        <Route exact path='/e' component={Editor} />
    </div>
);
