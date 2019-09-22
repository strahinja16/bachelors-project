
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import { Col, Row } from 'react-flexbox-grid';
import { Message } from 'semantic-ui-react';
import Alert from '../elements/Alert';
import style from './style.scss';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirmedPassword: '',
      validationError: null,
      loading: false,
      successMessage: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setError(validationError = null) {
    this.setState({ validationError });
  }

  handleInputChange({ target: { name, value } }) {
    console.log({ name, value });
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError();

    if (!this.validateForm()) {
      return;
    }
    const { password } = this.state;
    const { onSubmit, push } = this.props;

    this.setState({ loading: true });

    onSubmit({ password })
      .then(({ data: { message } }) => {
        this.setState({
          successMessage: message,
          loading: false,
        }, () => {
          setTimeout(() => push('/'), 5000);
        });
      })
      .catch((error) => {
        const { data } = error.response;
        this.setError(data.message);
        this.setState({ loading: false });
      });
  }

  validateForm() {
    const { password, confirmedPassword } = this.state;
    const schema = Joi.object().keys({
      password: Joi.string()
        .required()
        .error(new Error('Password is required.')),
      confirmedPassword: Joi.string()
        .required()
        .valid(password)
        .error(new Error('Passwords must match.')),
    });

    const result = Joi.validate({ password, confirmedPassword }, schema);
    if (result.error && result.error.message) {
      this.setState({
        validationError: result.error.message,
      });
    }

    return !result.error;
  }

  render() {
    const {
      password, confirmedPassword, validationError, loading, successMessage,
    } = this.state;

    return (
      <section className={style.resetPassword}>
        <div className={style.container}>
          <Row center="xs">
            <Col xs={12} sm={12} md={12} lg={12}>
              <h2><span className={style.primaryText}>Reset </span>Password</h2>
              <form onSubmit={this.handleSubmit}>
                <Alert
                  className={validationError
                    ? style.message
                    : style.hidden}
                  message={validationError}
                />
                {successMessage && (
                  <div className={style.message}>
                    <Message positive content={successMessage} />
                  </div>
                )}
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
                <div>
                  <label htmlFor="confirmedPassword">Confirm password</label>
                  <input
                    onChange={this.handleInputChange}
                    type="password"
                    placeholder="Confirm password"
                    name="confirmedPassword"
                    value={confirmedPassword}
                  />
                </div>
                <button
                  className={style.submitButton}
                  disabled={loading}
                  type="submit"
                  onSubmit={this.handleSubmit}
                  name="button"
                >
                  Submit
                </button>
              </form>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}

ResetPassword.defaultProps = {
  push: null,
};

ResetPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  push: PropTypes.func,
};

export default ResetPassword;
