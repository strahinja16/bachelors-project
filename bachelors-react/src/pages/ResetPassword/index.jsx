
import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResetPassword from '../../components/ResetPassword';
import { resetPassword, verifyToken } from '../../api/auth';

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props;

    verifyToken(token).catch(() => <Redirect to="/login" />);
  }

  onSubmit({ password }) {
    const {
      match: {
        params: { token },
      },
    } = this.props;

    return resetPassword(password, token);
  }

  render() {
    const {
      history: { push },
    } = this.props;
    return (
      <Fragment>
        <ResetPassword onSubmit={this.onSubmit} push={push} />
      </Fragment>
    );
  }
}

ResetPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ResetPasswordPage);
