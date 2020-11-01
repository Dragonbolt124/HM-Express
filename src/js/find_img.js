
var Imagen = require("./models/imagenes").Imagen;
//var owner_check = require("./img_control");

module.exports = function (req,res,next) { 
    Imagen.findById(req.params.id).populate("creator").exec(
        function (err, img) {
            if(img != null){
                res.locals.imagen = img;
                next();
                /*
                if(owner_check(img,req,res)){
                    res.locals.imagen = img;
                    next();
                }*/
            }
            else{
                res.redirect("/app");
            }
        }
    )
};