
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function resizeCanvas(margin) {
  canvas.width = window.innerWidth - margin
  canvas.height = window.innerHeight - margin
}

resizeCanvas(5)

function clearCanvas() {
  context.save()
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.restore()
}

class Arc {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context
    this.radius = Math.random() * this.canvas.width / 3
    this.gap = 1
    this.angle = Math.random() * Math.PI * 2
    this.velocity = 0.01
    this.direction = Math.random() > 0.5 ? 1 : -1
  }

  rotate() {
    this.angle += this.velocity
  }

  draw({canvas, context, radius, gap, angle} = this) {
    context.save()
    context.translate(canvas.width / 2, canvas.height / 2)
    context.rotate(angle)
    context.beginPath()
    context.arc(0, 0, radius, 0, 2 * Math.PI - gap)
    context.stroke()
    context.restore()
  }
}

const arcCollection = new Array(100).fill(0).map(e => new Arc(canvas, context))
// function radToDeg(rad) {
//   return rad * (180 / Math.PI)
// }




let fps = 30; // Set the desired FPS
let now;
let then = Date.now();
let interval = 1000 / fps;
let delta;

function loop() {
  // Your drawing code here
  clearCanvas()
  arcCollection.forEach(e => {
    e.draw()
    e.rotate()
  })

  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    then = now - (delta % interval);
    requestAnimationFrame(loop);
  } else {
    setTimeout(() => {
      requestAnimationFrame(loop);
    }, interval - delta);
  }
}

loop(); // Start the animation loop
