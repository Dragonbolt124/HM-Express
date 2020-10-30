
var express = require("express");
var img_finder = require("./find_img")
var Imagen = require("./models/imagenes").Imagen;
var router = express.Router();

// Paginas

router.get("/",function (req,res) {
    res.render("app/home");
});

router.get("/imagenes/new", function (req,res) {
    res.render("app/new_img");
});

router.all("/imagenes/:id*",img_finder);

router.get("/imagenes/:id/edit", function (req,res) {
    res.render("app/edit_img");
});

// CRUD

router.route("/imagenes/:id")
    .get(function (req,res) {
        res.render("app/show_img");
    })
    .put(function (req,res) { 
        res.locals.imagen.titulo = req.body.title;
        res.locals.imagen.save().then(function (img) {
            console.log("imagen editada: "+img);
            res.redirect("/app/imagenes/");
        },
        function (err) { 
            console.log(String(err));
            res.render("app/edit_img");
        })
    })
    .delete(function (req,res) { 
        Imagen.findByIdAndRemove(req.params.id,function (err) {
            if(err)
                console.log(err);
            res.redirect("/app/imagenes/");
        })
    });

router.route("/imagenes")
    .get(function (req,res) {
        Imagen.find({},function (err,imagenes) { 
            if(err){
                res.redirect("/app");
            }else
                res.render("app/images",{imagenes: imagenes});
        });
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