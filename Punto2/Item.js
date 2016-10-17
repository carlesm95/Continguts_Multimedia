var Item = function Item(nombre, imagen, precio){
	this.name = nombre    
	this.image = imagen;
	this.price = precio
};

// Get price
Item.prototype.getPrice = function(){
    return this.price
}

exports.Item = Item;
