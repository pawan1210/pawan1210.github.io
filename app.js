var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var async = require('async');
//Routes
var checkinRoutes = require('./routes/checkin');
var checkoutRoutes = require('./routes/checkout');
//-------

var MongoURI = "mongodb+srv://pawan:ps199912@cluster0-y6m1y.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(MongoURI, { useNewUrlParser: true });









//---------
//for flash messages
app.use(require('express-session')({
    secret: "pawan is the best guy",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(function (req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//--------------





app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkinRoutes);
app.use(checkoutRoutes);



//landing page
app.get("/", function (req, res) {
    res.render('index');
});

app.listen(process.env.PORT || 3000, function () {
    console.log("App Started");
}); 