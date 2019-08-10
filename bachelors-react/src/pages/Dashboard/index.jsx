import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Showcase from '../../components/Showcase';
import Features from '../../components/Features';
import Contact from '../../components/Contact';

const Dashboard = () => (
  <Fragment>
    <Showcase />
    <Features />
    <Contact />
  </Fragment>
);

export default withRouter(Dashboard);
