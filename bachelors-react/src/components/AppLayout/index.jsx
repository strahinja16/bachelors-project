
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const AppLayout = ({
  children, history, location, isLoggedIn, isAdmin,
}) => {
  const changeRoute = (newRoute) => {
    history.push(newRoute);
  };

  return (
    <div>
      <Header
        onItemChange={changeRoute}
        activeItem={location.pathname}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default withRouter(AppLayout);
