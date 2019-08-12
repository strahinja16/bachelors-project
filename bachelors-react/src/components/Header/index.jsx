
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import { NavLink } from 'react-router-dom';
import style from './styles.scss';

const Header = ({ activeItem }) => (
  <header className={style.mainHeader}>
    <div className={style.container}>
      <Row end="sm" center="xs" middle="lg">
        <Col className={style.col} xs={12} sm={1} md={1} lg={1}>
          <NavLink exact to="/">
            <span className={style.logoPrimaryText}>App</span>
            <span className={style.logo}>Theme</span>
          </NavLink>
        </Col>
        <Col xs={12} sm={10} md={10} lg={10}>
          <nav className={style.navbar}>
            <ul>
              <li className={activeItem === '/' ? style.current : ''}>
                <NavLink exact to="/">Home</NavLink>
              </li>
              <li className={activeItem === '/login' ? style.current : ''}>
                <NavLink exact to="/login">Login</NavLink>
              </li>
              <li className={activeItem === '/sign-up' ? style.current : ''}>
                <NavLink exact to="/sign-up">Sign up</NavLink>
              </li>
            </ul>
          </nav>
        </Col>
      </Row>
    </div>
  </header>
);

Header.defaultProps = {
  activeItem: '/',
};

Header.propTypes = {
  activeItem: PropTypes.string,
};

export default Header;
