import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Showcase from '../../components/Showcase';
import Features from '../../components/Features';

const Dashboard = () => (
  <Fragment>
    <Showcase />
    <Features />
  </Fragment>
);

export default withRouter(Dashboard);
