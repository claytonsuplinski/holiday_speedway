function SpaceObject(){
	this.name = "";
	this.model = "";
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.yaw = 0;
	this.parent = "";
	this.children = "";
	this.colliders = "";
	this.scale = "";
};

SpaceObject.prototype.align = function(){
	mat4.translate(mvMatrix, [this.x, this.y, this.z]);
	mat4.rotate(mvMatrix, this.yaw, [0,1,0]);
}

SpaceObject.prototype.align_inverse = function(){
	mat4.rotate(mvMatrix, -this.yaw, [0,1,0]);
	mat4.translate(mvMatrix, [-this.x, -this.y, -this.z]);
}

SpaceObject.prototype.add_collider = function(collider){
	if(this.colliders == ""){
		this.colliders = [];
	}
	collider.parent = this;
	this.colliders.push(collider);
};

SpaceObject.prototype.collided = function(obj){
	return this.collider.collided(obj.collider);
};

SpaceObject.prototype.draw = function(){
	mvPushMatrix();
		gl.enable(gl.BLEND);
			this.align();
			this.model.draw();
			if(this.children != ""){
				this.children.forEach(function(child){
					//alert(child.__proto__.constructor.name);
					child.draw();
				});	
			}
			/*
			if(this.colliders != ""){
				this.colliders.forEach(function(collider){
					collider.draw();
				});	
			}
			*/
		gl.disable(gl.BLEND);
	mvPopMatrix();
	
	if(this.update != undefined){
		this.update();
	}
};