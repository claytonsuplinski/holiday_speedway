function Camera(parent){
	this.rad = 10;
	this.lat = 0;
	this.lon = 0;
	
	this.parent = parent;
}

Camera.prototype.draw = function(){
	this.parent.align_inverse();
};