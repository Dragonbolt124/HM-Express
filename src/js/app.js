
var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;

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
    let data_email = req.body.email;
    let data_pass = req.body.pass;
    let data_conf = req.body.password_confirmation;

    var user = new User({
        email: data_email, 
        password: data_pass,
        password_confirmation: data_conf
    });

    user.save().then((us) =>{
        res.send("Tus datos han sido guardados");
    },
    (err) =>{
        if(err)
        {
            console.log(String(err));
            res.send("Error: "+String(err));
        }
    });
});

app.listen(8080);