import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import style from './style.scss';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      licenceShowed: false,
    };

    this.isLicenced = this.isLicenced.bind(this);
    this.onShowLicence = this.onShowLicence.bind(this);
  }

  onShowLicence() {
    this.setState({ licenceShowed: true });
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
        firstName, lastName, companyName, country, licence,
      },
    } = this.props;
    const { licenceShowed } = this.state;

    return (
      <section className={style.profile}>
        <ul className={style.profileList}>
          {firstName && (
            <li>
              <div>First name: </div>
              <span>{firstName}</span>
            </li>
          )}
          {lastName && (
            <li>
              <div>Last name: </div>
              <span>{lastName}</span>
            </li>
          )}
          {companyName && (
            <li>
              <div>Company: </div>
              <span>{companyName}</span>
            </li>
          )}
          {country && <li><span>Country: </span><span>{country}</span></li>}
          <div className={style.licenceLabel}>{this.isLicenced()}</div>
        </ul>
        {licence && !licenceShowed && (
          <button
            type="button"
            className={style.licence}
            onClick={this.onShowLicence}
          >
            Show licence
          </button>
        )}
        {licenceShowed && <div className={style.licence}>{licence}</div>}
      </section>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default Profile;
