const moment = require('moment');
const Mail = require('../../../resources/mails/mail');

class PurchaseMail extends Mail {
	constructor(sender, recipient, subject, user) {
		super();
		this.setFrom(sender);
		this.setTo(recipient);
		this.setSubject(subject);
		this.renderBody(user);
	}

	renderBody(user) {
		const message = `Greetings ${user.firstName} ${user.lastName}!\n\nYou successfully subscribed.\n\nYour licence: ${user.licence} \nExpiration date: ${moment(user.licenceExpirationDate).format("hh:MM:ss DD-MM-YYYY")}`;
		this.setText(message);
	}
}

module.exports = PurchaseMail;
