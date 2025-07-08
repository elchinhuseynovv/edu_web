// Main Application
class EduPlatformApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.setupNavigation();
    this.setupModals();
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.setupFormHandlers();
  }

  setupEventListeners() {
    // DOM Content Loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.onDOMReady();
    });

    // Window events
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
    window.addEventListener('load', () => {
      animationController.animateOnLoad();
    });
  }

  onDOMReady() {
    // Initialize all components after DOM is ready
    this.initializeComponents();
    
    // Setup smooth scrolling for navigation links
    this.setupSmoothScrolling();
    
    // Initialize search functionality
    this.setupSearch();
    
    // Setup category interactions
    this.setupCategoryInteractions();
  }

  initializeComponents() {
    // Initialize course filter and display
    const coursesGrid = document.getElementById('courses-grid');
    if (coursesGrid && window.coursesData) {
      window.courseFilter = new CourseFilter(coursesData, coursesGrid);
    }

    // Initialize testimonial slider
    const testimonialSlider = document.getElementById('testimonials-slider');
    if (testimonialSlider && window.testimonialsData) {
      window.testimonialSlider = new TestimonialSlider(testimonialsData, testimonialSlider);
    }

    // Initialize search component
    if (window.coursesData) {
      window.searchComponent = new SearchComponent(coursesData);
    }
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href').substring(1);
        animationController.scrollToElement(targetId);
      });
    });
  }

  setupSmoothScrolling() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        if (targetId) {
          animationController.scrollToElement(targetId);
        }
      });
    });
  }

  setupModals() {
    // Course modal
    const courseModal = document.getElementById('course-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        courseModal.classList.remove('active');
      });
    }

    // Auth modal
    const authModal = document.getElementById('auth-modal');
    const closeAuthModal = document.getElementById('close-auth-modal');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');

    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        authModal.classList.add('active');
        this.showLoginForm();
      });
    }

    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        authModal.classList.add('active');
        this.showRegisterForm();
      });
    }

    if (closeAuthModal) {
      closeAuthModal.addEventListener('click', () => {
        authModal.classList.remove('active');
      });
    }

    if (showRegister) {
      showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        this.showRegisterForm();
      });
    }

    if (showLogin) {
      showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        this.showLoginForm();
      });
    }

    // Close modals when clicking outside
    [courseModal, authModal].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('active');
          }
        });
      }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
          modal.classList.remove('active');
        });
      }
    });
  }

  showLoginForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm && registerForm) {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    }
  }

  showRegisterForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm && registerForm) {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    }
  }

  setupScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Create overlay
        let overlay = document.querySelector('.mobile-overlay');
        if (!overlay) {
          overlay = document.createElement('div');
          overlay.className = 'mobile-overlay';
          document.body.appendChild(overlay);
        }
        
        overlay.classList.toggle('active');
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', () => {
          navMenu.classList.remove('active');
          overlay.classList.remove('active');
        });
      });

      // Close menu when clicking nav links
      const navLinks = navMenu.querySelectorAll('.nav__link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          const overlay = document.querySelector('.mobile-overlay');
          if (overlay) {
            overlay.classList.remove('active');
          }
        });
      });
    }
  }

  setupFormHandlers() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewsletterSubmit(e.target);
      });
    }

    // Auth forms
    const loginForm = document.querySelector('#login-form form');
    const registerForm = document.querySelector('#register-form form');

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin(e.target);
      });
    }

    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleRegister(e.target);
      });
    }
  }

  handleNewsletterSubmit(form) {
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button');
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
      button.style.background = 'var(--success-color)';
      
      // Reset form after delay
      setTimeout(() => {
        form.reset();
        button.innerHTML = 'Subscribe';
        button.style.background = '';
        button.disabled = false;
      }, 2000);
    }, 1500);
  }

  handleLogin(form) {
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    button.disabled = true;
    
    // Simulate login
    setTimeout(() => {
      // Close modal
      document.getElementById('auth-modal').classList.remove('active');
      
      // Show success message
      this.showNotification('Successfully logged in!', 'success');
      
      // Reset button
      button.textContent = originalText;
      button.disabled = false;
      
      // Update UI to show logged in state
      this.updateAuthUI(true);
    }, 1500);
  }

  handleRegister(form) {
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    button.disabled = true;
    
    // Simulate registration
    setTimeout(() => {
      // Close modal
      document.getElementById('auth-modal').classList.remove('active');
      
      // Show success message
      this.showNotification('Account created successfully!', 'success');
      
      // Reset button
      button.textContent = originalText;
      button.disabled = false;
      
      // Update UI to show logged in state
      this.updateAuthUI(true);
    }, 1500);
  }

  updateAuthUI(isLoggedIn) {
    const userMenu = document.querySelector('.user-menu');
    
    if (isLoggedIn) {
      userMenu.innerHTML = `
        <div class="user-profile">
          <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" alt="User" class="user-avatar">
          <span class="user-name">John Doe</span>
          <button class="btn btn--outline btn--small" id="logout-btn">Logout</button>
        </div>
      `;
      
      // Setup logout
      document.getElementById('logout-btn').addEventListener('click', () => {
        this.updateAuthUI(false);
        this.showNotification('Logged out successfully', 'info');
      });
    } else {
      userMenu.innerHTML = `
        <button class="btn btn--primary" id="login-btn">Login</button>
        <button class="btn btn--outline" id="register-btn">Register</button>
      `;
      
      // Re-setup auth buttons
      this.setupAuthButtons();
    }
  }

  setupAuthButtons() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const authModal = document.getElementById('auth-modal');

    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        authModal.classList.add('active');
        this.showLoginForm();
      });
    }

    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        authModal.classList.add('active');
        this.showRegisterForm();
      });
    }
  }

  setupSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
      // Hide search results when clicking outside
      document.addEventListener('click', (e) => {
        if (!searchInput.parentElement.contains(e.target)) {
          const searchResults = document.querySelector('.search-results');
          if (searchResults) {
            searchResults.classList.remove('show');
          }
        }
      });
    }
  }

  setupCategoryInteractions() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const category = card.dataset.category;
        
        // Scroll to courses section
        animationController.scrollToElement('courses');
        
        // Filter courses by category
        setTimeout(() => {
          const filterBtn = document.querySelector(`[data-filter="${category}"]`);
          if (filterBtn) {
            filterBtn.click();
          }
        }, 500);
      });
    });
  }

  handleScroll() {
    // Update navigation active states based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.id;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  handleResize() {
    // Handle responsive adjustments
    const mobileBreakpoint = 768;
    
    if (window.innerWidth > mobileBreakpoint) {
      // Close mobile menu if open
      const navMenu = document.getElementById('nav-menu');
      const overlay = document.querySelector('.mobile-overlay');
      
      if (navMenu) navMenu.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
      <button class="notification__close">
        <i class="fas fa-times"></i>
      </button>
    `;

    // Add styles for notification
    if (!document.querySelector('#notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'notification-styles';
      styles.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: var(--white);
          padding: var(--space-4) var(--space-6);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          display: flex;
          align-items: center;
          gap: var(--space-3);
          z-index: var(--z-tooltip);
          transform: translateX(100%);
          transition: var(--transition-normal);
          max-width: 400px;
        }
        
        .notification.show {
          transform: translateX(0);
        }
        
        .notification--success {
          border-left: 4px solid var(--success-color);
        }
        
        .notification--error {
          border-left: 4px solid var(--error-color);
        }
        
        .notification--info {
          border-left: 4px solid var(--primary-color);
        }
        
        .notification__close {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray-400);
          margin-left: auto;
        }
        
        .notification__close:hover {
          color: var(--gray-600);
        }
      `;
      document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Setup close button
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
      this.hideNotification(notification);
    });

    // Auto hide after 5 seconds
    setTimeout(() => {
      this.hideNotification(notification);
    }, 5000);
  }

  hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }

  // Utility functions
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

// Initialize the application
const app = new EduPlatformApp();

// Make app globally available for debugging
window.app = app;