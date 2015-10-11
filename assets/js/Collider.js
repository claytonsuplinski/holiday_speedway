function Collider(params){
	/*this.box = true;
	this.sphere = false;
	
	if(params.box){
		this.length = params.length;
		this.width  = params.width;
		this.height = params.height;
	}
	if(params.sphere){
		this.sphere = true;
		this.box = false;
		this.radius = params.radius;
	}
	*/
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
}

Collider.prototype = new SpaceObject();
Collider.prototype.constructor = Collider;

Collider.prototype.collided = function(obj){
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
	if(HSPEED.functions.distance(pos_1, pos_2) < this.radius + obj.radius){
		return true;
	}
	return false;
};

/*
Collider.prototype.collided = function(obj){
	if(this.sphere && obj.sphere){
		var this_pos = {x: this.parent.x + this.x, y: this.parent.y + this.y, z: this.parent.z + this.z};
		var that_pos = {x: obj.parent.x + obj.x, y: obj.parent.y + obj.y, z: obj.parent.z + obj.z};
		if(HSPEED.functions.distance(this_pos, that_pos) < this.radius + obj.radius){
			return true;
		}
	}
	else if(this.box && obj.box){
		if(Math.abs(this.parent.y - obj.parent.y) < this.height + obj.height){
			return true;
		}
	}
	else{
		if(this.sphere && obj.box){
		
		}
		else if(this.box && obj.sphere){
		
		}
	}
	return false;
}
*/