/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  var menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function () {
  headerShadow();
};

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText", {
  strings: [
"AI &amp; Machine Learning Engineer",
"Full-Stack Developer",
"Django &amp; Backend Specialist",
"AI-Powered Systems Builder",
  ],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000,
});

/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 1000,
  reset: true,
});

/* -- HOME -- */
sr.reveal(".featured-text-card", {});
sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".featured-text-info", { delay: 200 });
sr.reveal(".featured-text-btn", { delay: 200 });
sr.reveal(".social_icons", { delay: 200 });
sr.reveal(".featured-image", { delay: 300 });

/* -- PROJECT BOX -- */
sr.reveal(".project-box", { interval: 200 });

/* -- HEADINGS -- */
sr.reveal(".top-header", {});

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: "left",
  distance: "60px",
  duration: 1000,
  reset: true,
});

srLeft.reveal(".about-info", { delay: 100 });
srLeft.reveal(".contact-info", { delay: 100 });

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: "right",
  distance: "60px",
  duration: 1000,
  reset: true,
});

srRight.reveal(".skills-box", { delay: 100 });
srRight.reveal(".form-control", { delay: 100 });

/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;

  // Read geometry first to prevent layout thrashing on scroll
  const sectionsData = Array.from(sections).map((current) => ({
    id: current.getAttribute("id"),
    height: current.offsetHeight,
    top: current.offsetTop - 50,
  }));

  // Apply DOM writes
  sectionsData.forEach((section) => {
    const link = document.querySelector(".nav-menu a[href*=" + section.id + "]");
    if (link) {
      if (scrollY > section.top && scrollY <= section.top + section.height) {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    }
  });
}

window.addEventListener("scroll", scrollActive);

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("sendButton").addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const data = {
      name: name,
      email: email,
      message: message,
    };
    console.log(data);

    fetch("https://express-smtp-connection.onrender.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Response:", responseData);
        alert("Success Mail Send Successfully!!!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error sending email");
      });
  });
});

/* ----- DARK/LIGHT THEME ----- */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* ----- CLOSE NAVBAR ON LINK CLICK ----- */
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const menuBtn = document.getElementById("myNavMenu");
    menuBtn.className = "nav-menu";
  });
});

/* ----- PROJECT MODAL ----- */
const modal = document.getElementById("project-modal");
const closeModalBtn = document.querySelector(".close-modal");
const projectBoxes = document.querySelectorAll(".project-box");

// Modal elements
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalLabel = document.getElementById("modal-label");
const modalDesc = document.getElementById("modal-desc");
const modalLink = document.getElementById("modal-link");

projectBoxes.forEach(box => {
    box.addEventListener("click", () => {
        // Extract data from the clicked box
        const img = box.querySelector("img").src;
        const title = box.querySelector("h3").innerText;
        const label = box.querySelector("label").innerText;
        const desc = box.querySelector("p").innerHTML;
        const link = box.querySelector(".more-info").href;

        // Populate modal
        modalImg.src = img;
        modalTitle.innerText = title;
        modalLabel.innerText = label;
        modalDesc.innerHTML = desc;
        modalLink.href = link;

        // Show modal
        modal.classList.add("active");
    });
});

// Close modal logic
closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});
