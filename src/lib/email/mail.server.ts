import nodemailer, { type Transporter } from 'nodemailer';

// const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_USER = 'notify@aneko.io'; //= process.env.EMAIL_USER;
const EMAIL_PASSWORD = 'aQi*K)V!_$44*sk'; //= process.env.EMAIL_PASSWORD;
const APP_NAME = 'Aneko';
const BASE_URL = 'http://localhost:5173';

export const sendEmail = async (email: string, subject: string, html: string) => {
	const transporter = nodemailer.createTransport({
		host: 'mail.privateemail.com',
		port: 587, // Use 465 for SSL
		secure: false, // true for 465, false for other ports

		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PASSWORD
		},
		// Force IPv4
		tls: {
			rejectUnauthorized: false
		}
		// Optional: specify the host and port if needed
		// host: 'smtp.example.com',
		// port: 587,
	});

	return new Promise((resolve, reject) => {
		transporter.sendMail(
			{
				from: EMAIL_USER,
				to: email,
				subject: subject,
				html: html
			},
			(err, info) => {
				if (err) {
					console.error(`Error sending email: ${JSON.stringify(err)}`);
					reject({
						statusCode: 500,
						message: 'Failed to send email',
						error: err
					});
				} else {
					console.log('Email sent successfully!', info);
					resolve({
						statusCode: 200,
						message: 'Email sent successfully.'
					});
				}
			}
		);
	});
};

// Send an email to verify the user's address
export const sendVerificationEmail = async (email: string, token: string) => {
	const subject = `Email Verification for ${APP_NAME}`;
	const html = `
		  <p>Dear ${email}!</p>
		  <br>
		  <p>Thank you for signing up for ${APP_NAME}! We're excited to have you join our community.</p>
		  <p>To ensure the security of your account and the accuracy of your email address, we kindly ask you to verify your email:</p>
		  <p> 
			  Follow the link to verify your emai: <a href="${BASE_URL}/verify-account-${token}">Verify</a>
		  </p>
		  <p>Thank you for choosing ${APP_NAME}. If you have any questions or need assistance, please don't hesitate to contact our support team at ${EMAIL_USER}.</p>
		  <br>
		  <p>Best regards,</p>
		  <p>The ${APP_NAME} Team	</p>
	  `;
	sendEmail(email, subject, html).catch((error) => {
		console.error(error.message);
	});
};

// Send an email to welcome the new user
export const sendWelcomeEmail = async (email: string) => {
	const subject = `Welcome to ${APP_NAME}`;
	const html = `
		  <p>Dear ${APP_NAME} customer,</p>
		  <br>
		  <p>Thanks for verifying your account with ${APP_NAME}.</p>
		  <p>Welcome to the ${APP_NAME} family! We're thrilled to have you on board and look forward to providing you with an exceptional experience. </p>
		  <p>You can now <a href="${BASE_URL}/login">sign in</a> to your account.</p>
		  <br>
		  <p>Thank you for choosing ${APP_NAME}. If you have any questions or need assistance, please don't hesitate to contact our support team at ${EMAIL_USER}.</p>
		  <br>
		  <p>Best regards,</p>
		  <p>The ${APP_NAME} Team	</p>
		  `;
	sendEmail(email, subject, html)
		// .then(async () => {
		// 	await prisma.user.update({
		// 		where: { email: email },
		// 		data: { verified: true }
		// 	});
		// })
		.catch((error) => {
			console.error(error.message);
		});
};

// // Send an email to reset the user's password
export const sendPasswordResetEmail = async (email: string, token: string) => {
	const updatePasswordURL = `${BASE_URL}/forgot/update-${token}`;
	const subject = `Change your password for ${APP_NAME}`;
	const html = `
		  <p>Please click this <a href="${updatePasswordURL}">link</a> to change your password for ${APP_NAME}.</p>
		  <p>You can also visit the link below.</p><p>${updatePasswordURL}</p>
		  <p>If you did not request to change your password, you can disregard this email.</p>
		  <br>
		  <p>Thank you for choosing ${APP_NAME}. If you have any questions or need assistance, please don't hesitate to contact our support team at ${EMAIL_USER}.</p>
		  <br>
		  <p>Best regards,</p>
		  <p>The ${APP_NAME} Team	</p>`;
	sendEmail(email, subject, html)
		// .then(async () => {
		// 	await prisma.user.update({
		// 		where: { email: email },
		// 		data: { token: token }
		// 	});
		// })
		.catch((error) => {
			console.error(error.message);
		});
};

export const sendInquiryAcceptanceEmail = async (
	email: string,
	inquiryID: string,
	message: string
) => {
	const subject = `Your inquiry - ${inquiryID} was received`;
	const html = `
	  <p>Dear, ${email}! </p> 
	  <br>
	  <p>${APP_NAME} team has received your inquiry:</p>
	  <br>
	  <p><i>${message}</i></p>
	  <br>
	  <p>We will reply very soon.</p>
	  <br>
	  <p> Use the following ID ${inquiryID} to track your inquiry status and our team response.</p> 
	  <br>
	  <p>Thank you for choosing ${APP_NAME}. If you have any questions or need assistance, please don't hesitate to contact our support team at ${EMAIL_USER}.</p>
	  <br>
	  <p>Best regards,</p>
	  <p>The ${APP_NAME} Team	</p>
  
	  `;
	const resultSend = sendEmail(email, subject, html);
	return resultSend;
};
