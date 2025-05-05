// smoothScroll.js - Enhanced Smooth Scroll Animation สำหรับ Portfolio

// รอให้หน้าเว็บโหลดเสร็จก่อนทำงาน
document.addEventListener('DOMContentLoaded', function () {
  // 1. Navigation Smooth Scroll สำหรับลิงก์ภายในหน้าเดียวกัน
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top +
          window.pageYOffset;
        const headerOffset = 80; // ปรับตามความสูงของ header ของคุณ
        const targetPosition = offsetTop - headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // อัพเดท URL โดยไม่โหลดหน้าใหม่ (optional)
        history.pushState(null, null, targetId);
      }
    });
  });

  // 2. Back to Top Button
  const backToTopButton = document.createElement('button');
  backToTopButton.id = 'backToTop';
  backToTopButton.innerHTML = '↑';
  backToTopButton.title = 'Back to Top';
  backToTopButton.className = 'back-to-top';
  document.body.appendChild(backToTopButton);

  // ซ่อนปุ่มตอนเริ่มต้น
  backToTopButton.style.display = 'none';

  // แสดงปุ่มเมื่อเลื่อนลงมาเกิน 300px
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
      // ไม่ต้อง display: none ทันทีเพื่อให้ fade out animation ทำงาน
      setTimeout(() => {
        if (!backToTopButton.classList.contains('visible')) {
          backToTopButton.style.display = 'none';
        }
      }, 300);
    }
  });

  // เมื่อคลิกปุ่ม ให้เลื่อนกลับไปด้านบนแบบ smooth
  backToTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // 3. Add animation classes to elements on scroll
  // เพิ่ม classes สำหรับ scroll animation หากยังไม่มี
  addScrollAnimationClasses();

  // 4. Scroll Animations with Different Effects
  setupScrollAnimations();

  // 5. Progressive Loading for Project Cards
  setupProgressiveLoading();
});

// เพิ่ม animation classes ให้กับ elements ที่เราต้องการให้มีแอนิเมชัน (ถ้ายังไม่มี)
function addScrollAnimationClasses() {
  // คลาสเป้าหมายที่เราจะเพิ่ม scroll-animate
  const targetSelectors = [
    'h1.left',
    'h2.right',
    'p.right',
    '.banner-title p',
    '.information',
    '.grid h2',
    '.grid p',
    '.grid figure',
    '.project-cards .card',
  ];

  // Animation styles ที่เราจะใช้
  const animationStyles = [
    'fade-in',
    'slide-up',
    'slide-right',
    'slide-left',
    'zoom-in',
  ];

  targetSelectors.forEach((selector, index) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element, elementIndex) => {
      // ถ้ายังไม่มี scroll-animate class, เพิ่มเข้าไป
      if (!element.classList.contains('scroll-animate')) {
        // เลือก animation style ที่เหมาะสมตามประเภทของ element
        let animationStyle = '';

        // กำหนด animation style ตามประเภทของ element
        if (selector.includes('h1') || selector.includes('h2')) {
          animationStyle = 'fade-in';
        } else if (selector.includes('.information')) {
          animationStyle = 'slide-right';
        } else if (selector.includes('.banner-title')) {
          animationStyle = 'fade-in';
        } else if (selector.includes('figure')) {
          // สลับ animation styles สำหรับรูปภาพ
          animationStyle =
            animationStyles[elementIndex % animationStyles.length];
        } else if (selector.includes('.card')) {
          animationStyle = 'slide-up';
        } else {
          // สลับ animation styles สำหรับ elements ที่เหลือ
          animationStyle =
            animationStyles[(index + elementIndex) % animationStyles.length];
        }

        // เพิ่ม classes
        element.classList.add('scroll-animate', animationStyle);
      }
    });
  });
}

// ตั้งค่า Scroll Animations
function setupScrollAnimations() {
  const scrollElements = document.querySelectorAll('.scroll-animate');

  // Observer สำหรับ animation เมื่อ scroll
  const scrollObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2, // แสดง animation เมื่อเห็นองค์ประกอบ 20%
  };

  const scrollObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // แสดง animation ที่เหมาะสมตาม class
        entry.target.classList.add('animate');
      } else {
        // ถ้าต้องการให้ animation ทำงานใหม่เมื่อ scroll ออกจากหน้าจอ (optional)
        // entry.target.classList.remove('animate');
      }
    });
  };

  const scrollObserver = new IntersectionObserver(
    scrollObserverCallback,
    scrollObserverOptions,
  );

  scrollElements.forEach((element) => {
    scrollObserver.observe(element);
  });
}

// ตั้งค่า Progressive Loading สำหรับ Project Cards
function setupProgressiveLoading() {
  const projectCards = document.querySelectorAll('.project-cards .card');

  const projectObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const projectObserverCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // เพิ่ม delay เพื่อให้โปรเจกต์แสดงทีละอัน
        setTimeout(() => {
          entry.target.classList.add('show');
        }, index * 150); // delay ทีละ 150ms

        // หยุดติดตามหลังจากที่แสดงแล้ว
        observer.unobserve(entry.target);
      }
    });
  };

  const projectObserver = new IntersectionObserver(
    projectObserverCallback,
    projectObserverOptions,
  );

  projectCards.forEach((card) => {
    projectObserver.observe(card);
  });
}
