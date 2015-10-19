HSPEED.init = {};
HSPEED.init.models = function(){
	HSPEED.models.tire = new OBJ("./assets/models/wheel.obj");
	HSPEED.models.tire.set_shader(basic_shader);
	HSPEED.models.tire.set_texture("./assets/textures/wheel.png");
	
	HSPEED.models.car = new OBJ("./assets/models/halloween_car.obj");
	HSPEED.models.car.set_shader(basic_shader);
	HSPEED.models.car.set_texture("./assets/textures/halloween_car.png");
	
	HSPEED.models.track01 = new OBJ("./assets/models/track01.obj");
	HSPEED.models.track01.set_shader(basic_shader);
	HSPEED.models.track01.set_texture("./assets/textures/track01.png");
	
	HSPEED.models.collider = new Sphere(1, 20, 20);
	HSPEED.models.collider.set_shader(basic_shader);
	HSPEED.models.collider.set_texture("./assets/textures/track01.png");
}

HSPEED.init.initial_load = true;

HSPEED.init.project = function(){
	HSPEED.init.models();	  
}