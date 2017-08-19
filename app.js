var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/bdfood');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

  /*var data = {
    title: "Producto",
    description: "primer",
    imageUrl:"data.png",
    pricing: 10
  }

  var product = new Product(data);

  product.save(function(err){
    console.log(product);
  });*/

  respuesta.render("index");
});

app.post("/menu",function(solicitud,respuesta){
  if(solicitud.body.password == "123"){
    var data = {
      title: solicitud.body.title,
      description: solicitud.body.description,
      imageUrl: "data.png",
      pricing: solicitud.body.pricing
    }

    var product = new Product(data);

    product.save(function(err){
      console.log(product);
      respuesta.render("index");
    });
  }else{
    respuesta.render("menu/new");
  }

});

app.get("/menu/new",function(solicitud,respuesta){

  respuesta.render("menu/new")

})

app.listen(8080);