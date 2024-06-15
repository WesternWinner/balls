const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];
const gravity = 0.98;
const friction = 0.9;

// Ball class
class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = 0;
        this.dy = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.y + this.radius + this.dy > canvas.height || this.y - this.radius + this.dy < 0) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx * friction;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

// Initialize balls
function init() {
    for (let i = 0; i < 10; i++) {
        const radius = 30;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        balls.push(new Ball(x, y, radius, color));
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.update();
    });
}

// Gyroscope event listener
window.addEventListener('deviceorientation', function(event) {
    const tiltX = event.gamma;
    const tiltY = event.beta;

    balls.forEach(ball => {
        ball.dx += tiltX * 0.1;
        ball.dy += tiltY * 0.1;
    });
});

// Start
init();
animate();