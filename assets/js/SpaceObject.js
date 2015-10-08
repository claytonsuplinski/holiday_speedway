function SpaceObject(){
	this.name = "";
	this.model = "";
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.yaw = 0;
	this.parent = "";
};

SpaceObject.prototype.align = function(){
	mat4.translate(mvMatrix, [this.x, this.y, this.z]);
	mat4.rotate(mvMatrix, this.yaw, [0,1,0]);
}

SpaceObject.prototype.align_inverse = function(){
	mat4.rotate(mvMatrix, -this.yaw, [0,1,0]);
	mat4.translate(mvMatrix, [-this.x, -this.y, -this.z]);
}