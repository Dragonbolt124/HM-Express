
var express = require("express");
var Imagen = require("./models/imagenes").Imagen;
var router = express.Router();

router.get("/",function (req,res) {
    res.render("app/home");
});

router.get("/imagenes/new", function (req,res) {
    res.render("app/new_img");
});

router.get("/imagenes/:id/edit", function (req,res) {

});

// REST

router.route("/imagenes/:id")
    .get(function (req,res) {
        console.log("id: "+req.params.id);
        Imagen.findById(req.params.id,function (err, img) {
            if(err){
                console.log(err);
                res.require("/app/imagenes/new");
            }else
                res.render("app/show_img",{imagen: img});
        })
    })
    .put(function (req,res) { 

    })
    .delete(function (req,res) { 

    });

router.route("/imagenes")
    .get(function (req,res) {
        
    })
    .post(function (req,res) { 
        var data = {
            titulo: req.body.title
        }

        var imagen = new Imagen(data);

        imagen.save().then(function (img) {
            console.log("imagen guardada: "+img);
            res.redirect("/app/imagenes/"+img._id);
        },
        function (err) { 
            console.log(String(err));
            res.send("Error: "+String(err));
        })
    });

module.exports = router;