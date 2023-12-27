import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import Mail from 'nodemailer/lib/mailer';
import express from 'express';
dotenv.config();


//NodeMailer
const smtpTransport: any = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'contact@kagwave.com',
    pass: process.env.GMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
    
smtpTransport.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("STMP Authenticated. Server is ready to receive messages");
  }
});

module.exports = function(app: express.Application) {

  app.post('/contact', (req, res, next) => {
    
    let name = req.body.name;
    let email = req.body.email;
    let subject = "[inquiry] " + req.body.company + " / " + req.body.inquiry;
    let message = req.body.message ;

    let body = message + '<br><br>' + "— " + name + '<br>' + email

    var mailOptions = {
      from: 'contact@kagwave.com',
      to: 'contact@kagwave.com',
      subject: subject,
      html: body
    }

    smtpTransport.sendMail(mailOptions, (err, data) => {
        if (err) {
        console.log(err);
        res.json({
            status: 'fail'
        })
        } else {
        res.json({
            status: 'success'
        })
        }
    })
  });

}

