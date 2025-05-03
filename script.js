document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const nameForm = document.getElementById('nameForm');
    const startButton = document.getElementById('startButton');
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const animationContainer = document.getElementById('animationContainer');
    const cake = document.getElementById('cake');
    const husband = document.getElementById('husband');
    const wife = document.getElementById('wife');
    const knife = document.getElementById('knife');
    const cut = document.getElementById('cut');
    const message = document.getElementById('message');
    const coupleNames = document.getElementById('coupleNames');
    const hearts = document.getElementById('hearts');
    const confetti = document.getElementById('confetti');
    const restartButton = document.getElementById('restartButton');

    // SVG templates for hearts and confetti
    const heartSVG = `
        <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `;
    
    const confettiColors = [
        '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800'
    ];
    
    // Start Button Event Listener
    startButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Basic validation
        if (name1Input.value.trim() === '' || name2Input.value.trim() === '') {
            alert('Please enter both names');
            return;
        }
        
        // Set the couple names in the message
        coupleNames.textContent = `${name1Input.value} & ${name2Input.value}`;
        
        // Hide form and show animation
        nameForm.classList.add('hidden');
        animationContainer.classList.remove('hidden');
        
        // Start animation sequence
        startAnimation();
    });
    
    // Restart Button Event Listener
    restartButton.addEventListener('click', function() {
        resetAnimation();
        startAnimation();
    });
    
    // Animation Sequence Function
    function startAnimation() {
        // Step 1: Drop the cake after a short delay
        setTimeout(() => {
            cake.classList.add('dropped');
            
            // Play bounce sound (optional)
            playSound('bounce');
            
            // Step 2: Characters enter from sides
            setTimeout(() => {
                husband.classList.add('entered');
                wife.classList.add('entered');
                
                // Step 3: Show knife for cutting
                setTimeout(() => {
                    knife.classList.add('visible');
                    
                    // Step 4: Cut the cake
                    setTimeout(() => {
                        knife.classList.add('cutting');
                        cut.classList.add('animate');
                        
                        // Play cutting sound (optional)
                        playSound('cut');
                        
                        // Step 5: Show message and celebration effects
                        setTimeout(() => {
                            message.classList.add('visible');
                            createHearts();
                            createConfetti();
                            
                            // Play celebration sound (optional)
                            playSound('celebrate');
                            
                            // Show restart button
                            setTimeout(() => {
                                restartButton.classList.remove('hidden');
                            }, 2000);
                            
                        }, 1000);
                    }, 1000);
                }, 1500);
            }, 1000);
        }, 500);
    }
    
    // Reset Animation Function
    function resetAnimation() {
        // Reset all elements to initial state
        cake.classList.remove('dropped');
        husband.classList.remove('entered');
        wife.classList.remove('entered');
        knife.classList.remove('visible', 'cutting');
        cut.classList.remove('animate');
        message.classList.remove('visible');
        restartButton.classList.add('hidden');
        
        // Clear hearts and confetti
        hearts.innerHTML = '';
        confetti.innerHTML = '';
    }
    
    // Create Hearts Function
    function createHearts() {
        // Create 20 hearts with random positions and delays
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = heartSVG;
            
            const left = Math.random() * 100;
            heart.style.left = `${left}%`;
            heart.style.bottom = '0';
            heart.style.animationDelay = `${Math.random() * 2}s`;
            
            hearts.appendChild(heart);
            
            // Trigger animation in the next frame for proper rendering
            requestAnimationFrame(() => {
                heart.classList.add('animate');
            });
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }
    }
    
    // Create Confetti Function
    function createConfetti() {
        // Create 50 confetti pieces with random colors and positions
        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            
            // Random confetti shape (circle, square, or triangle)
            const shape = Math.floor(Math.random() * 3);
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            
            let svgContent = '';
            if (shape === 0) {
                // Circle
                svgContent = `<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="${color}"/></svg>`;
            } else if (shape === 1) {
                // Square
                svgContent = `<svg viewBox="0 0 10 10"><rect width="10" height="10" fill="${color}"/></svg>`;
            } else {
                // Triangle
                svgContent = `<svg viewBox="0 0 10 10"><polygon points="5,0 10,10 0,10" fill="${color}"/></svg>`;
            }
            
            piece.innerHTML = svgContent;
            
            const left = Math.random() * 100;
            piece.style.left = `${left}%`;
            piece.style.top = '0';
            piece.style.animationDelay = `${Math.random() * 3}s`;
            
            confetti.appendChild(piece);
            
            // Trigger animation in the next frame
            requestAnimationFrame(() => {
                piece.classList.add('animate');
            });
            
            // Remove piece after animation completes
            setTimeout(() => {
                piece.remove();
            }, 5000);
        }
    }
    
    // Sound Function (Optional)
    function playSound(type) {
        // This is a placeholder for sound functionality
        // In a real implementation, you would create and play audio elements
        // For now, we'll just log that a sound would play
        console.log(`Sound effect: ${type}`);
        
        // Example implementation (commented out since we're not using actual audio files):
        /*
        const sound = new Audio();
        switch(type) {
            case 'bounce':
                sound.src = 'bounce.mp3';
                break;
            case 'cut':
                sound.src = 'cut.mp3';
                break;
            case 'celebrate':
                sound.src = 'celebrate.mp3';
                break;
        }
        sound.play().catch(e => console.log('Audio play failed:', e));
        */
    }
});
