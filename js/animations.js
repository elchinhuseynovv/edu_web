// Animation Controller
class AnimationController {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupProgressBars();
    this.setupParallaxEffects();
    this.setupIntersectionObserver();
  }

  // Scroll-triggered animations
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  // Counter animations
  setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat__number');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  // Progress bar animations
  setupProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const progress = progressBar.dataset.progress;
          setTimeout(() => {
            progressBar.style.width = `${progress}%`;
          }, 300);
          progressObserver.unobserve(progressBar);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
      progressObserver.observe(bar);
    });
  }

  // Parallax effects
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  // Intersection Observer for various animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Add staggered animation for child elements
          const children = entry.target.querySelectorAll('.stagger-animate');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe elements that need animation
    const elementsToObserve = document.querySelectorAll(
      '.category-card, .course-card, .feature-card, .testimonial-card'
    );
    
    elementsToObserve.forEach(element => {
      observer.observe(element);
    });
  }

  // Smooth scroll to element
  scrollToElement(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Add ripple effect to buttons
  addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Animate elements on page load
  animateOnLoad() {
    const heroElements = document.querySelectorAll('.hero__title, .hero__description, .hero__buttons');
    
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-fade-in-up');
      }, index * 200);
    });
  }

  // Stagger animation for grid items
  staggerGridAnimation(container, delay = 100) {
    const items = container.querySelectorAll('.grid-item');
    
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate-scale-in');
      }, index * delay);
    });
  }

  // Text reveal animation
  revealText(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${index * 50}ms`;
      span.classList.add('char-reveal');
      element.appendChild(span);
    });
  }

  // Loading animation
  showLoadingAnimation(element) {
    element.classList.add('loading-shimmer');
  }

  hideLoadingAnimation(element) {
    element.classList.remove('loading-shimmer');
  }

  // Entrance animations for modals
  animateModalEntrance(modal) {
    modal.classList.add('animate-zoom-in');
    
    setTimeout(() => {
      modal.classList.remove('animate-zoom-in');
    }, 600);
  }

  // Page transition effects
  pageTransition(callback) {
    document.body.classList.add('page-transition');
    
    setTimeout(() => {
      if (callback) callback();
      document.body.classList.remove('page-transition');
    }, 300);
  }
}

// Initialize animation controller
const animationController = new AnimationController();

// Export for use in other modules
window.AnimationController = AnimationController;
window.animationController = animationController;