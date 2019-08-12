import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignUp from '../../components/SignUp';

const SignUpPage = ({ history: { push } }) => (
  <Fragment>
    <SignUp route="/" push={push} signUp={() => {}} />
  </Fragment>
);

SignUpPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(SignUpPage);
