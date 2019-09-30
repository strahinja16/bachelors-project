import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import UsersTable from '../../components/UsersTable';
import { getUsers } from '../../thunks/admin';
import style from './style.scss';

class Admin extends Component {
  componentDidMount() {
    const { getUsersAction } = this.props;

    getUsersAction();
  }

  render() {
    const { users } = this.props;

    if (!users) {
      return <Loader />;
    }

    return (
      <section className={style.section}>
        <div style={{ 'font-size': '25px' }}>Users</div>
        <UsersTable users={users} />
      </section>
    );
  }
}

Admin.defaultProps = {
  users: null,
};

Admin.propTypes = {
  users: PropTypes.shape({}),
  getUsersAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ admin }) => ({
  users: admin.get('users'),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getUsersAction: getUsers,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
