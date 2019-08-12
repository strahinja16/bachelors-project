import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';

const RouteList = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/sign-up" component={SignUpPage} />
    <Redirect to="/" />
  </Switch>
);

const Routes = () => (
  <AppLayout>
    <RouteList />
  </AppLayout>
);

export default Routes;
