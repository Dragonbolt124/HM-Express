
var express = require("express");

var app = express();

app.set("view engine", "pug");
app.set("views","./views");


app.get("/",function (req,res) {
    res.render("index",{nombre: "Gustavo"});
});

app.listen(8080);