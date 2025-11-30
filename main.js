onload = () =>{
        document.body.classList.remove("container");
        
        const noBtn = document.getElementById('noBtn');
        const yesBtn = document.getElementById('yesBtn');
        
        // Logic for "No" button running away
        document.addEventListener('mousemove', (e) => {
            const btnRect = noBtn.getBoundingClientRect();
            const btnCenterX = btnRect.left + btnRect.width / 2;
            const btnCenterY = btnRect.top + btnRect.height / 2;
            
            // Calculate distance between mouse and button center
            const distance = Math.sqrt(
                Math.pow(e.clientX - btnCenterX, 2) + 
                Math.pow(e.clientY - btnCenterY, 2)
            );

            // Minimum distance to maintain (approx 3cm = ~115px)
            const minDistance = 115;

            // If mouse is closer than the minimum distance
            if (distance < minDistance) {
                // Move button to body to avoid transform context issues and ensure correct positioning
                if (noBtn.parentNode !== document.body) {
                    noBtn.style.position = 'fixed';
                    noBtn.style.left = `${btnRect.left}px`;
                    noBtn.style.top = `${btnRect.top}px`;
                    noBtn.style.zIndex = '1000'; // Ensure it stays on top
                    document.body.appendChild(noBtn);
                    
                    // Enable transition after a brief delay
                    setTimeout(() => {
                        noBtn.style.transition = 'all 0.2s ease-out';
                    }, 10);
                }

                // Calculate angle from mouse to button
                const angle = Math.atan2(btnCenterY - e.clientY, btnCenterX - e.clientX);
                
                // Calculate new position: Push it to exactly minDistance away from mouse
                let newX = e.clientX + Math.cos(angle) * minDistance - (noBtn.offsetWidth / 2);
                let newY = e.clientY + Math.sin(angle) * minDistance - (noBtn.offsetHeight / 2);

                // Boundary checks to keep it visible within the viewport
                // Using a larger padding to ensure it doesn't touch the edges
                const padding = 30; 
                const maxX = window.innerWidth - noBtn.offsetWidth - padding;
                const maxY = window.innerHeight - noBtn.offsetHeight - padding;

                // Clamp values to keep inside the screen
                newX = Math.max(padding, Math.min(maxX, newX));
                newY = Math.max(padding, Math.min(maxY, newY));
                
                noBtn.style.left = `${newX}px`;
                noBtn.style.top = `${newY}px`;
            }
        });

        // Logic for "Yes" button
        yesBtn.addEventListener('click', () => {
            window.location.href = 'celebration.html';
        });
};
