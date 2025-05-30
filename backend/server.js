const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vespalx2@gmail.com",
      pass: "your_password"
    }
  });

  const mailOptions = {
    from: email,
    to: "vespalx2@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending message.");
    } else {
      res.status(200).send("Message sent successfully.");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
