 // ==================== INITIALIZATION ====================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==================== LOADING SCREEN ====================
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
      }, 1000);
    });

    // ==================== PARTICLES BACKGROUND ====================
    function createParticles() {
      if (prefersReducedMotion) return;
      
      const container = document.getElementById('particles');
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
      }
    }
    createParticles();

    // ==================== CUSTOM CURSOR ====================
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Only enable custom cursor on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        cursorDot.classList.add('active');
        cursor.classList.add('active');
      });

      function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
      }
      animateCursor();

      // Cursor interactions
      document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'scale(1.5)';
          cursor.style.borderColor = 'var(--secondary)';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'scale(1)';
          cursor.style.borderColor = 'var(--accent)';
        });
      });
    } else {
      // Hide custom cursor on touch devices
      cursor.style.display = 'none';
      cursorDot.style.display = 'none';
    }

    // ==================== SCROLL PROGRESS ====================
    function updateScrollProgress() {
      const scrollProgress = document.getElementById('scrollProgress');
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      scrollProgress.style.width = scrolled + '%';
    }
    window.addEventListener('scroll', updateScrollProgress);

    // ==================== HEADER SCROLL EFFECT ====================
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // ==================== TYPEWRITER EFFECT ====================
    const texts = [
      "Hi, I'm Webster Muchakazi",
      "IoT Developer & Engineer",
      "AI Enthusiast",
      "Full-Stack Developer"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextElement = document.getElementById('typedText');

    function typeWriter() {
      const currentText = texts[textIndex];
      
      if (!isDeleting && charIndex <= currentText.length) {
        typedTextElement.textContent = currentText.substring(0, charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
      } else if (isDeleting && charIndex >= 0) {
        typedTextElement.textContent = currentText.substring(0, charIndex);
        charIndex--;
        setTimeout(typeWriter, 50);
      } else if (!isDeleting && charIndex > currentText.length) {
        setTimeout(() => {
          isDeleting = true;
          typeWriter();
        }, 2000);
      } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeWriter, 500);
      }
    }
    typeWriter();

    // ==================== SUBTITLE ROTATION ====================
    const subtitles = [
      "Building the future with IoT & AI",
      "Creating smart solutions for real problems",
      "Transforming ideas into reality"
    ];
    let subtitleIndex = 0;
    const subtitleElement = document.getElementById('subtitle');

    setInterval(() => {
      subtitleElement.style.opacity = '0';
      setTimeout(() => {
        subtitleIndex = (subtitleIndex + 1) % subtitles.length;
        subtitleElement.textContent = subtitles[subtitleIndex];
        subtitleElement.style.opacity = '1';
      }, 500);
    }, 4000);

   
    // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Animate skill bars
          if (entry.target.classList.contains('skill-card')) {
            const progress = entry.target.querySelector('.skill-progress');
            const value = progress.getAttribute('data-progress');
            setTimeout(() => {
              progress.style.width = value + '%';
            }, 200);
          }
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.project-card, .skill-card, .contact-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // ==================== TOAST NOTIFICATION ====================
    function showToast(message) {
      const toast = document.getElementById('toast');
      const toastMessage = document.getElementById('toastMessage');
      toastMessage.textContent = message;
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    // ==================== PROJECT MODAL ====================
    function showProjectModal(title) {
      const modal = document.getElementById('modalBackdrop');
      const modalTitle = document.getElementById('modalTitle');
      const modalContent = document.getElementById('modalContent');
      
      const projectDetails = {
        'AI-Driven Smart Irrigation': 'An innovative IoT system that leverages soil moisture sensors, ESP8266 microcontrollers, and machine learning algorithms to create an intelligent irrigation solution. The system automatically adjusts watering schedules based on real-time soil conditions, weather forecasts, and plant requirements, resulting in up to 40% water savings.',
        'Cashflow Prediction Dashboard': 'A sophisticated financial analytics dashboard built with Python and Streamlit. Features predictive modeling using time-series analysis to forecast cashflow patterns, helping businesses in Zimbabwe navigate complex payment environments. Includes interactive visualizations and scenario planning tools.',
        'Student Portal System': 'Comprehensive student management system with role-based access control. Features include online registration, grade management, assignment submission, attendance tracking, and administrative tools. Built with PHP, MySQL, and modern responsive design principles.',
        'Mobile Expense Tracker': 'Cross-platform mobile application for personal finance management. Includes budget categorization, expense tracking with receipt scanning, visual analytics with charts, recurring transaction management, and offline-first architecture with SQLite database.'
      };
      
      modalTitle.textContent = title;
      modalContent.textContent = projectDetails[title] || 'Project details coming soon...';
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeModal(event) {
      if (!event || event.target.id === 'modalBackdrop' || event.target.classList.contains('modal-close')) {
        const modal = document.getElementById('modalBackdrop');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // ==================== THEME TOGGLE ====================
    function setTheme(theme) {
      if (theme === 'dark-mode') {
        document.body.classList.add('dark-mode');
        darkModeBtn.classList.add('active');
        lightModeBtn.classList.remove('active');
        themeName.textContent = 'Dark';
      } else {
        document.body.classList.remove('dark-mode');
        lightModeBtn.classList.add('active');
        darkModeBtn.classList.remove('active');
        themeName.textContent = 'Light';
      }
      
      // Save theme preference
      localStorage.setItem('theme', theme);
      
      // Show toast notification
      showToast(`Switched to ${theme === 'dark-mode' ? 'Dark' : 'Light'} mode`);
    }

    // Event listeners for theme buttons
    const lightModeBtn = document.getElementById('lightMode');
    const darkModeBtn = document.getElementById('darkMode');
    const themeName = document.getElementById('themeName');

    lightModeBtn.addEventListener('click', () => setTheme('light'));
    darkModeBtn.addEventListener('click', () => setTheme('dark-mode'));

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // ==================== MOBILE MENU ====================
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.getElementById('menuIcon');

    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuIcon.classList.toggle('fa-bars');
      menuIcon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-times');
      });
    });

    // ==================== ACCESSIBILITY ====================
    // Add keyboard navigation for project cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.setAttribute('tabindex', '0');
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const title = card.querySelector('.project-title').textContent;
          showProjectModal(title);
        }
      });
    });

    // Focus management
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });

    // ==================== PROJECT CARD CLICK HANDLER ====================
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.project-links') || 
            e.target.closest('.icon-btn') || 
            e.target.tagName === 'A') {
          return;
        }
        
        const title = card.querySelector('.project-title').textContent;
        showProjectModal(title);
      });
    });

    // ==================== SCHEDULE BUTTON ====================
    const scheduleBtn = document.getElementById('scheduleBtn');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');

    scheduleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalBackdrop.classList.add('show');
    });

    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('show');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('show');
      }
    });

    // ==================== DRAGGABLE THEME TOGGLE ====================
    const themeToggle = document.getElementById('themeToggle');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    themeToggle.addEventListener("mousedown", dragStart);
    themeToggle.addEventListener("touchstart", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag);
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("touchend", dragEnd);

    function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      if (e.target === themeToggle || themeToggle.contains(e.target)) {
        isDragging = true;
        themeToggle.style.cursor = "grabbing";
      }
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();
        
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, themeToggle);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    function dragEnd() {
      initialX = currentX;
      initialY = currentY;
      isDragging = false;
      themeToggle.style.cursor = "grab";
    }
