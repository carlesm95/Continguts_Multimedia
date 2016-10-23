/**
 * Created by boyander on 11/10/16.
 */

var express = require('express');
var Item = require('./Item.js').Item;
var app = express();

// Configure jade to be our rendering engine
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// Enable boostrap from npm as a served static directory
app.use("/libs",express.static('node_modules/bootstrap/dist'));

// Our CSS and JS files
app.use("/public",express.static('public'));

// Cargo los articulos uno a uno pasandole a Item el nombre, la URL de la imagen y el precio
/*
var pics = [
	new Item("PLAYSTATION 4 PRO 1TB","https://m2.game.es/COVERV2/3D_L/130/130711.png","399.95"),
	new Item("XBOX ONE 1TB","https://m2.game.es/COVERV2/3D_L/121/121693.png","274.95"),
	new Item("NEW NINTENDO 3DS XL","https://m2.game.es/COVERV2/3D_L/111/111257.png","199.95"),
	new Item("NINTENDO 2DS","https://m2.game.es/COVERV2/3D_L/105/105453.png","89.95"),
	new Item("WiiU 32GB","https://cdn02.nintendo-europe.com/media/images/08_content_images/systems_5/wiiu_12/hardware_features/packs/WiiU_HW_BASIC_Box_PS_White_EUB_image600w.png","299.95"),
	new Item("PS VITA 1000 WIFI","https://m2.game.es/COVERV2/3D_L/078/078640.png","149.96"),
	new Item("PLAYSTATION 3 SLIM 500GB","https://m2.game.es/COVERV2/3D_L/089/089746.png","199.95"),
	new Item("XBOX 360 500GB","https://m2.game.es/COVERV2/3D_L/121/121326.png","99.95")
];
*/

// Use 500px API to get random pictures for our products
var API500px = require('500px');
var api500px = new API500px("YecP85RjzG08DN0MqvgFa0N780dNaDmJX6iTPbYp");
var pics = [];
api500px.photos.searchByTerm('Barcelona', {'sort': 'created_at', 'rpp': '10','image_size':200},  function(error, results) {
	// Do something
	pics = results.photos.map(function(a){
		// Compose object to be used in show items template
		return new Item(a.image_url);
	});
});

// Render frontpage
app.get('/', function (req, res) {
    res.render('portada',{
        pics: pics
    });
});


// Server start
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
