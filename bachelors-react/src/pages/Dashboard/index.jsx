import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Showcase from '../../components/Showcase';
import Features from '../../components/Features';
import Contact from '../../components/Contact';
import Company from '../../components/Company';
import PriceBoxLayout from '../../components/PriceBoxLayout';

const Dashboard = () => (
  <Fragment>
    <Showcase />
    <Features />
    <PriceBoxLayout />
    <Contact />
    <Company />
  </Fragment>
);

export default withRouter(Dashboard);