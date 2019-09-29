import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fade } from 'react-reveal';
import style from './style.scss';

class HelpCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAnswer: false,
    };

    this.onShowAnswer = this.onShowAnswer.bind(this);
  }

  onShowAnswer() {
    this.setState(prevState => ({ showAnswer: !prevState.showAnswer }));
  }

  render() {
    const { question, answer } = this.props;
    const { showAnswer } = this.state;
    return (
      <div className={style.helpCard}>
        <div className={style.question}>
          <div>{question}</div>
          <button type="button" onClick={this.onShowAnswer}>down</button>
        </div>
        <Fade top>
          <div className={showAnswer ? style.answer : style.hidden}>{answer}</div>
        </Fade>
      </div>
    );
  }
}

HelpCard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default HelpCard;
