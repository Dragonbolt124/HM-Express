
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var img_schema = new Schema({
    titulo: {
        type: String, 
        required: "Necesita un titulo"
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

var Imagen = mongoose.model("Imagene",img_schema);

module.exports.Imagen = Imagen;