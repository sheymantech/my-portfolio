"use strict";
const footerContainer = document.querySelector(".footer-content");

// footer DOM  Manipulation

const footerDOM = function (container) {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const footerHtml = `
<hr>
<p>&copy; ${year} All right reserved, built by olaniyan sheyi.</p>
`;

  container.insertAdjacentHTML("afterbegin", footerHtml);
};
footerDOM(footerContainer);

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
