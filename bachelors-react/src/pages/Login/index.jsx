import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from '../../components/Login';

const LoginPage = ({ history: { push } }) => (
  <Fragment>
    <Login route="/" push={push} login={() => {}} />
  </Fragment>
);

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(LoginPage);
