const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const config = require("config");
const app = express();
app.use(express.json());
app.use(
  cors({ orgin: "https://thawing-shore-00690.herokuapp.com/send-email" })
);

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.get(user),
      pass: config.get(pass),
    },
  });

  const mailOptions = {
    from: "your-gmail-username@gmail.com",
    to: config.get(user),
    subject: "New message from your contact form",
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Something went wrong");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
