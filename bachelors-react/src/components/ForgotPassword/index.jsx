import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import Joi from 'joi-browser';
import { Col, Row } from 'react-flexbox-grid';
import { Alert } from '../elements';
import { forgotPassword } from '../../api/auth';
import style from './style.scss';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      validationError: '',
      successMessage: '',
      loading: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { email } = this.state;
    this.setState({ loading: true });

    forgotPassword(email)
      .then(({ data: { message } }) => {
        this.setState({
          successMessage: message,
          loading: false,
        });
      })
      .catch((e) => {
        const { data } = e.response;
        this.setError(data.message);
        this.setState({ loading: false });
      });
  }

  setError(validationError = null) {
    this.setState({ validationError });
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError();

    if (this.validateForm()) {
      this.onSubmit();
    }
  }

  validateForm() {
    const { email } = this.state;
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required()
        .error(new Error('Invalid email format.')),
    });

    const result = Joi.validate({ email }, schema);
    if (result.error && result.error.message) {
      this.setState({
        validationError: result.error.message,
      });
    }
    return !result.error;
  }

  render() {
    const {
      email, validationError, loading, successMessage,
    } = this.state;

    return (
      <section className={style.forgotPassword}>
        <div className={style.container}>
          <Row center="xs">
            <Col xs={12} sm={12} md={12} lg={12}>
              <h2><span className={style.primaryText}>Forgot</span> password</h2>
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
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={this.handleInputChange}
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
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

export default ForgotPassword;
