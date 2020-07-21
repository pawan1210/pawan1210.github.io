var express=require('express');
var app=express();
var request=require('request');
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("search");
})

app.get('/results',function(req,res){
    var query=(req.query.search);
    request("http://www.omdbapi.com/?s="+query+"&apikey=8b1315b0",function(error,response,body){
        if(!error && response.statusCode==200){
            var data=JSON.parse(body);
            res.render("results",{data:data});
        }
    });
});

app.listen(3000,'127.0.0.1',function(){
    console.log("Movie App has Started");
})
