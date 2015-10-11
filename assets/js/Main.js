var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

function initWebGL(canvas) {
	gl = null;

	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = window.innerWidth;
        gl.viewportHeight = window.innerHeight;
	}
	catch(e) {
	}

	if (!gl) {
		alert("Unable to initialize WebGL. Your browser may not support it.");
	}
}

function resize_canvas(){
	canvas = document.getElementById("glcanvas");
	canvas.style.width = window.innerWidth+"px";
	canvas.style.height = window.innerHeight+"px";
}

window.addEventListener('resize', resize_canvas);

//$.ajaxSetup({async:false});

function start() {

	init_mouse_controls();	
	resize_canvas();

	initWebGL(canvas);

	if (gl) {
		gl.clearColor(0.0, 0.02, 0.04, 1.0);
		gl.clearDepth(1.0);                 
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);            
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
			
		basic_shader = new Shader("per-fragment-lighting-vs", "per-fragment-lighting-fs");

		HSPEED.init.project();

		max_texture_size = gl.getParameter(gl.MAX_TEXTURE_SIZE);
		
		car = new Car();
		
		camera = new Camera(car);
		
		track = new Track(HSPEED.models.track01);

		setInterval(drawScene, 15);
	}
}

function draw_entire_scene(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	mat4.perspective(45, window.innerWidth/window.innerHeight, 0.1, 5000.0, pMatrix);

	mat4.identity(mvMatrix);
	
	gl.uniform3f(basic_shader.shader_program.ambientLightingColorUniform, 0.6, 0.6, 0.6);
	gl.uniform3f(basic_shader.shader_program.pointLightingLocationUniform, 0, 0, 0);
	gl.uniform3f(basic_shader.shader_program.pointLightingDiffuseColorUniform, 0.6, 0.6, 0.6);
	gl.uniform1i(basic_shader.shader_program.showSpecularHighlightsUniform, true);
	gl.uniform1i(basic_shader.shader_program.useTexturesUniform, false);
	gl.uniform1i(basic_shader.shader_program.clickSampler, false);
	gl.uniform1i(basic_shader.shader_program.glow, false);

	if(HSPEED.user.free_mode){
		mat4.rotate(mvMatrix, HSPEED.user.rotation.x, [1,0,0]);
		mat4.rotate(mvMatrix, HSPEED.user.rotation.y, [0,1,0]);
		mat4.translate(mvMatrix, [HSPEED.user.position.x,0-HSPEED.user.position.y,HSPEED.user.position.z]);
	}
	else{
		mat4.translate(mvMatrix, [HSPEED.user.position.x,0-HSPEED.user.position.y,HSPEED.user.position.z]);
		mat4.rotate(mvMatrix, HSPEED.user.rotation.x, [1,0,0]);
		mat4.rotate(mvMatrix, HSPEED.user.rotation.y, [0,1,0]);
	}
	
	camera.draw();
	
	car.draw();
	
	track.draw();
	
}

function drawScene() {
	draw_entire_scene();
}