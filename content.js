
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '9999';
canvas.style.pointerEvents = 'none';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

let balls = [];
for (let i = 0; i < 10; i++) {
  balls.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    radius: 20
  });
}

function updateBalls() {
  for (let i = 0; i < balls.length; i++) {
    const b = balls[i];
    b.x += b.vx;
    b.y += b.vy;

    if (b.x < b.radius || b.x > canvas.width - b.radius) b.vx *= -1;
    if (b.y < b.radius || b.y > canvas.height - b.radius) b.vy *= -1;

    for (let j = i + 1; j < balls.length; j++) {
      const b2 = balls[j];
      const dx = b2.x - b.x;
      const dy = b2.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < b.radius + b2.radius) {
        b.vx *= -1;
        b.vy *= -1;
        b2.vx *= -1;
        b2.vy *= -1;
      }
    }
  }
}

function drawBalls() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(100, 200, 255, 0.5)';
  balls.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = 'rgba(0, 255, 100, 0.7)';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('你很棒，繼續加油！', 30, canvas.height - 30);
}

function animate() {
  updateBalls();
  drawBalls();
  requestAnimationFrame(animate);
}

animate();
