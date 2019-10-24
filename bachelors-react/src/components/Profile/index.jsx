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
        <div>
          <Card className={style.card}>
            <Image centered src="/src/images/profile.jpeg" />
            <div className={style.textCenter}>{firstName} {lastName}</div>
            <div className={style.cardContent}>
              <div className={style.cardHeader}>Company:</div>
              <div>
                <div>{companyName}</div>
              </div>
            </div>
          </Card>
          <Card className={style.card}>
            <Card.Content>
              <Card.Header>Subscription information: </Card.Header>
              <Card.Description>
                <div>
                  <div>{this.isLicenced()}</div>
                </div>
              </Card.Description>
            </Card.Content>
            {licence && (
              <Card.Content>
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
                  {licenceShowed
                  && (
                  <div>
                    <div className={style.licence}>Licence: </div>
                    <div className={style.licence}>{licence}</div>
                  </div>
                  )}
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
        </div>
      </section>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({}).isRequired,
  unsubscribeAction: PropTypes.func.isRequired,
};

export default Profile;
