import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import Mail from 'nodemailer/lib/mailer';
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

module.exports = function(app) {

  app.post('/contact', (req, res, next) => {
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var subject = "[inquiry] " + req.body.company + " / " + req.body.inquiry;
    var message = req.body.message ;

    var body = message + '<br><br>' + "— " + name + '<br>' + email

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

