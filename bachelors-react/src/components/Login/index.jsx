/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import { Col, Row } from 'react-flexbox-grid';
import { Alert } from '../elements';
import style from './styles.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validationError: null,
      loading: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);
  }

  onForgotPassword(e) {
    e.preventDefault();

    const { push } = this.props;
    push('/forgot-password');
  }

  setError(validationError = null) {
    this.setState({ validationError });
  }

  handleLogin() {
    const { email, password } = this.state;
    const { login: loginAction, route, push } = this.props;

    this.setState({ loading: true });

    loginAction({ email, password })
      .then(() => push(route))
      .catch((e) => {
        const error = (e.response && e.response.data && e.response.data.message)
          ? e.response.data.message
          : 'Something went wrong';
        this.setError(error);
        this.setState({ loading: false });
      });
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError();

    if (this.validateForm()) {
      this.handleLogin();
    }
  }

  validateForm() {
    const { email, password } = this.state;

    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required()
        .error(new Error('Invalid email format.')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required.')),
    });

    const result = Joi.validate({ email, password }, schema);

    if (result.error && result.error.message) {
      this.setState({
        validationError: result.error.message,
      });
    }
    return !result.error;
  }

  render() {
    const {
      email, password, validationError, loading,
    } = this.state;

    return (
      <section className={style.login}>
        <div className={style.container}>
          <Row center="xs">
            <Col xs={12} sm={12} md={12} lg={12}>
              <h2><span className={style.primaryText}>Log</span>in</h2>
              <form onSubmit={this.handleSubmit}>
                <Alert
                  className={validationError
                    ? style.errorMessage
                    : style.hidden}
                  message={validationError}
                />
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={this.handleInputChange}
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={this.handleInputChange}
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                  />
                </div>
                <button
                  className={style.loginButton}
                  disabled={loading}
                  type="submit"
                  onSubmit={this.handleSubmit}
                  name="button"
                >
                  Login
                </button>
                <button
                  className={style.forgotButton}
                  disabled={loading}
                  onClick={this.onForgotPassword}
                  name="button"
                >
                  Forgot password?
                </button>
              </form>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  route: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default Login;
