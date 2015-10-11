function Tire(params){
	this.model = HSPEED.models.tire;
	if(params != undefined){
		if(params.name != undefined){
			this.name = params.name;
		}
	}
};

Tire.prototype = new SpaceObject();
Tire.prototype.constructor = Tire;