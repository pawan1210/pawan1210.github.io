var mongoose = require('mongoose');

var visitorSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    hostName: String,
    hostEmail: String,
    hostPhone: String,
    checkin: { type: Date, default: new Date() }
});

var Visitor = mongoose.model("Visitor", visitorSchema);
module.exports = Visitor;