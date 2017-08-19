var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: "dhaowdzvr",
  api_key: "575659717289248",
  api_secret: "TyVm25ynHqZLxHW9mezjc-7NXyM"
});

var app = express();

mongoose.connect('mongodb://localhost/bdfood');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var uploader = multer({dest: './uploads'});
var middleware_upload = uploader.single('image_avatar');

// Definir el schema de nuestros productos

var productSchema = {
	title:String,
	description:String,
	imageUrl: String,
	pricing: Number
};

var Product = mongoose.model("Product", productSchema);

app.set("view engine","jade");

app.use(express.static("public"));

app.get("/",function(solicitud, respuesta){
  respuesta.render("index");
});

app.get("/menu",function(solicitud,respuesta){
  Product.find(function(error,documento){
    if(error){console.log(error); }
    res.render("menu/index", { products: documento })
  });
});

app.post("/menu",middleware_upload,function(solicitud,respuesta){
  if(solicitud.body.password == "123"){
    var data = {
      title: solicitud.body.title,
      description: solicitud.body.description,
      imageUrl: "data.png",
      pricing: solicitud.body.pricing
    }

    var product = new Product(data);
    if(solicitud.file){
    cloudinary.uploader.upload(solicitud.file.path,
      function(result) {
        product.imageUrl = result.url;

        product.save(function(err){
          console.log(product);
          respuesta.render("index");
        });
      });        
    }                          
  }else{
    respuesta.render("menu/new");
  }

});

app.get("/menu/new",function(solicitud,respuesta){

  respuesta.render("menu/new")

})

app.listen(8080);