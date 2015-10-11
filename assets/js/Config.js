HSPEED = {};

HSPEED.window = {};
HSPEED.window.width = 0;
HSPEED.window.height = 0;

HSPEED.constants = {};
HSPEED.constants.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
HSPEED.constants.to_radians = Math.PI/180;
HSPEED.constants.zoom_offset = 0.1;
HSPEED.constants.zoom_min = 5;
HSPEED.constants.zoom_max = 75;

HSPEED.keys_pressed = [];

HSPEED.user = new User();

HSPEED.date_range = {};

HSPEED.mouse = {};
HSPEED.mouse.left_down = false;
HSPEED.mouse.right_down = false;
HSPEED.mouse.x = "";
HSPEED.mouse.y = "";

HSPEED.models = {};

HSPEED.functions = {};
HSPEED.functions.distance = function(v1, v2){
	var dx = v1.x - v2.x;
	var dy = v1.y - v2.y;
	var dz = v1.z - v2.z;
	return Math.sqrt(dx*dx + dy*dy + dz*dz);
};