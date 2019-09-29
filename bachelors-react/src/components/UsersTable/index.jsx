/* eslint-disable no-mixed-spaces-and-tabs,no-tabs */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Loader, Table } from 'semantic-ui-react';
import moment from 'moment';
import usersColumns from '../../util/usersColumns';

const UsersTable = ({ users }) => {
  if (!users) {
    return <Loader />;
  }

  const renderColumns = user => (
    <Fragment>
      {usersColumns.map(({ header, value }) => {
			  let cell = '';
			  if (value) {
			    cell = user[value];
			  } else {
			    if (header === 'Licenced') {
			      cell = user.licence ? 'Yes' : 'No';
			    }
			    if (header === 'Last purchase') {
			      cell = user.order && user.order.createdAt
			        ? moment(user.order.createdAt).format('DD-MM-YYYY')
			        : '';
			    }
			    if (header === 'Cost') {
			      cell = user.order ? `$ ${user.order.price}.00` : '';
			    }
			  }
			  return (<Table.Cell key={header}>{cell}</Table.Cell>);
      })}
    </Fragment>
  );

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {usersColumns.map(({ header }) => (
            <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.users.map((user => (
          <Table.Row key={user.createdAt}>
            {renderColumns(user)}
          </Table.Row>
        )))}
      </Table.Body>
    </Table>);
};

UsersTable.defaultProps = {
  users: null,
};

UsersTable.propTypes = {
  users: PropTypes.shape({}),
};


export default UsersTable;
