import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
// import smtpConfig from '../../smtpConfig';

dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendMail = payload => {
  const output = `
  <div style="font-size:15px; color: salmon; background-color: #f4f4f4; padding:35px; margin:0 auto; display:inline-block; font-family: tahoma;">Hi  ${
    payload.firstname
  },<p>Your record's status has been changed to <span style="color:green; font-weight:bold; font-size:14px; ">${
    payload.status
  }</span></p>
  
    </div>
    `;
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: payload.email,
    subject: 'iReporter information',
    html: output
  };
  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return 'Message is sent';
  });
};

export default sendMail;
