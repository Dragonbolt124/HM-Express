
var Imagen = require("./models/imagenes").Imagen;

module.exports = function (req,res,next) { 
    Imagen.findById(req.params.id,function (err, img) {
        if(img != null){
            res.locals.imagen = img;
            console.log("fi_imagen: "+img.titulo);
            next();
        }
        else{
            res.redirect("/app");
        }
    })
};