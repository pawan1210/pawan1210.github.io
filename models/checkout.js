var mongoose = require('mongoose');


var checkoutSchema = new mongoose.Schema({
    name: String,
    phone: String,
    hostName: String,
    address: String,
    checkin: String,
    checkout: { type: Date, default: new Date() }
});

var Checkout = mongoose.model("Checkout", checkoutSchema);
module.exports = Checkout;