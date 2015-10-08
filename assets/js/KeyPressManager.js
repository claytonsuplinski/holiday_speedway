document.addEventListener('keydown', function(event) {
	if(HSPEED.keys_pressed.indexOf(event.keyCode) == -1){
		HSPEED.keys_pressed.push(event.keyCode);
	}
});

document.addEventListener('keyup', function(event) {
	HSPEED.keys_pressed.splice(HSPEED.keys_pressed.indexOf(event.keyCode), 1);
});

setInterval(function(){
	if(HSPEED.keys_pressed.indexOf(87) != -1) { // W
		car.accelerate();
    }
	if(HSPEED.keys_pressed.indexOf(83) != -1) { // S
        car.reverse();
    }
	if(HSPEED.keys_pressed.indexOf(68) != -1) { // D
		car.turn(0.2);
    }
	if(HSPEED.keys_pressed.indexOf(65) != -1) { // A
		car.turn(-0.2);
    }
	if(HSPEED.keys_pressed.indexOf(16) != -1) { // Left Shift
		car.brake();
    }
	if(HSPEED.keys_pressed.indexOf(38) != -1) { // Up Arrow
        // Go down
		if(HSPEED.user.free_mode){
			HSPEED.user.rotation.x--;
		}
    }
	if(HSPEED.keys_pressed.indexOf(40) != -1) { // Down Arrow
        // Go down
		if(HSPEED.user.free_mode){
			HSPEED.user.rotation.x++;
		}
    }
}, 15);

function init_mouse_controls(){
	$("#glcanvas")
		.bind('touchstart', function(event){
			var touch = event.originalEvent.touches[0];
			HSPEED.mouse.x = touch.pageX;
			HSPEED.mouse.y = touch.pageY;
			HSPEED.mouse.left_down = true;
		})
		.bind('touchmove', function(event){
			event.preventDefault();
			var touch = event.originalEvent.touches[0];
			if(HSPEED.mouse.left_down && !HSPEED.mouse.right_down){
				mouse_pan(touch);
			}
			HSPEED.mouse.x = touch.pageX;
			HSPEED.mouse.y = touch.pageY;
		})
		.bind('touchend', function(event){
			var touch = event.originalEvent.touches[0];
			HSPEED.mouse.left_down = false;
		})
		.bind('gesturechange', function(event){
			event.preventDefault();
			var zoom_factor = parseFloat(event.originalEvent.scale);
			mouse_zoom(zoom_factor - 1);
			HSPEED.mouse.right_down = true;
		})
		.bind('gestureend', function(event){
			HSPEED.mouse.right_down = false;
		})
		.mousedown(function (event){
			HSPEED.mouse.x = event.pageX;
			HSPEED.mouse.y = event.pageY;
			if(event.which == 1){ // Left mouse
				HSPEED.mouse.left_down = true;
			}
			if(event.which == 3){ // Right mouse
				HSPEED.mouse.right_down = true;
			}
		})	
		.mousemove(function(event) {
			if(HSPEED.mouse.left_down){
				mouse_pan(event);
			}
			if(HSPEED.mouse.right_down){
				mouse_zoom(-(event.pageY - HSPEED.mouse.y)/4);
			}
			HSPEED.mouse.x = event.pageX;
			HSPEED.mouse.y = event.pageY;
		})
		.bind('mousewheel DOMMouseScroll', function (event){
			var tmp_delta = parseInt(parseInt(event.originalEvent.wheelDelta)/4 || -parseInt(event.originalEvent.detail)*8);
			mouse_zoom(tmp_delta/40);
		});
		
	$("body")
		.mouseup(function (event){
			if(event.which == 1){ // Left mouse
				HSPEED.mouse.left_down = false;
			}
			if(event.which == 3){ // Right mouse
				HSPEED.mouse.right_down = false;
			}
		});
}

function mouse_pan(event){
	HSPEED.user.rotation.y += (event.pageX - HSPEED.mouse.x);
	HSPEED.user.rotation.x += (event.pageY - HSPEED.mouse.y)/2;
	while(HSPEED.user.rotation.y < 0){
		HSPEED.user.rotation.y += 360;
	}
	while(HSPEED.user.rotation.y > 360){
		HSPEED.user.rotation.y -= 360;
	}
	if(HSPEED.user.rotation.x > 90){
		HSPEED.user.rotation.x = 90;
	}
	if(HSPEED.user.rotation.x < -90){
		HSPEED.user.rotation.x = -90;
	}
}

function mouse_zoom(tmp_delta){
	HSPEED.user.position.z += tmp_delta;
	if(HSPEED.user.position.z >  -HSPEED.constants.zoom_min-HSPEED.constants.zoom_offset){
		HSPEED.user.position.z = -HSPEED.constants.zoom_min-HSPEED.constants.zoom_offset;
	}
	if(HSPEED.user.position.z <  -HSPEED.constants.zoom_max){
		HSPEED.user.position.z = -HSPEED.constants.zoom_max;
	}
}