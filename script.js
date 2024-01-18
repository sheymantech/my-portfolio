"use strict";
const footerContainer = document.querySelector(".footer-content");
const menuBtn = document.querySelectorAll(".menu-icon-wrapper");
const sections = document.querySelectorAll("section");
const modeToggler = document.getElementById("mode");

// footer DOM  Manipulation

const footerDOM = function (container) {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const footerHtml = `
<hr>
<p class="text-center">&copy; ${year} All right reserved, built by olaniyan sheyi.</p>
`;

  container.insertAdjacentHTML("afterbegin", footerHtml);
};
footerDOM(footerContainer);

// header functionality implementeation
menuBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    menuBtn.forEach((btn) => {
      btn.classList.remove("active-menu");
    });
    this.classList.add("active-menu");
  });
});

//intersection observer

// const secObserver = function (entries, observer) {
//   entries.forEach((entry) => {
//     // console.log(entry);
//     const curSection = entry.target.id;
//     const curLink = document.querySelector(`a[href="#${curSection}"]`);
//     if (entry.isIntersecting) {
//       curLink.closest(".menu-icon-wrapper").classList.add("active-menu");
//     } else {
//       curLink.closest(".menu-icon-wrapper").classList.remove("active-menu");
//     }
//   });
// };

// const observer = new IntersectionObserver(secObserver, {
//   root: null,
//   threshold: 0.5,
// });

// sections.forEach((section) => {
//   observer.observe(section);
//   console.log(section);
// });

// animation implementation

const secObserver = function (entries, observer) {
  entries.forEach((entry, index) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.style.animation = "showRight 1s ease forwards";
      entry.target.style.animationDelay = `calc(0.1s * ${index + 1})`;
      entry.target.style.opacity = 1;
    } else {
      entry.target.style.animation = "none";
      entry.target.style.opacity = 0;
    }
  });
};

const observer = new IntersectionObserver(secObserver, {
  root: null,
  threshold: 0.1,
});

const elements = document.querySelectorAll(".animation");

elements.forEach((element) => {
  observer.observe(element);
});

// mode changer implementation
modeToggler.addEventListener("click", function () {
  const root = document.documentElement;
  const isDarkMode = root.classList.toggle("dark-mode");
  if (isDarkMode) {
    root.style.setProperty("--primary-color", "#f4f6f9");
    root.style.setProperty("--secondary-color", "#009688");
    root.style.setProperty("--tertiary-color", "#3e3e3e");
    root.style.setProperty("--sub-color-color", "#f4f6f9");
    document.querySelector("header").style.backgroundColor = "#f4f6f9";
    document.querySelector(".stack-list").style.backgroundColor = "#f4f6f9";
  } else {
    root.style.setProperty("--primary-color", "#0a1828");
    root.style.setProperty("--secondary-color", "#178582");
    root.style.setProperty("--tertiary-color", "#bfa181");
    root.style.setProperty("--sub-color-color", "#252e36e1");
    document.querySelector("header").style.backgroundColor = "#252e36e1";
    document.querySelector(".stack-list").style.backgroundColor = "#252e36e1";
  }
  console.log(root);
  console.log(isDarkMode);
});

// Tech stack section
document.addEventListener("DOMContentLoaded", function () {
  const techItems = Array.from(document.querySelectorAll(".tech-item"));
  const connector = document.querySelector(".tech-connector");

  const angle = (2 * Math.PI) / techItems.length;

  techItems.forEach((item, index) => {
    const radius = 150; // Adjust the radius as needed
    const x = Math.cos(angle * index) * radius;
    const y = Math.sin(angle * index) * radius;

    gsap.set(item, { x, y }); // Set initial position of each item

    const line = document.createElement("div");
    line.className = "connector-line";
    line.style.width = `${Math.sqrt(x * x + y * y)}px`;
    line.style.transform = `rotate(${Math.atan2(y, x)}rad)`;
    connector.appendChild(line);
  });

  function rotateItems() {
    techItems.forEach((item, index) => {
      const newIndex = (index + 1) % techItems.length; // Get the new index after rotation
      const newX = gsap.getProperty(techItems[newIndex], "x");
      const newY = gsap.getProperty(techItems[newIndex], "y");

      gsap.to(item, {
        x: newX,
        y: newY,
        duration: 2,
        ease: "power1.inOut",
      });
    });
  }

  // Start rotating the items
  rotateItems();

  // Rotate the items every 2 seconds
  setInterval(rotateItems, 2000);
});
