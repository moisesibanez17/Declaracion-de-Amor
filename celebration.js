
function launchFirework() {
    const container = document.querySelector('.fireworks-container') || document.body;
    const seed = document.createElement('div');
    seed.classList.add('firework-seed');
    
    // Start position (bottom of screen, random x)
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight;
    
    // Target position (random height in upper half)
    const targetY = window.innerHeight * 0.1 + Math.random() * (window.innerHeight * 0.4);
    
    seed.style.left = `${startX}px`;
    seed.style.top = `${startY}px`;
    
    container.appendChild(seed);
    
    // Animate launch
    // Use setTimeout to allow browser to render initial position
    setTimeout(() => {
        seed.style.top = `${targetY}px`;
    }, 10);
    
    // Explode when it reaches top (approx 1s matching transition)
    setTimeout(() => {
        seed.remove();
        explode(startX, targetY);
    }, 1000);
}

function explode(x, y) {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#db7093', '#c71585', '#ffffff', '#ffd700'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const container = document.querySelector('.fireworks-container') || document.body;
    
    const particleCount = 60; // More particles for fuller explosion
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 4px ${color}`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Physics for explosion
        const angle = Math.random() * Math.PI * 2;
        // Random velocity with some variation for depth
        const velocity = Math.random() * 150 + 50; 
        
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        // Add gravity effect to Y
        const gravityY = ty + 100; 

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${gravityY}px`);
        
        container.appendChild(particle);
        
        // Cleanup
        setTimeout(() => particle.remove(), 1500);
    }
}

// Launch fireworks periodically
setInterval(launchFirework, 800);
// Launch a few immediately
launchFirework();
setTimeout(launchFirework, 400);

// Add floating hearts background
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.transition = 'transform 4s linear, opacity 4s linear';
    heart.style.opacity = '0.8';
    heart.style.zIndex = '1';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.transform = `translateY(-100vh) rotate(${Math.random() * 360}deg)`;
        heart.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

setInterval(createFloatingHeart, 300);

// Music handling
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    audio.volume = 0.5; 
    audio.play().catch(error => {
        console.log("Autoplay prevented by browser, waiting for interaction.");
        document.body.addEventListener('click', () => {
            audio.play();
        }, { once: true });
    });
});
