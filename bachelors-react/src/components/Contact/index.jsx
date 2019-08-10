/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import style from './styles.scss';

const Contact = () => (
  <section className={style.contact}>
    <div className={style.container}>
      <Row center="xs">
        <Col xs={12} sm={12} md={12} lg={12}>
          <h2><span className={style.primaryText}>Get</span> In Touch</h2>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea name="message" />
            </div>
            <button type="submit" name="button">Submit</button>
          </form>
        </Col>
      </Row>
    </div>
  </section>
);

export default Contact;
