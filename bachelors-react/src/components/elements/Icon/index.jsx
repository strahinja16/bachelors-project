import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-flexbox-grid';
import {  } from 'react-icons/fa';

const Icon = ({ heading, text, icon }) => (
  <Col xs={12} sm={4} md={4} lg={4}>
    {icon}
    <h4>{heading}</h4>
    <p>{text}</p>
  </Col>
);

Icon.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default Icon;
