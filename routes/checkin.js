var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");



// Models

var Visitor = require('../models/visitor');

//---------


//for fast2sms api

var unirest = require("unirest");
var uni = unirest("POST", "https://www.fast2sms.com/dev/bulk");

uni.headers({
    "authorization": "3jxlXNQDpTH4SyqOwReY2g9s1tIkoLiPCVrMFdEUanBZK75zb6W9YdzA3CxFB4XGavb5H6RrM7pm1PuK"
});

uni.headers({
    "cache-control": "no-cache"
});

//-------------


//------
//for nodemailer
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "Enter gmail account",
        pass: 'Enter Password'
    }
});
var mailOptions = {
    from: 'Gmail account entered above',
    to: "",
    subject: "",
    text: ""
};
//------------



//check-in route
router.get("/checkin", function (req, res) {

    res.render("checkin");
});

router.post("/checkin", function (req, res) {
    Visitor.create(req.body.visitor, function (err, visitor) {
        if (err) {

            return res.redirect("/checkin");
        } else {
            console.log(visitor);
            mailOptions.to = visitor.hostEmail;
            mailOptions.text = checkIn(visitor);
            mailOptions.subject = "Check-in Details"
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("mail sent" + info.response);

                }
            });
            uni.form({
                "sender_id": "FSTSMS",
                "message": checkIn(visitor),
                "language": "english",
                "route": "p",
                "numbers": visitor.phone
            });
            uni.end(function (res) {
                if (res.error) throw new Error(res.error);

                console.log(res.body);
            });
            req.flash("success", "Check-in successful");
            res.redirect("/");

        }
    })
});


// function to create message template
function checkIn(visitor) {
    var name = visitor.name;
    var email = visitor.email;
    var phone = visitor.phone;
    var checkin = visitor.checkin.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    var message = "Name: " + name + "\n\n" + "Email: " + email + "\n\n" + "Phone no: " + phone + "\n\n" + "Check-in time: " + checkin;

    return message;
}


module.exports = router;
