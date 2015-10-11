function Track(model){
	this.model = model;
};

Track.prototype = new SpaceObject();
Track.prototype.constructor = Track;