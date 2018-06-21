import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Table from './components/Table';
import ServerListener from './components/ServerListener';

export default () => (
    <Layout>
        <ServerListener />
        <Route exact path='/' component={Table} />
    </Layout>
);
