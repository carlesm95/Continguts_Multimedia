// FUNCIÓN PARA USAR CON MIS IMAGENES
/*var Item = function Item(nombre, imagen, precio){
	this.name = nombre    
	this.image = imagen;
	this.price = precio
};

// Get price
Item.prototype.getPrice = function(){
    return this.price
}

exports.Item = Item;
*/

var Item = function Item(imagen){
	this.image = imagen;
	this.price = 0.00;
    this.name = "Barcelona";
};

// Get random price in range min, max
Item.prototype.getPrice = function(){
	var min = 100;
	var max = 1000;
	return (Math.random() * (max - min) + min).toFixed(2);
}

exports.Item = Item;