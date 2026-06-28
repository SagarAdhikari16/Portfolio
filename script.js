const text = [
  "Unique Blend: Tech + Business",
  "Information Management Architect",
  "Systems Operations Planner",
  "Building Scalable Solutions..."
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type() {
  current = text[i];
  let display = document.getElementById("type");
  if (!display) return;

  if (!isDeleting) {
    display.innerHTML = current.substring(0, j++);
    if (j > current.length) {
      isDeleting = true;
      setTimeout(type, 1500); 
      return;
    }
  } else {
    display.innerHTML = current.substring(0, j--);
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % text.length;
    }
  }

  setTimeout(type, isDeleting ? 30 : 70);
}

document.addEventListener("DOMContentLoaded", () => {
  type();
  
  // Trigger initial visibility check
  revealElements();
});

/* Scroll animation reveal logic */
function revealElements() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 40) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealElements);