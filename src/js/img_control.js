
var Imagen = require("./models/imagenes");

module.exports = function (img,req,res) {
    if(req.method == "GET" && req.path.indexOf("edit") < 0)
        return true;
    else if(img.creator._id.toString() == res.locals.user._id)
        return true;
    else
        return false;
};