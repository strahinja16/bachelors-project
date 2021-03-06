/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { PriceBox } from '../elements';
import boxesData from './PriceBoxLayoutBoxes';
import style from './styles.scss';

const PriceBoxLayout = ({ onPurchase, error }) => (
  <section className={style.section}>
    <div className="">
      <Row center="xs">
        <h2>Pricing packages</h2>
      </Row>
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      <Row>
        {boxesData.map(({
          packageType, subscriptionFee, isPrimary, domains, diskSpace, dataTransfer,
        }) => (
          <Col key={packageType} className="" xs={12} sm={4} md={4} lg={4}>
            <PriceBox
              packageType={packageType}
              subscriptionFee={subscriptionFee}
              isPrimary={isPrimary}
              domains={domains}
              diskSpace={diskSpace}
              dataTransfer={dataTransfer}
              onPurchase={onPurchase}
            />
          </Col>
        ))}
      </Row>
    </div>
  </section>
);

PriceBoxLayout.defaultProps = {
  error: null,
};

PriceBoxLayout.propTypes = {
  onPurchase: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default PriceBoxLayout;
