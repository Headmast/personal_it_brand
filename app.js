// Presentation JavaScript
class Presentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 17;
        this.slides = document.querySelectorAll('.slide');
        this.progressBar = document.getElementById('progressBar');
        this.currentSlideElement = document.getElementById('currentSlide');
        this.totalSlidesElement = document.getElementById('totalSlides');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.init();
    }
    
    init() {
        // Set total slides
        this.totalSlidesElement.textContent = this.totalSlides;
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Touch/swipe support for mobile
        this.addTouchSupport();
        
        // Initialize first slide
        this.updateSlide();
        
        // Preload animations for smooth transitions
        this.preloadAnimations();
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
            this.updateSlide();
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.currentSlide--;
            this.updateSlide();
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            this.currentSlide = slideNumber;
            this.updateSlide();
        }
    }
    
    updateSlide() {
        // Hide all slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            
            // Add slide-out animation for previous slide
            if (slide.classList.contains('slide-out')) {
                slide.classList.remove('slide-out');
            }
        });
        
        // Show current slide with animation
        const currentSlideElement = this.slides[this.currentSlide - 1];
        setTimeout(() => {
            currentSlideElement.classList.add('active');
            this.triggerSlideAnimations(currentSlideElement);
        }, 100);
        
        // Update progress bar
        const progress = (this.currentSlide / this.totalSlides) * 100;
        this.progressBar.style.width = `${progress}%`;
        
        // Update slide counter
        this.currentSlideElement.textContent = this.currentSlide;
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Add slide change sound effect (optional)
        this.playSlideSound();
    }
    
    updateNavigationButtons() {
        // Disable/enable prev button
        this.prevBtn.disabled = this.currentSlide === 1;
        
        // Disable/enable next button
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
        
        // Update button styles based on state
        if (this.currentSlide === 1) {
            this.prevBtn.style.opacity = '0.3';
        } else {
            this.prevBtn.style.opacity = '1';
        }
        
        if (this.currentSlide === this.totalSlides) {
            this.nextBtn.style.opacity = '0.3';
        } else {
            this.nextBtn.style.opacity = '1';
        }
    }
    
    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ': // Spacebar
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides);
                break;
            case 'Escape':
                e.preventDefault();
                this.toggleFullscreen();
                break;
        }
    }
    
    addTouchSupport() {
        let startX, startY, endX, endY;
        const minSwipeDistance = 50;
        const maxVerticalDistance = 100;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = Math.abs(endY - startY);
            
            // Only register horizontal swipes
            if (Math.abs(deltaX) > minSwipeDistance && deltaY < maxVerticalDistance) {
                if (deltaX > 0) {
                    // Swipe right - previous slide
                    this.previousSlide();
                } else {
                    // Swipe left - next slide
                    this.nextSlide();
                }
            }
            
            // Reset values
            startX = startY = endX = endY = null;
        }, { passive: true });
    }
    
    triggerSlideAnimations(slideElement) {
        // Reset all animations in the slide
        const animatedElements = slideElement.querySelectorAll('[class*="animate"]');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = null;
        });
        
        // Trigger specific animations based on slide content
        const slideNumber = this.currentSlide;
        
        switch(slideNumber) {
            case 1:
                this.animateTitleSlide(slideElement);
                break;
            case 2:
                this.animateAgendaSlide(slideElement);
                break;
            case 5:
                this.animateStatsSlide(slideElement);
                break;
            case 8:
                this.animateReasonsSlide(slideElement);
                break;
            case 9:
                this.animateFacetsSlide(slideElement);
                break;
            case 10:
                this.animatePlatformsSlide(slideElement);
                break;
            case 11:
                this.animateContentSlide(slideElement);
                break;
            case 12:
                this.animateMistakesSlide(slideElement);
                break;
            case 13:
                this.animateActionSlide(slideElement);
                break;
            case 14:
                this.animateTrendsSlide(slideElement);
                break;
            case 15:
                this.animateToolsSlide(slideElement);
                break;
            case 16:
                this.animateConclusionSlide(slideElement);
                break;
        }
    }
    
    animateTitleSlide(slide) {
        const title = slide.querySelector('.main-title');
        const subtitle = slide.querySelector('.subtitle');
        const accent = slide.querySelector('.title-accent');
        
        if (title) {
            title.style.opacity = '0';
            title.style.transform = 'translateY(50px)';
            setTimeout(() => {
                title.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(30px)';
            setTimeout(() => {
                subtitle.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }, 600);
        }
        
        if (accent) {
            accent.style.opacity = '0';
            accent.style.transform = 'scale(0.5)';
            setTimeout(() => {
                accent.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                accent.style.opacity = '1';
                accent.style.transform = 'scale(1)';
            }, 1000);
        }
    }
    
    animateAgendaSlide(slide) {
        const items = slide.querySelectorAll('.agenda-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 * (index + 1));
        });
    }
    
    animateStatsSlide(slide) {
        const cards = slide.querySelectorAll('.stat-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.9)';
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 200 * (index + 1));
        });
    }
    
    animateReasonsSlide(slide) {
        const reasons = slide.querySelectorAll('.reason-item');
        reasons.forEach((reason, index) => {
            reason.style.opacity = '0';
            reason.style.transform = 'translateX(-30px)';
            setTimeout(() => {
                reason.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                reason.style.opacity = '1';
                reason.style.transform = 'translateX(0)';
            }, 100 * (index + 1));
        });
    }
    
    animateFacetsSlide(slide) {
        const facets = slide.querySelectorAll('.facet-item');
        facets.forEach((facet, index) => {
            facet.style.opacity = '0';
            facet.style.transform = 'scale(0.8) rotateY(45deg)';
            setTimeout(() => {
                facet.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                facet.style.opacity = '1';
                facet.style.transform = 'scale(1) rotateY(0deg)';
            }, 100 * (index + 1));
        });
    }
    
    animatePlatformsSlide(slide) {
        const platforms = slide.querySelectorAll('.platform-item');
        platforms.forEach((platform, index) => {
            platform.style.opacity = '0';
            platform.style.transform = 'translateY(30px)';
            setTimeout(() => {
                platform.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                platform.style.opacity = '1';
                platform.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    }
    
    animateContentSlide(slide) {
        const contents = slide.querySelectorAll('.content-type');
        contents.forEach((content, index) => {
            content.style.opacity = '0';
            content.style.transform = 'translateX(-40px)';
            setTimeout(() => {
                content.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                content.style.opacity = '1';
                content.style.transform = 'translateX(0)';
            }, 100 * (index + 1));
        });
    }
    
    animateMistakesSlide(slide) {
        const mistakes = slide.querySelectorAll('.mistake-item');
        mistakes.forEach((mistake, index) => {
            mistake.style.opacity = '0';
            mistake.style.transform = 'translateX(-30px)';
            setTimeout(() => {
                mistake.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                mistake.style.opacity = '1';
                mistake.style.transform = 'translateX(0)';
            }, 100 * (index + 1));
        });
    }
    
    animateActionSlide(slide) {
        const steps = slide.querySelectorAll('.step-item');
        steps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            setTimeout(() => {
                step.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    }
    
    animateTrendsSlide(slide) {
        const trends = slide.querySelectorAll('.trend-item');
        trends.forEach((trend, index) => {
            trend.style.opacity = '0';
            trend.style.transform = 'rotateY(90deg)';
            setTimeout(() => {
                trend.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                trend.style.opacity = '1';
                trend.style.transform = 'rotateY(0deg)';
            }, 100 * (index + 1));
        });
    }
    
    animateToolsSlide(slide) {
        const tools = slide.querySelectorAll('.tool-category');
        tools.forEach((tool, index) => {
            tool.style.opacity = '0';
            tool.style.transform = 'scale(0.8)';
            setTimeout(() => {
                tool.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                tool.style.opacity = '1';
                tool.style.transform = 'scale(1)';
            }, 100 * (index + 1));
        });
    }
    
    animateConclusionSlide(slide) {
        const quote = slide.querySelector('.conclusion-quote');
        const points = slide.querySelectorAll('.point');
        
        if (quote) {
            quote.style.opacity = '0';
            quote.style.transform = 'scale(0.9)';
            setTimeout(() => {
                quote.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                quote.style.opacity = '1';
                quote.style.transform = 'scale(1)';
            }, 200);
        }
        
        points.forEach((point, index) => {
            point.style.opacity = '0';
            point.style.transform = 'translateY(20px)';
            setTimeout(() => {
                point.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                point.style.opacity = '1';
                point.style.transform = 'translateY(0)';
            }, 600 + (200 * index));
        });
    }
    
    preloadAnimations() {
        // Preload animation styles to ensure smooth performance
        const style = document.createElement('style');
        style.textContent = `
            .slide * {
                transition-property: opacity, transform;
                transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
            }
        `;
        document.head.appendChild(style);
    }
    
    playSlideSound() {
        // Optional: Add subtle sound effects for slide transitions
        // This creates a very subtle audio feedback without being intrusive
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Ignore audio errors - not critical for functionality
        }
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(e => {
                console.log('Fullscreen not supported');
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    // Public methods for external control
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    // Add slide overview/thumbnail view (optional feature)
    showOverview() {
        // This could be implemented to show all slides in a grid
        console.log('Overview mode - could be implemented for slide navigation');
    }
}

// Auto-start presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize presentation
    const presentation = new Presentation();
    
    // Make presentation globally accessible for debugging
    window.presentation = presentation;
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
    
    // Add resize handler to ensure proper scaling
    window.addEventListener('resize', () => {
        // Refresh current slide animations on resize
        const currentSlideElement = document.querySelector('.slide.active');
        if (currentSlideElement) {
            presentation.triggerSlideAnimations(currentSlideElement);
        }
    });
    
    // Prevent context menu on right click (cleaner presentation experience)
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    // Add focus management for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Allow tabbing but ensure focus is visible
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Performance optimization: preload next slide images/content
    const preloadNextSlide = () => {
        const nextSlideIndex = presentation.getCurrentSlide();
        if (nextSlideIndex < presentation.getTotalSlides()) {
            const nextSlide = document.querySelector(`[data-slide="${nextSlideIndex + 1}"]`);
            if (nextSlide) {
                // Force browser to calculate styles for smoother transition
                nextSlide.offsetHeight;
            }
        }
    };
    
    // Call preload after each slide change
    document.addEventListener('slide-changed', preloadNextSlide);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Presentation;
}