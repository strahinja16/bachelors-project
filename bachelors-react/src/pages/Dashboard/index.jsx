import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Showcase from '../../components/Showcase';
import Features from '../../components/Features';
import Contact from '../../components/Contact';
import Company from '../../components/Company';
import PriceBoxLayout from '../../components/PriceBoxLayout';
import { subscribe } from '../../thunks/subscription';
import { logout } from '../../thunks/auth';

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.onPurchase = this.onPurchase.bind(this);
  }

  onPurchase() {
    const {
      history: { push }, isLoggedIn, subscribeAction, logoutAction,
    } = this.props;
    if (!isLoggedIn) {
      push('/login');
      return;
    }

    subscribeAction()
      .then((storefront) => {
        logoutAction();
        window.open(storefront, '_self');
      });
  }

  render() {
    return (
      <section>
        <Showcase />
        <Features />
        <PriceBoxLayout onPurchase={this.onPurchase} />
        <Contact />
        <Company />
      </section>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  subscribeAction: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: !!auth.get('user'),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    subscribeAction: subscribe,
    logoutAction: logout,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Dashboard),
);
