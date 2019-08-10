
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import style from './styles.scss';
import sharedStyle from '../../shared.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.itemChangeCallback = this.itemChangeCallback.bind(this);
  }

  itemChangeCallback(url) {
    const { activeItem, onItemChange } = this.props;
    if (activeItem === url) {
      return;
    }
    onItemChange(url);
  }

  render() {
    return (
      <header className={style.mainHeader}>
        <div className={sharedStyle.container}>
          <Row end="sm md lg" center="xs" middle="xs sm md lg">
            <Col xs={12} sm={2} md={2} lg={2}>
              <h1><span className={sharedStyle.primaryText}>App</span>Theme</h1>
            </Col>
            <Col xs={12} sm={10} md={10} lg={10}>
              <nav className={style.navbar}>
                <ul>
                  <li className={style.current}><a href="index.html">Home</a></li>
                  <li><a href="about.html">About</a></li>
                  <li><a href="services.html">Services</a></li>
                  <li><a href="contact.html">Contact</a></li>
                </ul>
              </nav>
            </Col>
          </Row>
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  activeItem: '/',
};

Header.propTypes = {
  activeItem: PropTypes.string,
  onItemChange: PropTypes.func.isRequired,
};

export default Header;
