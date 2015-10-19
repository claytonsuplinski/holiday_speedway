function Collider(params){
	this.model = jQuery.extend({}, HSPEED.models.collider);
	this.model.scale = [params.radius, params.radius, params.radius];

	this.radius = params.radius;
	
	if(params.x){
		this.x = params.x;
	}
	if(params.y){
		this.y = params.y;
	}
	if(params.z){
		this.z = params.z;
	}
	
	this.inverse = false;
	if(params.inverse){
		this.inverse = true;
	}
}

Collider.prototype = new SpaceObject();
Collider.prototype.constructor = Collider;

Collider.prototype.collided = function(obj){
	var self = this;
	
	var pos_1 = {
			x: this.parent.x + this.x, 
			y: this.parent.y + this.y,
			z: this.parent.z + this.z
	};
	var pos_2 = {
			x: obj.parent.x + obj.x, 
			y: obj.parent.y + obj.y, 
			z: obj.parent.z + obj.z
	};

	var pos_dist = HSPEED.functions.distance(pos_1, pos_2);
	if(this.inverse || obj.inverse){
		var tmp_dist = Math.abs(self.radius - obj.radius);
		if(pos_dist < tmp_dist){
			return {collided: false, distance: 0};
		}
		return {collided: true, distance: pos_dist - tmp_dist};
	}	
	
	var tmp_dist = this.radius + obj.radius;
	if(pos_dist < tmp_dist){
		return {collided: true, distance: tmp_dist - pos_dist};
	}
	return {collided: false, distance: 0};
};

Collider.prototype.draw = function(){
	mvPushMatrix();
		mat4.translate(mvMatrix, [
			this.parent.x + this.x,
			this.parent.y + this.y,
			this.parent.z + this.z
		]);
		
		this.model.draw();
	mvPopMatrix();
}