import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { IconContext } from 'react-icons';
import style from './styles.scss';
import { IconRow } from '../elements';
import { FirstRowIcons, SecondRowIcons } from './FeatureIcons';

const Features = () => (
  <IconContext.Provider value={{ className: style.fa }}>
    <section>
      <div className={style.container}>
        <Row center="xs">
          <Col xs={12} sm={12} md={12} lg={12}>
            <h2>Core Features</h2>
            <IconRow icons={FirstRowIcons} />
            <IconRow icons={SecondRowIcons} />
          </Col>
        </Row>
      </div>
    </section>
  </IconContext.Provider>
);

export default Features;
