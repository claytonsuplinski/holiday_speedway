function Car(name){
	this.name = name;
	this.model = HSPEED.models.car;
	this.tires = "";
	
	this.velocity = 0;
	this.friction = 0.25;
	
	this.max_velocity = 10;
	this.min_velocity = -5;
	
	this.init();
};

Car.prototype = new SpaceObject();

Car.prototype.init = function(){
	this.init_tires();
};

Car.prototype.init_tires = function(){
	this.tires = [];
	var fl = new Tire({name: "Front Left"});
	fl.x =  1.8;fl.y = 0.75;fl.z =  3;
	var fr = new Tire({name: "Front Right"});
	fr.x = -1.8;fr.y = 0.75;fr.z =  3;
	var bl = new Tire({name: "Back Left"});
	bl.x =  2;bl.y = 0.75;bl.z = -3;
	var br = new Tire({name: "Back Right"});
	br.x = -2;br.y = 0.75;br.z = -3;
	this.tires.push(fl);
	this.tires.push(fr);
	this.tires.push(bl);
	this.tires.push(br);
};

Car.prototype.accelerate = function(){
	this.velocity+=0.5;
	if(this.velocity > this.max_velocity){
		this.velocity = this.max_velocity;
	}
};

Car.prototype.brake = function(){
	this.velocity--;
	if(this.velocity < 0){
		this.velocity = 0;
	}
};

Car.prototype.reverse = function(){
	this.velocity--;
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

Car.prototype.update = function(){
	var tmp_angle = this.yaw*HSPEED.constants.to_radians;
	this.x += this.velocity*Math.sin(tmp_angle);
	this.z += this.velocity*Math.cos(tmp_angle);
	
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
};

Car.prototype.draw_tires = function(){
	this.tires.forEach(function(tire){
		tire.draw();
	});	
};

Car.prototype.draw = function(){

	mvPushMatrix();
		this.align();
		this.model.draw();
		this.draw_tires();	
	mvPopMatrix();
	
	this.update();

};