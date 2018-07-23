import React from 'react';
import { Route } from 'react-router';
import Table from './components/Table';
import Game from './components/Game';
//import MainMenu from './components/MainMenu';
import Editor from './components/Editor';

export default () => (
    <div>
        <Route exact path='/' component={Game} />
        <Route exact path='/table/:id' component={Table} />
        <Route exact path='/editor' component={Editor} />
    </div>
);
