var nodemailer = require('nodemailer');
function Alertsend(doc,sub,callback){
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harryy000@gmail.com',
    pass: 'DONTDREAMBIG000'
  }
});

var mailOptions = {
  from: 'harryy000@gmail.com',
  to: 'harryy000@gmail.com',
  subject: sub,
  text: doc
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    
    callback(error,'')
  } else {
    
    callback('',info.response)
  }
});
}
module.exports=Alertsend