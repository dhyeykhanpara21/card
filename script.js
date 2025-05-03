document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const animationContainer = document.getElementById('animationContainer');
    const celebrateButton = document.getElementById('celebrateButton');
    const closeAnimationBtn = document.getElementById('closeAnimationBtn');
    const cake = document.getElementById('cake');
    const husband = document.getElementById('husband');
    const wife = document.getElementById('wife');
    const knife = document.getElementById('knife');
    const cut = document.getElementById('cut');
    const message = document.getElementById('message');
    const hearts = document.getElementById('hearts');
    const confetti = document.getElementById('confetti');
    const fireworks = document.getElementById('fireworks');
    const restartButton = document.getElementById('restartButton');
    const currentYearEl = document.getElementById('currentYear');

    // Set current year
    currentYearEl.textContent = new Date().getFullYear();

    // Parallax effect for background layers
    document.addEventListener('mousemove', function(e) {
        const layers = document.querySelectorAll('.layer');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        layers.forEach(layer => {
            const depth = layer.getAttribute('data-depth');
            const moveX = (x * 100 * depth);
            const moveY = (y * 100 * depth);
            layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    });

    // Add particle background
    function createParticleBackground() {
        const particles = document.getElementById('particles-background');
        
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random opacity and color
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            
            const colors = ['#e91e63', '#9c27b0', '#3f51b5', '#ffffff'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random animation duration and delay
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
            
            particles.appendChild(particle);
        }
    }

    // SVG templates for hearts, confetti, and fireworks
    const heartSVG = `
        <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `;
    
    const confettiColors = [
        '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800'
    ];

    // Create an array of firework colors
    const fireworkColors = [
        '#ff4081', '#7c4dff', '#00bcd4', '#ffc400', '#64ffda'
    ];
    
    // Celebrate Button Event Listener
    celebrateButton.addEventListener('click', function() {
        // Show animation container
        animationContainer.classList.remove('hidden');
        createParticleBackground();
        
        // Start animation sequence
        startAnimation();
        
        // Add animation to the timeline items with delay
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 * index);
        });
    });
    
    // Close Animation Button Event Listener
    closeAnimationBtn.addEventListener('click', function() {
        animationContainer.classList.add('hidden');
        resetAnimation();
    });
    
    // Restart Button Event Listener
    restartButton.addEventListener('click', function() {
        resetAnimation();
        startAnimation();
    });

    // Gallery item hover effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Animation Sequence Function
    function startAnimation() {
        // Step 1: Drop the cake after a short delay
        setTimeout(() => {
            cake.classList.add('dropped');
            
            // Play bounce sound
            playSound('bounce');
            
            // Step 2: Characters enter from sides
            setTimeout(() => {
                husband.classList.add('entered');
                wife.classList.add('entered');
                
                // Step 3: Child enters from bottom
                setTimeout(() => {
                    const child = document.getElementById('child');
                    child.classList.add('entered');
                    
                    // Step 4: Family members appear
                    setTimeout(() => {
                        const familyMember1 = document.getElementById('familyMember1');
                        const familyMember2 = document.getElementById('familyMember2');
                        familyMember1.classList.add('entered');
                        familyMember2.classList.add('entered');
                        
                        // Play applause sound
                        playSound('applause');
                        
                        // Step 5: Show knife for cutting
                        setTimeout(() => {
                            knife.classList.add('visible');
                            
                            // Step 6: Cut the cake
                            setTimeout(() => {
                                knife.classList.add('cutting');
                                cut.classList.add('animate');
                                
                                // Play cutting sound
                                playSound('cut');
                                
                                // Step 7: Show message and celebration effects
                                setTimeout(() => {
                                    message.classList.add('visible');
                                    createHearts();
                                    createConfetti();
                                    createFireworks();
                                    
                                    // Play celebration sound
                                    playSound('celebrate');
                                    
                                    // Continue celebration effects
                                    const celebrationInterval = setInterval(() => {
                                        createHearts();
                                        createConfetti();
                                        if (Math.random() > 0.7) {
                                            createFireworks();
                                        }
                                    }, 3000);
                                    
                                    // Show restart button
                                    setTimeout(() => {
                                        restartButton.classList.remove('hidden');
                                        
                                        // Stop continuous celebration effects after some time
                                        setTimeout(() => {
                                            clearInterval(celebrationInterval);
                                        }, 15000);
                                    }, 2000);
                                    
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 800);
                }, 1000);
            }, 1000);
        }, 500);
    }
    
    // Reset Animation Function
    function resetAnimation() {
        // Reset all elements to initial state
        cake.classList.remove('dropped');
        husband.classList.remove('entered');
        wife.classList.remove('entered');
        
        // Reset child and family members
        const child = document.getElementById('child');
        const familyMember1 = document.getElementById('familyMember1');
        const familyMember2 = document.getElementById('familyMember2');
        
        if (child) child.classList.remove('entered');
        if (familyMember1) familyMember1.classList.remove('entered');
        if (familyMember2) familyMember2.classList.remove('entered');
        
        knife.classList.remove('visible', 'cutting');
        cut.classList.remove('animate');
        message.classList.remove('visible');
        restartButton.classList.add('hidden');
        
        // Clear hearts, confetti, and fireworks
        hearts.innerHTML = '';
        confetti.innerHTML = '';
        fireworks.innerHTML = '';
    }
    
    // Create Hearts Function
    function createHearts() {
        // Create 30 hearts with random positions and delays
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = heartSVG;
            
            const left = Math.random() * 100;
            heart.style.left = `${left}%`;
            heart.style.bottom = '0';
            heart.style.animationDelay = `${Math.random() * 2}s`;
            
            // Random size
            const size = Math.random() * 15 + 15;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            
            // Random rotation
            const rotation = Math.random() * 30 - 15;
            heart.style.transform = `rotate(${rotation}deg)`;
            
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
        // Create 70 confetti pieces with random colors and positions
        for (let i = 0; i < 70; i++) {
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
            
            // Random size
            const size = Math.random() * 10 + 5;
            piece.style.width = `${size}px`;
            piece.style.height = `${size}px`;
            
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
    
    // Create Fireworks Function
    function createFireworks() {
        // Create 5 fireworks at random positions
        for (let i = 0; i < 5; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            
            // Random position
            const left = 10 + Math.random() * 80;
            const top = 10 + Math.random() * 60;
            firework.style.left = `${left}%`;
            firework.style.top = `${top}%`;
            
            // Random size
            const size = Math.random() * 100 + 50;
            firework.style.width = `${size}px`;
            firework.style.height = `${size}px`;
            
            // Random delay
            const delay = Math.random() * 0.5;
            firework.style.animationDelay = `${delay}s`;
            
            // Random color
            const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
            
            // Create firework particles
            const particleCount = 20;
            for (let j = 0; j < particleCount; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                
                // Set particle color
                particle.style.backgroundColor = color;
                
                // Set random transform for each particle
                const angle = (j / particleCount) * 360;
                const distance = size / 2;
                const tx = Math.cos(angle * Math.PI / 180) * distance;
                const ty = Math.sin(angle * Math.PI / 180) * distance;
                particle.style.setProperty('--transform', `translate(${tx}px, ${ty}px)`);
                
                firework.appendChild(particle);
            }
            
            fireworks.appendChild(firework);
            
            // Trigger animation
            requestAnimationFrame(() => {
                firework.classList.add('animate');
            });
            
            // Remove firework after animation completes
            setTimeout(() => {
                firework.remove();
            }, 1500);
        }
    }

    // Animation for counter numbers
    function animateCounters() {
        const yearCounter = document.getElementById('yearsTogether');
        const monthCounter = document.getElementById('monthsTogether');
        const dayCounter = document.getElementById('daysTogether');
        
        const yearTarget = parseInt(yearCounter.textContent);
        const monthTarget = parseInt(monthCounter.textContent);
        const dayTarget = parseInt(dayCounter.textContent);
        
        let yearCurrent = 0;
        let monthCurrent = 0;
        let dayCurrent = 0;
        
        const yearStep = yearTarget / 50;
        const monthStep = monthTarget / 50;
        const dayStep = dayTarget / 50;
        
        const counterInterval = setInterval(() => {
            yearCurrent += yearStep;
            monthCurrent += monthStep;
            dayCurrent += dayStep;
            
            yearCounter.textContent = Math.ceil(yearCurrent);
            monthCounter.textContent = Math.ceil(monthCurrent);
            dayCounter.textContent = Math.ceil(dayCurrent);
            
            if (yearCurrent >= yearTarget && monthCurrent >= monthTarget && dayCurrent >= dayTarget) {
                clearInterval(counterInterval);
                yearCounter.textContent = yearTarget;
                monthCounter.textContent = monthTarget;
                dayCounter.textContent = dayTarget;
            }
        }, 30);
    }
    
    // Animate counters on load
    setTimeout(animateCounters, 1000);
    
    // Parallax effect for photo frames
    document.addEventListener('mousemove', function(e) {
        const frames = document.querySelectorAll('.photo-frame');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        frames.forEach((frame, index) => {
            const depth = 0.05 + (index * 0.02);
            const moveX = (x * 30 * depth);
            const moveY = (y * 30 * depth);
            frame.style.transform = `translate(${moveX}px, ${moveY}px) scale(1) rotate(${index * 2 - 2}deg)`;
        });
    });
    
    // Sound Function (Optional)
    function playSound(type) {
        // Log sound effect for debugging
        console.log(`Sound effect: ${type}`);
        
        // Create audio element
        const sound = new Audio();
        
        // Set source based on type
        switch(type) {
            case 'bounce':
                // Simulate bounce sound with oscillator
                const bounceContext = new (window.AudioContext || window.webkitAudioContext)();
                const bounceOsc = bounceContext.createOscillator();
                const bounceGain = bounceContext.createGain();
                
                bounceOsc.type = 'sine';
                bounceOsc.frequency.setValueAtTime(150, bounceContext.currentTime);
                bounceOsc.frequency.exponentialRampToValueAtTime(40, bounceContext.currentTime + 0.5);
                
                bounceGain.gain.setValueAtTime(0.3, bounceContext.currentTime);
                bounceGain.gain.exponentialRampToValueAtTime(0.01, bounceContext.currentTime + 0.5);
                
                bounceOsc.connect(bounceGain);
                bounceGain.connect(bounceContext.destination);
                
                bounceOsc.start();
                bounceOsc.stop(bounceContext.currentTime + 0.5);
                break;
            
            case 'applause':
                // Simulate applause sound with white noise
                const applauseContext = new (window.AudioContext || window.webkitAudioContext)();
                const bufferSize = 4096;
                const whiteNoise = applauseContext.createScriptProcessor(bufferSize, 1, 1);
                const applauseGain = applauseContext.createGain();
                
                whiteNoise.onaudioprocess = function(e) {
                    const output = e.outputBuffer.getChannelData(0);
                    for (let i = 0; i < bufferSize; i++) {
                        // Generate random noise with pattern to simulate clapping
                        output[i] = Math.random() * 2 - 1;
                        if (i % 2000 < 200) {
                            output[i] *= 0.8; // Louder parts
                        } else {
                            output[i] *= 0.2; // Quieter parts
                        }
                    }
                };
                
                applauseGain.gain.setValueAtTime(0.1, applauseContext.currentTime);
                applauseGain.gain.linearRampToValueAtTime(0.3, applauseContext.currentTime + 0.2);
                applauseGain.gain.linearRampToValueAtTime(0.1, applauseContext.currentTime + 1.5);
                applauseGain.gain.exponentialRampToValueAtTime(0.01, applauseContext.currentTime + 2);
                
                whiteNoise.connect(applauseGain);
                applauseGain.connect(applauseContext.destination);
                
                // Stop the applause after 2 seconds
                setTimeout(() => {
                    whiteNoise.disconnect();
                }, 2000);
                break;
                
            case 'cut':
                // Simulate cutting sound with noise
                const cutContext = new (window.AudioContext || window.webkitAudioContext)();
                const cutOsc = cutContext.createOscillator();
                const cutGain = cutContext.createGain();
                
                cutOsc.type = 'sawtooth';
                cutOsc.frequency.setValueAtTime(800, cutContext.currentTime);
                cutOsc.frequency.exponentialRampToValueAtTime(200, cutContext.currentTime + 0.2);
                
                cutGain.gain.setValueAtTime(0.2, cutContext.currentTime);
                cutGain.gain.exponentialRampToValueAtTime(0.01, cutContext.currentTime + 0.2);
                
                cutOsc.connect(cutGain);
                cutGain.connect(cutContext.destination);
                
                cutOsc.start();
                cutOsc.stop(cutContext.currentTime + 0.2);
                break;
                
            case 'celebrate':
                // Simulate celebration sound with multiple oscillators
                const celebContext = new (window.AudioContext || window.webkitAudioContext)();
                const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
                
                notes.forEach((note, i) => {
                    const celebOsc = celebContext.createOscillator();
                    const celebGain = celebContext.createGain();
                    
                    celebOsc.type = 'sine';
                    celebOsc.frequency.value = note;
                    
                    celebGain.gain.setValueAtTime(0, celebContext.currentTime);
                    celebGain.gain.linearRampToValueAtTime(0.2, celebContext.currentTime + 0.1 + (i * 0.1));
                    celebGain.gain.exponentialRampToValueAtTime(0.01, celebContext.currentTime + 1 + (i * 0.1));
                    
                    celebOsc.connect(celebGain);
                    celebGain.connect(celebContext.destination);
                    
                    celebOsc.start();
                    celebOsc.stop(celebContext.currentTime + 1 + (i * 0.1));
                });
                break;
        }
    }

    // Init timeline animation on scroll
    function initScrollAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Initialize scroll animations
    initScrollAnimations();
});
