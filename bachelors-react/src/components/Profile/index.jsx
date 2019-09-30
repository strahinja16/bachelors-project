import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'semantic-ui-react';
import style from './style.scss';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      licenceShowed: false,
    };

    this.isLicenced = this.isLicenced.bind(this);
    this.onShowLicence = this.onShowLicence.bind(this);
    this.onUnsubscribe = this.onUnsubscribe.bind(this);
  }

  onShowLicence() {
    this.setState({ licenceShowed: true });
  }

  onUnsubscribe() {
    const { unsubscribeAction } = this.props;
    unsubscribeAction();
  }

  isLicenced() {
    const { user: { licence, licenceExpirationDate } } = this.props;

    if (!licence) return 'No licence';
    if (moment(licenceExpirationDate).isAfter(moment(new Date())) > 0) return 'Licenced.';
    return 'Licence expired';
  }

  render() {
    const {
      user: {
        firstName, lastName, companyName, licence,
      },
    } = this.props;
    const { licenceShowed } = this.state;

    return (
      <section className={style.profile}>
        <Card className={style.card}>
          <Image centered src="/src/images/profile.jpeg" />
          <Card.Content className={`${style.cardContent} ${style.name}`}>
            <Card.Header className={style.textCenter}>{firstName} {lastName}</Card.Header>
            <Card.Description className={style.textCenter}>
              {companyName}
            </Card.Description>
          </Card.Content>
        </Card>
        <Card className={style.card}>
          <Card.Content className={style.cardContent}>
            <Card.Header>Subscription information:</Card.Header>
            <Card.Description>
              <div>{this.isLicenced()}</div>
            </Card.Description>
          </Card.Content>
          {licence && (
          <Card.Content className={style.cardContent}>
            <Card.Header>Options: </Card.Header>
            <Card.Description>
              {licence && !licenceShowed && (
              <div>
                <Button
                  className={style.unsub}
                  primary
                  onClick={this.onShowLicence}
                >
                    Show licence
                </Button>
              </div>
              )}
              {licenceShowed && <div className={style.licence}>{licence}</div>}
              {licence && (
              <div>
                <Button
                  className={style.unsub}
                  color="blue"
                  secondary
                  onClick={this.onUnsubscribe}
                >
                    Unsubscribe
                </Button>
              </div>
              )}
            </Card.Description>
          </Card.Content>
          )}
        </Card>
      </section>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({}).isRequired,
  unsubscribeAction: PropTypes.func.isRequired,
};

export default Profile;
