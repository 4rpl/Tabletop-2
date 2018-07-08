import React from 'react';
import { Route } from 'react-router';
import Table from './components/Table';
import MainMenu from './components/MainMenu';
import Editor from './components/Editor';

export default () => (
    <div>
        <Route exact path='/' component={MainMenu} />
        <Route exact path='/table/:id' component={Table} />
        <Route exact path='/editor' component={Editor} />
    </div>
);
