
var express = require("express");
var bodyParser = require("body-parser");
var cookieSession = require("cookie-session");
var methodOverride = require("method-override");
var session_val = require("./session");
var router_app = require("./routes_app");
var User = require("./models/user").User;

var app = express();

app.use(express.static("src"));
app.use("/:id*/css",express.static("src/css"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));
app.use(methodOverride("_method"));
app.use(cookieSession({
    name: "session",
    keys: ["llave1", "llave2"]
}));

app.use("/app",session_val);
app.use("/app",router_app);

app.set("view engine", "pug");
app.set("views","./views");

app.get("/",function (req,res) {
    res.render("index",{nombre: "Gustavo"});
});

app.get("/registro",function (req,res) {
    res.render("registro");
});

app.get("/login",function (req,res) {
    res.render("login");
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

app.post("/sesion",function (req,res) {
    User.findOne({
        email: req.body.email,
        password: req.body.pass
    },function (err,user) {
        req.session.user_id = user._id;
        res.redirect("/app");
    });
});

app.listen(8080);