// Smooth scroll and scroll reveal animations
document.addEventListener("DOMContentLoaded", () => {
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // To re-trigger animation, we could toggle class, but simpler to just set play state
                entry.target.style.animationPlayState = 'running';
                
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial setup for animated elements
    document.querySelectorAll('.animate').forEach(el => {
        el.style.animationPlayState = 'paused';
        el.style.opacity = '0'; // Keep transparent until animated
        animateOnScroll.observe(el);
    });

    // Optional: Follow mouse effect on the photo wrapper
    const imageWrapper = document.querySelector('.image-wrapper');
    if(imageWrapper) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            // Only apply subtle rotation on desktop sizes
            if(window.innerWidth > 992) {
                imageWrapper.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            }
        });

        // Reset transform on mouse leave window
        document.addEventListener('mouseleave', () => {
            if(window.innerWidth > 992) {
                imageWrapper.style.transform = `rotateY(0deg) rotateX(0deg)`;
            }
        });
    }
});
