
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import { NavLink } from 'react-router-dom';
import style from './styles.scss';

const NavItems = ({ isLoggedIn, isAdmin, activeItem }) => {
  if (!isLoggedIn) {
    return (
      <Fragment>
        <li className={activeItem === '/login' ? style.current : ''}>
          <NavLink exact to="/login">Login</NavLink>
        </li>
        <li className={activeItem === '/sign-up' ? style.current : ''}>
          <NavLink exact to="/sign-up">Sign up</NavLink>
        </li>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <li className={activeItem === '/profile' ? style.current : ''}>
        <NavLink exact to="/profile">Profile</NavLink>
      </li>
      {isAdmin && (
        <li className={activeItem === '/admin' ? style.current : ''}>
          <NavLink exact to="/admin">Admin panel</NavLink>
        </li>
      )}
      <li className={activeItem === '/logout' ? style.current : ''}>
        <NavLink exact to="/logout">Logout</NavLink>
      </li>
    </Fragment>
  );
};

NavItems.defaultProps = {
  activeItem: '/',
};

NavItems.propTypes = {
  activeItem: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const Header = ({ activeItem, isAdmin, isLoggedIn }) => (
  <header className={style.mainHeader}>
    <div className={style.container}>
      <Row end="sm" center="xs" middle="lg">
        <Col className={style.col} xs={12} sm={1} md={1} lg={1}>
          <NavLink exact to="/">
            <span className={style.logoPrimaryText}>App</span>
            <span className={style.logo}>Name</span>
          </NavLink>
        </Col>
        <Col xs={12} sm={10} md={10} lg={10}>
          <nav className={style.navbar}>
            <ul>
              <li className={activeItem === '/' ? style.current : ''}>
                <NavLink exact to="/">Home</NavLink>
              </li>
              <NavItems isAdmin={isAdmin} isLoggedIn={isLoggedIn} activeItem={activeItem} />
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
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default Header;
