import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../../components/Login';
import { login } from '../../thunks/auth';

const LoginPage = ({ history: { push }, loginAction }) => (
  <Fragment>
    <Login route="/" push={push} login={loginAction} />
  </Fragment>
);

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loginAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loginAction: login,
  },
  dispatch,
);

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(LoginPage),
);
