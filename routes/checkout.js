var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

//---------
// Models
//---------
var Visitor = require('../models/visitor');
var Checkout = require('../models/checkout');
//---------


//------
//for nodemailer
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "pawansggu@gmail.com",
        pass: 'ps199912'
    }
});
var mailOptions = {
    from: 'pawansggu@gmail.com',
    to: "",
    subject: "",
    text: ""
};
//------------



//check-out route
router.get("/checkout", function (req, res) {
    res.render("checkout");
});

router.post("/checkout", function (req, res) {
    var outMail = req.body.email;
    var address = req.body.address;
    Visitor.findOne({ email: outMail }, function (err, foundVisitor) {
        if (err || foundVisitor == null) {
            req.flash("error", "Error! You have not checked-in");
            return res.redirect("/");
        } else {
            console.log(foundVisitor);
            mailOptions.to = outMail;
            var info = {
                name: foundVisitor.name,
                phone: foundVisitor.phone,
                hostName: foundVisitor.hostName,
                address: address,
                checkin: foundVisitor.checkin.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            };
            Checkout.create(info, function (err, user) {
                if (err) {
                    console.log(err);
                } else {
                    mailOptions.text = checkOut(user);
                    mailOptions.to = outMail;
                    mailOptions.subject = "Check-out Detals"
                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("mail sent" + info.response);
                        }
                    });
                    Visitor.deleteOne({ email: outMail }, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });

                }
            });
            req.flash("success", "Check-out successful");
            res.redirect("/");
        }
    });

});


//function to create message template
function checkOut(visitor) {
    var name = visitor.name;
    var phone = visitor.phone;
    var checkin = visitor.checkin.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    var checkout = visitor.checkout.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    var message = "Name: " + name + "\n\n" + "Phone no: " + phone + "\n\n" + "Check-in time: " + checkin + "\n\n" + "Check-out time: " + checkout + "\n\n" + "Host Name: " + visitor.hostName
        + "\n\n" + "Address Visited: " + visitor.address;
    return message;
}


module.exports = router;