import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.scss';

const PriceBox = ({
  isPrimary, packageType, subscriptionFee, diskSpace, dataTransfer, domains, onPurchase,
}) => (
  <ul className={style.box}>
    <li className={isPrimary ? style.primary : style.secondary}>{packageType}</li>
    <li className={style.emphasized}>
      <strong>$ {subscriptionFee}</strong>
    </li>
    <li>
      <strong>{diskSpace}GB</strong> Disk Space
    </li>
    <li>
      <strong>{dataTransfer}GB</strong> Data Transfer
    </li>
    <li><strong>{domains}</strong> Domains</li>
    <li className={style.emphasized}>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={() => onPurchase(subscriptionFee)}>Purchase</button>
    </li>
  </ul>
);

PriceBox.propTypes = {
  isPrimary: PropTypes.bool.isRequired,
  packageType: PropTypes.string.isRequired,
  subscriptionFee: PropTypes.string.isRequired,
  diskSpace: PropTypes.number.isRequired,
  dataTransfer: PropTypes.number.isRequired,
  domains: PropTypes.number.isRequired,
  onPurchase: PropTypes.func.isRequired,
};

export default PriceBox;
