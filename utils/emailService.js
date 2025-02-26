const nodemailer = require('nodemailer');
require('dotenv').config(); 

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS,  
  },
 
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,  
      to: to,                        
      subject: subject,              
      html: html,                   
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    console.log('Email sent by:', mailOptions.from);
    console.log('Sending email to:', mailOptions.to);
 
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
