import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../../components/Profile';
import { unsubscribe } from '../../thunks/subscription';

const ProfilePage = ({ user, unsubscribeAction }) => (
  <section>
    <Profile user={user} unsubscribeAction={unsubscribeAction} />
  </section>
);

ProfilePage.propTypes = {
  user: PropTypes.shape({}).isRequired,
  unsubscribeAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  user: auth.get('user').toJS(),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    unsubscribeAction: unsubscribe,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage);
