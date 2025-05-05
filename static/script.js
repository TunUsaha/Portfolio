document.addEventListener('DOMContentLoaded', function () {
  // Get the current page name from the URL
  const currentPage = window.location.pathname.split('/').pop(); // Get the file name from the URL

  // Set the title based on the page name
  let pageTitle = '';
  switch (currentPage) {
    case '':
      pageTitle = 'Home';
      break;
    case 'projects':
      pageTitle = 'Projects';
      break;
    case 'aboutme':
      pageTitle = 'About Me';
      break;
    default:
      pageTitle = 'Welcome';
  }
  // Set the title
  document.querySelector('h1').textContent = pageTitle;
});

document.addEventListener('DOMContentLoaded', function () {
  // Auto-show function
  const autoShowElements = document.querySelectorAll('.autoShow');

  const autoShowObserverOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.5, // Show when 50% of the element is visible
  };

  const autoShowObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // When the element is visible, add the class
      } else {
        entry.target.classList.remove('visible'); // When the element is hidden, remove the class
      }
    });
  };

  const autoShowObserver = new IntersectionObserver(
    autoShowObserverCallback,
    autoShowObserverOptions,
  );
  autoShowElements.forEach((element) => {
    autoShowObserver.observe(element);
  });

  // Auto-blur function
  const autoBlurElements = document.querySelectorAll('.autoBLur');

  const autoBlurObserverOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.8, // Show when 80% of the element is visible
  };

  const autoBlurObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.8) {
        entry.target.classList.add('autoClear'); // When the element is visible, add the class
        entry.target.classList.remove('autoBLur'); // Remove the blur class
      } else {
        entry.target.classList.add('autoBLur'); // When the element is hidden, add the blur class
        entry.target.classList.remove('autoClear'); // Remove the clear class
      }
    });
  };

  const autoBlurObserver = new IntersectionObserver(
    autoBlurObserverCallback,
    autoBlurObserverOptions,
  );
  autoBlurElements.forEach((element) => {
    autoBlurObserver.observe(element);
  });
});

// JavaScript สำหรับ Skills Section พร้อม Animation

document.addEventListener('DOMContentLoaded', function () {
  // ใช้ IntersectionObserver ที่มีอยู่แล้วในโค้ดเดิม
  initSkillsAnimation();

  // เพิ่ม event listener สำหรับเอฟเฟค hover
  initSkillCardHoverEffects();

  // เพิ่ม counter สำหรับแสดงเปอร์เซ็นต์
  addSkillPercentages();
});

function initSkillsAnimation() {
  const skillsSection = document.querySelector('.skills-section');

  if (skillsSection) {
    // ใช้ autoShowObserver ที่มีอยู่แล้วในโค้ดเดิมของคุณ
    const skillElements = document.querySelectorAll('.skill-card');

    const skillsObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const skillsObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // เมื่อ skills card ปรากฏในหน้าจอ
          entry.target.classList.add('visible');

          // ถ้าเป็น skill card ให้เริ่ม animate progress bar
          if (entry.target.classList.contains('skill-card')) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) {
              const targetWidth = progressBar.style.width || '0%';
              // รีเซ็ต width เป็น 0 ก่อนเริ่ม animation
              progressBar.style.width = '0%';

              // ใส่ timeout เล็กน้อยเพื่อให้ animation ทำงาน
              setTimeout(() => {
                progressBar.style.width = targetWidth;
              }, 300);
            }
          }
        }
      });
    };

    const skillsObserver = new IntersectionObserver(
      skillsObserverCallback,
      skillsObserverOptions,
    );

    skillElements.forEach((element) => {
      skillsObserver.observe(element);
    });
  }
}

function initSkillCardHoverEffects() {
  const skillCards = document.querySelectorAll('.skill-card');

  skillCards.forEach((card) => {
    // เพิ่ม glowing effect เมื่อ hover
    card.addEventListener('mouseenter', function () {
      // เพิ่ม class ที่ทำให้ไอคอนหมุนเบาๆ
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.add('rotating');
      }
    });

    card.addEventListener('mouseleave', function () {
      // ลบ class เมื่อ mouse ออกจาก card
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.remove('rotating');
      }
    });
  });
}

function addSkillPercentages() {
  const skillBars = document.querySelectorAll('.skill-level');

  skillBars.forEach((skillBar) => {
    const progressBar = skillBar.querySelector('.skill-progress');
    if (progressBar) {
      const width = progressBar.style.width;
      // แปลง width เป็นเปอร์เซ็นต์ (ตัด % ออก และแปลงเป็นตัวเลข)
      const percentage = width ? parseInt(width.replace('%', '')) : 0;

      // สร้าง element ใหม่สำหรับแสดงเปอร์เซ็นต์
      const percentageLabel = document.createElement('div');
      percentageLabel.className = 'skill-percentage';
      percentageLabel.textContent = '0%';

      // เพิ่ม element เข้าไปใน DOM
      skillBar.insertAdjacentElement('afterend', percentageLabel);

      // ตรวจสอบว่ามีการใช้ IntersectionObserver หรือไม่
      if ('IntersectionObserver' in window) {
        // ใช้ IntersectionObserver เพื่อเริ่ม animation เมื่อ element ปรากฏในหน้าจอ
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // เริ่ม animation นับเลขเพิ่มขึ้นจาก 0 ถึงค่าเปอร์เซ็นต์
              animatePercentage(percentage, percentageLabel);
              // หยุดติดตามหลังจากที่ทำงานแล้ว
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });

        observer.observe(skillBar);
      } else {
        // Fallback สำหรับเบราว์เซอร์ที่ไม่รองรับ IntersectionObserver
        animatePercentage(percentage, percentageLabel);
      }
    }
  });
}

function animatePercentage(targetPercentage, element) {
  if (targetPercentage > 0) {
    let currentPercentage = 0;
    const duration = 1500; // 1.5 วินาที
    const interval = 20; // อัพเดททุก 20ms
    const increment = targetPercentage / (duration / interval);

    const timer = setInterval(() => {
      currentPercentage += increment;
      if (currentPercentage >= targetPercentage) {
        currentPercentage = targetPercentage;
        clearInterval(timer);
      }
      // อัพเดทค่าที่แสดง
      element.textContent = Math.round(currentPercentage) + '%';
    }, interval);
  }
}

// ปรับปรุง JavaScript ให้ทำงานร่วมกับโค้ด autoShow ที่มีอยู่เดิม
const existingAutoShowObserver = window.autoShowObserver;
if (existingAutoShowObserver) {
  // หาก autoShowObserver มีอยู่แล้ว ใช้ observer เดิมในการติดตาม skill cards ด้วย
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card) => {
    if (!card.classList.contains('autoShow')) {
      // เพิ่ม class autoShow เพื่อให้ใช้ animation เดียวกับที่มีอยู่เดิม
      card.classList.add('autoShow');
      // เริ่มติดตาม element
      existingAutoShowObserver.observe(card);
    }
  });
}
