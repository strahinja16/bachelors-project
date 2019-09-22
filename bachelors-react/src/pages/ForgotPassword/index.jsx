import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import ForgotPassword from '../../components/ForgotPassword';

const ForgotPasswordPage = () => (
  <Fragment>
    <ForgotPassword />
  </Fragment>
);

export default withRouter(ForgotPasswordPage);
