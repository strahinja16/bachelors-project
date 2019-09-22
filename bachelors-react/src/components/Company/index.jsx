import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { FaPhone, FaEnvelope, FaMap } from 'react-icons/fa';
import style from './styles.scss';

const Company = () => (
  <section className={style.company}>
    <div className={style.container}>
      <Row>
        <Col className={style.col} xs={12} sm={12} md={12} lg={4}>
          <h4>Contact Us</h4>
          <ul>
            <li><FaPhone /> (617) 555-5555</li>
            <li><FaEnvelope /> support@appname.test</li>
            <li><FaMap /> 400 Main st, New York NY</li>
          </ul>
        </Col>
        <Col className={style.col} xs={12} sm={12} md={12} lg={4}>
          <h4>About Us</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
        </Col>
        <Col className={style.col} xs={12} sm={12} md={12} lg={4}>
          <h4>Newsletter</h4>
          <p>Lorem ipsum dolor sit amet</p>
          <form>
            <input type="text" name="email" placeholder="Enter Email" />
            <button type="submit" name="button">Submit</button>
          </form>
        </Col>
      </Row>
    </div>
  </section>
);

export default Company;
