import React from 'react';
import mostFrequentQuestions from '../../util/mostFrequentQuestions';
import HelpCard from '../../components/HelpCard';
import style from './style.scss';

const Help = () => (
  <section className={style.help}>
    <h1>Most frequent questions:</h1>
    <section>
      {mostFrequentQuestions.map(({ question, answer }, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <HelpCard key={i} answer={answer} question={question} />
      ))}
    </section>
  </section>
);

Help.propTypes = {
};

export default Help;
