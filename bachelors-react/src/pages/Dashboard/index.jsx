import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment } from '../../components/elements';

const Dashboard = () => (
  <Segment>
    <div>hello world</div>
  </Segment>
);

Dashboard.defaultProps = {
};

Dashboard.propTypes = {

};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Dashboard),
);
