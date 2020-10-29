
var express = require("express");

var app = express();

app.set("view engine", "pug");
app.set("views","./views");

app.get("/",function (req,res) {
    res.render("index",{nombre: "Gustavo"});
});

app.get("/login",function (req,res) {
    res.render("form1");
})

app.post("/",function (req,res) {
    res.render("form1");
});

app.listen(8080);