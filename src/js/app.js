
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/primera_db");
var userSchemaJSON = {
    email: String,
    password: String
};
var Schema = mongoose.Schema;
var user_schema = new Schema(userSchemaJSON);
var User = mongoose.model("User",user_schema);

var app = express();
app.use(express.static("src"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.set("view engine", "pug");
app.set("views","./views");

app.get("/",function (req,res) {
    res.render("index",{nombre: "Gustavo"});
});

app.get("/login",function (req,res) {
    User.find(function (err,doc) {
        console.log(doc);
        res.render("form1");
    });
})

app.post("/users",function (req,res) {
    var user = new User({email: req.body.email, password: req.body.pass});

    user.save(function () {
        res.send("Tus datos han sido guardados");
    })
});

app.listen(8080);