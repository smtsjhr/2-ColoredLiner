
var r = 0.97;
var a = 0.2*Math.PI;

var R;

var rate = 1/(2e3 + 1);

var get_mouse_pos = false;
var get_touch_pos = false;

var stop = false;
var fps, fpsInterval, startTime, now, then, elapsed;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


startAnimating(60);


function draw() {
 
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  x_origin = canvas.width/2;
  y_origin = canvas.height/2;
  
  R = 2.5*Math.min(x_origin, y_origin);
  
  ctx.fillStyle = 'rgba(255,255,255,1)';
  ctx.fillRect(0,0,canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.beginPath();
  ctx.moveTo(x_origin , y_origin - R);
  for (let i = 1; i < 700; i++) {
    ctx.lineTo(x_origin + R*r**i*Math.sin(i*a),
               y_origin - R*r**i*Math.cos(i*a));
  }
  ctx.fill('evenodd');
  
  
  a += rate;
  
  
  
  canvas.addEventListener('mousedown', e => {
    get_mouse_pos = true;
    getMousePosition(canvas, e)
    });
      
    canvas.addEventListener('mouseup', e => {
    get_mouse_pos = false;
    });
  
    canvas.addEventListener('mousemove', function(e) {
      if(get_mouse_pos) {
        getMousePosition(canvas, e)
      }
    })
    
    canvas.addEventListener('touchstart', function(e) {
        getTouchPosition(canvas,e);
        event.preventDefault();
    }, false);
      
    canvas.addEventListener('touchend', function(e) {
 
    }, false);
      
    canvas.addEventListener('touchmove', function(e) {
        getTouchPosition(canvas,e);
        event.preventDefault();
    }, false);
  
  //window.requestAnimationFrame(draw);
}



function getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x_origin = (rect.right - rect.left)/2;
    const y_origin = (rect.bottom - rect.top)/2;
    const x = event.clientX/x_origin - 1;
    const y = -event.clientY/y_origin + 1;
  
    const modulus = Math.sqrt(x*x + y*y)/Math.sqrt(2);
  
    const modulus_clip = 0.8*Math.min(1, modulus);
  
    r = 0.95 + 0.05*Math.min(1,modulus_clip + 0.2);
  
    a = -Math.atan2(y,x) + Math.PI/2;
      
    rate = 1/(2e3 + Math.exp(12*modulus));
    
}

function getTouchPosition(canvas, event) {
    var touch = event.touches[0];
    const rect = canvas.getBoundingClientRect()
    const x_origin = (rect.right - rect.left)/2;
    const y_origin = (rect.bottom - rect.top)/2;
    const x = touch.clientX/x_origin - 1;
    const y = -touch.clientY/y_origin + 1;
    
    const modulus = Math.sqrt(x*x + y*y)/Math.sqrt(2);
  
    const modulus_clip = 0.8*Math.min(1, modulus);
  
    r = 0.95 + 0.05*Math.min(1,modulus_clip + 0.2);
  
    a = -Math.atan2(y,x) + Math.PI/2;
      
    rate = 1/(2e3 + Math.exp(12*modulus));
    
}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    animate();
 }
 
 function animate(newtime) {
 
     
     if (stop) {
         return;
     }
 
     requestAnimationFrame(animate);
 
     now = newtime;
     elapsed = now - then;
 
     if (elapsed > fpsInterval) {
         then = now - (elapsed % fpsInterval);
     
         draw();  
     }
 }
 