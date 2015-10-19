function Car(name){
	this.name = name;
	this.model = HSPEED.models.car;
	
	this.y = 100;
	
	this.velocity = 0;
	this.friction = 0.25;
	
	this.velocity_vertical = 0;
	this.air_resistance_factor = 0.4;
	
	this.max_velocity = 10;
	this.min_velocity = -5;
	
	this.min_velocity_vertical = -10;
	
	this.init();
	this.add_collider(new Collider({parent: this, radius: 5, y: 4}));
};

Car.prototype = new SpaceObject();
Car.prototype.constructor = Car;

Car.prototype.init = function(){
	this.children = [];
	this.init_tires();
};

Car.prototype.init_tires = function(){
	var fl = new Tire({name: "Front Left"});
	fl.x =  2.5;fl.y = 0.75;fl.z =  2.5;
	var fr = new Tire({name: "Front Right"});
	fr.x = -2.5;fr.y = 0.75;fr.z =  2.5;
	var bl = new Tire({name: "Back Left"});
	bl.x =  2.5;bl.y = 0.75;bl.z = -2.5;
	var br = new Tire({name: "Back Right"});
	br.x = -2.5;br.y = 0.75;br.z = -2.5;
	this.children.push(fl);
	this.children.push(fr);
	this.children.push(bl);
	this.children.push(br);
};

Car.prototype.accelerate = function(){
	if(this.velocity < 0){
		this.velocity+=0.35;
	}
	else{
		this.velocity+=0.5;
	}
	if(this.velocity > this.max_velocity){
		this.velocity = this.max_velocity;
	}
};

Car.prototype.brake = function(){
	if(this.velocity > 0){
		this.velocity-=0.5;
		if(this.velocity < 0){
			this.velocity = 0;
		}
	}
	else{
		this.velocity+=0.5;
		if(this.velocity > 0){
			this.velocity = 0;
		}
	}
};

Car.prototype.reverse = function(){
	this.velocity-=0.3;
	if(this.velocity < this.min_velocity){
		this.velocity = this.min_velocity;
	}
};

Car.prototype.turn = function(amount){
	this.yaw-=amount*this.velocity;
	if(amount < 0){
		this.yaw%=360;
	}
	else{
		while(this.yaw < 0){
			this.yaw+=360;
		}
	}
};

Car.prototype.collided_with_terrain = function(){
	var return_val = {collided: false, distance: 0};
	this.colliders.forEach(function(collider){
		track.colliders.forEach(function(track_collider){
			var track_and_car = collider.collided(track_collider);
			if(track_and_car.collided){
				if(!return_val.collided || return_val.distance > track_and_car.distance){
					return_val = track_and_car;
				}
			}
		});
	});
	return return_val;
};

Car.prototype.update = function(){
	var tmp_angle = this.yaw*HSPEED.constants.to_radians;
	var tmp_collision;
	
	var del_x = this.velocity*Math.sin(tmp_angle);
	this.x += del_x;
	
	var del_z = this.velocity*Math.cos(tmp_angle);
	this.z += del_z;
	
	tmp_collision = this.collided_with_terrain();
	if(tmp_collision.collided){
		this.x -= del_x;
		this.z -= del_z;
		
		if(tmp_collision.distance > 0){
			this.x += (this.velocity - tmp_collision.distance) * Math.sin(tmp_angle);
			this.z += (this.velocity - tmp_collision.distance) * Math.cos(tmp_angle);
		}
	}
	
	if(this.velocity > 0){
		this.velocity -= this.friction;
		if(this.velocity < 0){
			this.velocity = 0;
		}
	}
	else if(this.velocity < 0){
		this.velocity += this.friction;
		if(this.velocity > 0){
			this.velocity = 0;
		}
	}
	
	var del_y = this.velocity_vertical;
	this.y += del_y;
	
	this.velocity_vertical -= (315.63 * 15 / 1000);
	this.velocity_vertical *= this.air_resistance_factor;
	if(this.velocity_vertical < this.min_velocity_vertical){
		this.velocity_vertical = this.min_velocity_vertical;
	}
	
	if(this.y <= 0){
		this.y = 0;
		this.velocity_vertical = 0;
	}
};