
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/primera_db");
mongoose.useFindAndModify = false;

var email_exp = [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , 
    "Tu correo electronico no es valido"];
var password_validation = {
    validator: function(pass){
        console.log("email: "+this.email);
        console.log("password_confirmation: "+this.password_confirmation)
        return this.password_confirmation == pass;
    },
    message: "Las contraseñas no coinciden"
};

var user_schema = new Schema({
    email: {
        type: String, 
        required: "El correo es obligatorio", 
        match: email_exp
    },
    password: {
        type: String,
        validate: password_validation
    }
});

user_schema.virtual("password_confirmation").get(function () {
    return this.passwordc;
}).set(function (password) {
    this.passwordc = password;
});

var User = mongoose.model("User",user_schema);

module.exports.User = User;