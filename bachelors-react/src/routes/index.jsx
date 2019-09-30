import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import { Loader } from "semantic-ui-react";
import { withRouter } from "react-router";
import Loadable from 'react-loadable';
import AppLayout from '../components/AppLayout';
import Dashboard from '../pages/Dashboard';

const dynamicImport = loader =>
  Loadable({
    loader,
    loading: () => <Loader active inline="centered" />,
  });

const AdminRoutes = () => <Route path="/admin" exact component={dynamicImport(() => import('../pages/Admin'))} />;

const LoggedInList = ({ isAdmin }) => (
  <Switch>
    <Route path="/profile" exact component={dynamicImport(() => import('../pages/Profile'))} />
    <Route path="/logout" exact component={dynamicImport(() => import('../components/Logout'))} />
    <Route path="/" exact component={Dashboard} />
    {isAdmin && <AdminRoutes />}
    <Redirect to="/" />
  </Switch>
);

LoggedInList.propTypes = {
  isAdmin: PropTypes.bool,
};

LoggedInList.defaultProps = {
  isAdmin: false,
};

const LoggedOutList = () => (
  <Switch>
    <Route exact path="/login" component={dynamicImport(() => import('../pages/Login'))} />
    <Route exact path="/sign-up" component={dynamicImport(() => import('../pages/SignUp'))} />
    <Route
      exact
      path="/forgot-password"
      component={dynamicImport(() => import('../pages/ForgotPassword'))}
    />
    <Route
      path="/reset-password/:token"
      component={dynamicImport(() => import('../pages/ResetPassword'))}
    />
    <Route path="/" component={Dashboard} />
    <Redirect to="/login" />
  </Switch>
);

const Routes = ({ isLoggedIn, isAdmin }) => (
  <AppLayout isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
    {isLoggedIn ? <LoggedInList isAdmin={isAdmin} /> : <LoggedOutList />}
  </AppLayout>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

Routes.defaultProps = {
  isLoggedIn: null,
  isAdmin: false,
};

const mapStateToProps = ({ auth }) => {
  return ({
    isAdmin: auth.getIn(['user', 'isAdmin']),
    isLoggedIn: !!auth.get('token'),
  });
};

export default withRouter(connect(mapStateToProps)(Routes));
