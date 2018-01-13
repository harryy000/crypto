var request = require("request")
var el = require('get-element')
var nodemailer = require('nodemailer');

function checkregister() {
    request('https://www.binance.com/register.html', function(error, response, body) {
   console.log(error)
        var res = body.toString()
        var register = res.indexOf("overwhelming")
        if (register !== -1) {
            console.log("registration still closed")
            setTimeout(function() {
                checkregister()
            }, 600000);

        } else {
            console.log("open so send email")
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'harryy000@gmail.com',
                    pass: 'DONTDREAMBIG000'
                }
            });
            const mailOptions = {
                from: 'harryy000@gmail.com', // sender address
                to: 'harryy000@gmail.com',// list of receivers
                subject: 'Registration open now for binance', // Subject line
                html: '<p>go register https://www.binance.com/register.html</p>' // plain text body
            };
            transporter.sendMail(mailOptions, function(err, info) {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });
        }
    });
}
checkregister()