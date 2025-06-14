
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '9999';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
for (let i = 0; i < 10; i++) {
  balls.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4,
    radius: 20 + Math.random() * 10,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();
    b.x += b.dx;
    b.y += b.dy;

    if (b.x + b.radius > canvas.width || b.x - b.radius < 0) b.dx *= -1;
    if (b.y + b.radius > canvas.height || b.y - b.radius < 0) b.dy *= -1;

    for (let j = i + 1; j < balls.length; j++) {
      let b2 = balls[j];
      let dx = b2.x - b.x;
      let dy = b2.y - b.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < b.radius + b2.radius) {
        let angle = Math.atan2(dy, dx);
        let tx = b.x + Math.cos(angle) * (b.radius + b2.radius);
        let ty = b.y + Math.sin(angle) * (b.radius + b2.radius);
        b2.x = tx;
        b2.y = ty;
        b.dx *= -1;
        b.dy *= -1;
        b2.dx *= -1;
        b2.dy *= -1;
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();
