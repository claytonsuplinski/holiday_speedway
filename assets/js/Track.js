function Track(model){
	this.model = model;
	
	this.add_collider(new Collider({parent: this, radius: 500, x: -550, y: 0, z: 0}));
	this.add_collider(new Collider({parent: this, radius: 600, x: -550, y: 0, z: 0, inverse: true}));
};

Track.prototype = new SpaceObject();
Track.prototype.constructor = Track;