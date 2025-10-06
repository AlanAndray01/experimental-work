console.log("hello working");

// The floating button js

document.addEventListener('DOMContentLoaded', function() {
    const floatingBtn = document.getElementById('floatingBtn');
    const searchModal = document.getElementById('searchModal');
    const closeModal = document.getElementById('closeModal');
    const searchInput = document.getElementById('searchInput');
    const searchSubmit = document.getElementById('searchSubmit');
    const searchResults = document.getElementById('searchResults');
    
    // Draggable functionality
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    floatingBtn.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);
    
    floatingBtn.addEventListener('touchstart', dragStart);
    document.addEventListener('touchend', dragEnd);
    document.addEventListener('touchmove', drag);
    
    function dragStart(e) {
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        
        if (e.target === floatingBtn || e.target.closest('.floating-search-btn')) {
            isDragging = true;
            floatingBtn.style.transition = 'none';
        }
    }
    
    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        floatingBtn.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }
            
            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, floatingBtn);
        }
    }
    
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
    
    // Modal functionality
    floatingBtn.addEventListener('click', function(e) {
        // Only open modal if not dragging
        if (!isDragging) {
            searchModal.style.display = 'flex';
            searchInput.focus();
        }
    });
    
    closeModal.addEventListener('click', function() {
        searchModal.style.display = 'none';
        searchResults.style.display = 'none';
        searchInput.value = '';
    });
    
    // Close modal when clicking outside
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            searchModal.style.display = 'none';
            searchResults.style.display = 'none';
            searchInput.value = '';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.style.display === 'flex') {
            searchModal.style.display = 'none';
            searchResults.style.display = 'none';
            searchInput.value = '';
        }
    });
    
    // Search functionality
    searchSubmit.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const query = searchInput.value.trim();
        
        if (query) {
            // In a real application, you would fetch results from a server
            // For this demo, we'll simulate search results
            const sampleResults = [
                { 
                    title: 'Search Result 1', 
                    description: 'This is a sample search result for your query: ' + query + '. In a real application, this would show actual search results from your database or API.' 
                },
                { 
                    title: 'Search Result 2', 
                    description: 'Another example result matching your search term: ' + query + '. The search interface is designed to be clean and easy to use on all devices.' 
                },
                { 
                    title: 'Search Result 3', 
                    description: 'More content related to your search: ' + query + '. The floating button can be moved to any position on the page for your convenience.' 
                }
            ];
            
            // Clear previous results
            searchResults.innerHTML = '';
            
            // Display results
            sampleResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <h4>${result.title}</h4>
                    <p>${result.description}</p>
                `;
                searchResults.appendChild(resultItem);
            });
            
            searchResults.style.display = 'block';
        } else {
            // If search is empty, show message
            searchResults.innerHTML = `
                <div class="result-item">
                    <h4>No search term entered</h4>
                    <p>Please enter a search term to see results.</p>
                </div>
            `;
            searchResults.style.display = 'block';
        }
    }
});

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
