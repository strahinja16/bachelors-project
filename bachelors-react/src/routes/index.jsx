import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Dashboard from '../pages/Dashboard';

const RouteList = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Redirect to="/" />
  </Switch>
);

const Routes = () => (
  <AppLayout>
    <RouteList />
  </AppLayout>
);

export default Routes;
