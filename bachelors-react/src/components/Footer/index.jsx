import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import style from './styles.scss';

const Footer = () => (
  <footer className={style.footer}>
    <Row className={style.row} center="xs">
      <Col className={style.col} xs={12} sm={12} md={12} lg={12}>
        <p>Copyright &copy; 2019 | AppName</p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
