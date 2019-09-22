import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { logout } from '../../thunks/auth';

const Logout = ({ logoutAction, history: { push } }) => {
  logoutAction();
  push('/');
  return null;
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    logoutAction: logout,
  },
  dispatch,
);

Logout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(Logout));
