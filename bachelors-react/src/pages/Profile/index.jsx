import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../../components/Profile';

const ProfilePage = ({ user }) => (
  <segment>
    <Profile user={user} />
  </segment>
);

ProfilePage.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ auth }) => ({
  user: auth.get('user').toJS(),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage);
