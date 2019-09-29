const Mail = require('../../../resources/mails/mail');

class FailedMail extends Mail {
	constructor(sender, recipient, subject, user, reason) {
		super();
		this.setFrom(sender);
		this.setTo(recipient);
		this.setSubject(subject);
		this.renderBody(user, reason);
	}

	renderBody(user, reason) {
		const message = `Greetings ${user.firstName} ${user.lastName}!\n\nUnfortunately, your order failed.\n\n${reason} \n`;
		this.setText(message);
	}
}

module.exports = FailedMail;
