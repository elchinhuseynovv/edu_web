// Component Classes

// Course Card Component
class CourseCard {
  constructor(courseData) {
    this.data = courseData;
  }

  render() {
    return `
      <div class="course-card" data-category="${this.data.category}" data-course-id="${this.data.id}">
        <div class="course-card__image">
          <img src="${this.data.image}" alt="${this.data.title}" loading="lazy">
          <div class="course-card__badge">${this.data.badge}</div>
        </div>
        <div class="course-card__content">
          <div class="course-card__category">${this.data.category.replace('-', ' ')}</div>
          <h3 class="course-card__title">${this.data.title}</h3>
          <p class="course-card__description">${this.data.description}</p>
          
          <div class="course-card__instructor">
            <img src="${this.data.instructor.image}" alt="${this.data.instructor.name}" class="instructor__image">
            <span class="instructor__name">${this.data.instructor.name}</span>
          </div>
          
          <div class="course-card__meta">
            <div class="course-card__rating">
              <div class="stars">
                ${this.generateStars(this.data.rating)}
              </div>
              <span class="rating-text">${this.data.rating} (${this.data.reviews})</span>
            </div>
            <div class="course-card__duration">
              <i class="fas fa-clock"></i>
              <span>${this.data.duration}</span>
            </div>
          </div>
          
          <div class="course-card__footer">
            <div class="course-card__price">
              <span class="price__current">$${this.data.price}</span>
              <span class="price__original">$${this.data.originalPrice}</span>
            </div>
            <button class="course-card__enroll" data-course-id="${this.data.id}">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    `;
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>';
    }

    return stars;
  }
}

// Course Filter Component
class CourseFilter {
  constructor(courses, container) {
    this.courses = courses;
    this.container = container;
    this.currentFilter = 'all';
    this.currentPage = 0;
    this.coursesPerPage = 6;
    this.init();
  }

  init() {
    this.renderCourses();
    this.setupFilterButtons();
    this.setupNavigation();
  }

  renderCourses() {
    const filteredCourses = this.getFilteredCourses();
    const paginatedCourses = this.getPaginatedCourses(filteredCourses);
    
    this.container.innerHTML = '';
    
    paginatedCourses.forEach((course, index) => {
      const courseCard = new CourseCard(course);
      const courseElement = document.createElement('div');
      courseElement.innerHTML = courseCard.render();
      courseElement.firstElementChild.style.animationDelay = `${index * 0.1}s`;
      courseElement.firstElementChild.classList.add('animate-fade-in-up');
      this.container.appendChild(courseElement.firstElementChild);
    });

    this.updateNavigation(filteredCourses.length);
    this.setupCourseCardEvents();
  }

  getFilteredCourses() {
    if (this.currentFilter === 'all') {
      return this.courses;
    }
    return this.courses.filter(course => course.category === this.currentFilter);
  }

  getPaginatedCourses(courses) {
    const start = this.currentPage * this.coursesPerPage;
    const end = start + this.coursesPerPage;
    return courses.slice(start, end);
  }

  setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update filter and reset page
        this.currentFilter = button.dataset.filter;
        this.currentPage = 0;
        
        // Re-render courses
        this.renderCourses();
      });
    });
  }

  setupNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.addEventListener('click', () => {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.renderCourses();
      }
    });

    nextBtn.addEventListener('click', () => {
      const filteredCourses = this.getFilteredCourses();
      const maxPages = Math.ceil(filteredCourses.length / this.coursesPerPage);
      
      if (this.currentPage < maxPages - 1) {
        this.currentPage++;
        this.renderCourses();
      }
    });
  }

  updateNavigation(totalCourses) {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const maxPages = Math.ceil(totalCourses / this.coursesPerPage);

    prevBtn.disabled = this.currentPage === 0;
    nextBtn.disabled = this.currentPage >= maxPages - 1;
  }

  setupCourseCardEvents() {
    const enrollButtons = document.querySelectorAll('.course-card__enroll');
    const courseCards = document.querySelectorAll('.course-card');

    enrollButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const courseId = button.dataset.courseId;
        this.handleEnrollment(courseId);
      });
    });

    courseCards.forEach(card => {
      card.addEventListener('click', () => {
        const courseId = card.dataset.courseId;
        this.showCourseModal(courseId);
      });
    });
  }

  handleEnrollment(courseId) {
    // Add ripple effect
    const button = document.querySelector(`[data-course-id="${courseId}"]`);
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enrolling...';
    
    // Simulate enrollment process
    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-check"></i> Enrolled!';
      button.style.background = 'var(--success-color)';
      
      // Show success message
      this.showNotification('Successfully enrolled in course!', 'success');
    }, 1500);
  }

  showCourseModal(courseId) {
    const course = this.courses.find(c => c.id == courseId);
    if (!course) return;

    const modal = document.getElementById('course-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
      <div class="course-modal-content">
        <div class="course-modal__header">
          <img src="${course.image}" alt="${course.title}" class="course-modal__image">
          <div class="course-modal__badge">${course.badge}</div>
        </div>
        
        <div class="course-modal__body">
          <div class="course-modal__category">${course.category.replace('-', ' ')}</div>
          <h2 class="course-modal__title">${course.title}</h2>
          <p class="course-modal__description">${course.description}</p>
          
          <div class="course-modal__instructor">
            <img src="${course.instructor.image}" alt="${course.instructor.name}" class="instructor__image">
            <div class="instructor__info">
              <h4 class="instructor__name">${course.instructor.name}</h4>
              <p class="instructor__title">Course Instructor</p>
            </div>
          </div>
          
          <div class="course-modal__stats">
            <div class="stat">
              <i class="fas fa-star"></i>
              <span>${course.rating} (${course.reviews} reviews)</span>
            </div>
            <div class="stat">
              <i class="fas fa-clock"></i>
              <span>${course.duration}</span>
            </div>
            <div class="stat">
              <i class="fas fa-play-circle"></i>
              <span>${course.lessons} lessons</span>
            </div>
            <div class="stat">
              <i class="fas fa-signal"></i>
              <span>${course.level}</span>
            </div>
          </div>
          
          <div class="course-modal__pricing">
            <div class="pricing">
              <span class="price__current">$${course.price}</span>
              <span class="price__original">$${course.originalPrice}</span>
              <span class="discount">${Math.round((1 - course.price / course.originalPrice) * 100)}% OFF</span>
            </div>
            <button class="btn btn--primary btn--large" data-course-id="${course.id}">
              Enroll Now - $${course.price}
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    animationController.animateModalEntrance(modalBody);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// Testimonial Slider Component
class TestimonialSlider {
  constructor(testimonials, container) {
    this.testimonials = testimonials;
    this.container = container;
    this.currentSlide = 0;
    this.autoPlayInterval = null;
    this.init();
  }

  init() {
    this.renderTestimonials();
    this.setupDots();
    this.startAutoPlay();
    this.setupEventListeners();
  }

  renderTestimonials() {
    this.container.innerHTML = '';
    
    this.testimonials.forEach((testimonial, index) => {
      const testimonialElement = document.createElement('div');
      testimonialElement.className = `testimonial-card ${index === 0 ? 'active' : ''}`;
      testimonialElement.innerHTML = `
        <div class="testimonial-card__content">
          <div class="testimonial-card__rating">
            ${this.generateStars(testimonial.rating)}
          </div>
          <p class="testimonial-card__text">"${testimonial.text}"</p>
          <div class="testimonial-card__author">
            <img src="${testimonial.image}" alt="${testimonial.name}" class="author__image">
            <div class="author__info">
              <h4 class="author__name">${testimonial.name}</h4>
              <p class="author__course">${testimonial.course}</p>
            </div>
          </div>
        </div>
      `;
      this.container.appendChild(testimonialElement);
    });
  }

  generateStars(rating) {
    return Array(rating).fill('<i class="fas fa-star"></i>').join('');
  }

  setupDots() {
    const dotsContainer = document.querySelector('.testimonials__dots');
    dotsContainer.innerHTML = '';

    this.testimonials.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dot.dataset.slide = index;
      dotsContainer.appendChild(dot);
    });
  }

  setupEventListeners() {
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.dataset.slide);
        this.goToSlide(slideIndex);
        this.resetAutoPlay();
      });
    });

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    this.container.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe();
    });
  }

  handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.resetAutoPlay();
    }
  }

  goToSlide(index) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');

    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    testimonials[index].classList.add('active');
    dots[index].classList.add('active');

    this.currentSlide = index;
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.testimonials.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = this.currentSlide === 0 ? this.testimonials.length - 1 : this.currentSlide - 1;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }
}

// Search Component
class SearchComponent {
  constructor(courses) {
    this.courses = courses;
    this.searchInput = document.querySelector('.search-input');
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    let searchTimeout;

    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });

    this.searchInput.addEventListener('focus', () => {
      this.searchInput.parentElement.classList.add('focused');
    });

    this.searchInput.addEventListener('blur', () => {
      this.searchInput.parentElement.classList.remove('focused');
    });
  }

  performSearch(query) {
    if (query.length < 2) {
      this.hideSearchResults();
      return;
    }

    const results = this.courses.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(query.toLowerCase())
    );

    this.showSearchResults(results, query);
  }

  showSearchResults(results, query) {
    let resultsContainer = document.querySelector('.search-results');
    
    if (!resultsContainer) {
      resultsContainer = document.createElement('div');
      resultsContainer.className = 'search-results';
      this.searchInput.parentElement.appendChild(resultsContainer);
    }

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-result-item no-results">
          <p>No courses found for "${query}"</p>
        </div>
      `;
    } else {
      resultsContainer.innerHTML = results.slice(0, 5).map(course => `
        <div class="search-result-item" data-course-id="${course.id}">
          <img src="${course.image}" alt="${course.title}" class="result-image">
          <div class="result-content">
            <h4 class="result-title">${course.title}</h4>
            <p class="result-instructor">${course.instructor.name}</p>
            <span class="result-price">$${course.price}</span>
          </div>
        </div>
      `).join('');

      // Add click events to results
      resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const courseId = item.dataset.courseId;
          if (courseId) {
            this.hideSearchResults();
            this.searchInput.value = '';
            // Trigger course modal or navigation
            window.courseFilter.showCourseModal(courseId);
          }
        });
      });
    }

    resultsContainer.classList.add('show');
  }

  hideSearchResults() {
    const resultsContainer = document.querySelector('.search-results');
    if (resultsContainer) {
      resultsContainer.classList.remove('show');
    }
  }
}

// Export components
window.CourseCard = CourseCard;
window.CourseFilter = CourseFilter;
window.TestimonialSlider = TestimonialSlider;
window.SearchComponent = SearchComponent;