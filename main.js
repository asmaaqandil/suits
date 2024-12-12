

gsap.registerPlugin(ScrollTrigger);
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
const menuBtnIcon = menuBtn.querySelector('i');

menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", 
        isOpen ? "ri-close-line" : "ri-menu-3-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line" );
});

//home
// Set the countdown target date (e.g., 7 days from now)
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 7);

// Update countdown every second
const countdownInterval = setInterval(() => {
  const currentDate = new Date();
  const timeRemaining = targetDate - currentDate;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    document.querySelector(".countdown").innerHTML = "Offer Expired!";
    return;
  }

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Update the DOM with GSAP for animated effects
  gsap.to("#days", {
    textContent: days.toString().padStart(2, "0"),
    duration: 1,
    ease: "power3.out",
    snap: { textContent: 1 }, 
  });

  gsap.to("#hours", {
    textContent: hours.toString().padStart(2, "0"),
    duration: 1,
    ease: "power3.out",
    snap: { textContent: 1 },
  });

  gsap.to("#minutes", {
    textContent: minutes.toString().padStart(2, "0"),
    duration: 1,
    ease: "power3.out",
    snap: { textContent: 1 },
  });

  gsap.to("#seconds", {
    textContent: seconds.toString().padStart(2, "0"),
    duration: 1,
    ease: "power3.out",
    snap: { textContent: 1 },
  });
}, 1000);

//affect images


const images = document.querySelectorAll(".header-image img");

gsap.fromTo(
  images,
  { opacity: 0, scale: 0.8, y: 50 },
  {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: "power3.out",
  }
);

images.forEach((img) => {
  img.addEventListener("mouseenter", () => {
    gsap.to(img, {
      scale: 1.1,
      duration: 0.5,
      ease: "power3.out",
    });
  });

  img.addEventListener("mouseleave", () => {
    gsap.to(img, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  });
});

// Add GSAP animation to the text elements (example for all text in the page)
const textElements = document.querySelectorAll("h1, h2, h3, p, .countdown"); // You can add more text elements

gsap.from(textElements, {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
});

// Add hover effect to text elements for interaction
textElements.forEach((text) => {
  text.addEventListener("mouseenter", () => {
    gsap.to(text, {
      color: "#ff6347", 
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  });

  text.addEventListener("mouseleave", () => {
    gsap.to(text, {
      color: "inherit", 
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  });
});



  gsap.registerPlugin(ScrollTrigger);

  // Animation for the image
  gsap.from(".choose-image img", {
    scrollTrigger: {
      trigger: ".choose-image img",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    x: -150, 
    duration: 1.5,
    ease: "power3.out",
  });

  // Animation for the text content
  gsap.from(".choose-content", {
    scrollTrigger: {
      trigger: ".choose-content",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    x: 50,
    duration: 1.5,
    ease: "power3.out",
  });

  // Animation for the list items
  gsap.from(".choose-list li", {
    scrollTrigger: {
      trigger: ".choose-list",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30, 
    duration: 1,
    stagger: 0.3, 
    ease: "power3.out",
  });

  gsap.utils.toArray(".product-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card, 
        start: "top 80%", 
        end: "bottom 80%", 
        toggleActions: "play none none none", 
      },
      opacity: 0, 
      y: 80,
      duration: 0.8, 
      ease: "power2.out", 
      delay: index * 0.1, 
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat-number");
    const statsSection = document.querySelector(".explore-stats");
    let started = false; 
  
    
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  

    const startCounting = () => {
      stats.forEach((stat) => {
        const target = +stat.getAttribute("data-target");
        let count = 0;
        const increment = target / 500;
  
        const updateCount = () => {
          if (count < target) {
            count += increment;
            stat.innerText = Math.ceil(count);
            setTimeout(updateCount, 50);
          } else {
            stat.innerText = target;
          }
        };
  
        updateCount();
      });
    };
  
   
    window.addEventListener("scroll", () => {
      if (isInViewport(statsSection) && !started) {
        started = true;
        startCounting();
      }
    });
  
    gsap.from(".explore-image img", {
      opacity: 0,
      x: 150,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".explore-image",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });



  
 
   










 





















