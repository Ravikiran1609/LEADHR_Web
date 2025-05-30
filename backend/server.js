const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Configure your SMTP transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_password'
    }
  });

  const mailOptions = {
    from: email,
    to: 'your_email@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending message.');
    }
    res.status(200).send('Message sent successfully.');
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

