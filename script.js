console.log("hello working");

// The start of Image slider js
document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.btn-prev');
            const nextBtn = document.querySelector('.btn-next');
            const dotsContainer = document.querySelector('.dots-container');
            
            let currentSlide = 0;
            const slideCount = slides.length;
            
            // Create dots
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
            
            const dots = document.querySelectorAll('.dot');
            
            // Function to update slider position
            function updateSlider() {
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Update active dot
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }
            
            // Go to specific slide
            function goToSlide(slideIndex) {
                currentSlide = slideIndex;
                updateSlider();
            }
            
            // Next slide
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
            }
            
            // Previous slide
            function prevSlide() {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateSlider();
            }
            
            // Event listeners for buttons
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            // Auto slide every 5 seconds
            let slideInterval = setInterval(nextSlide, 5000);
            
            // Pause auto-slide on hover
            const sliderContainer = document.querySelector('.slider-container');
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
            });
        });
