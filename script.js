const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove("active"));
      const id = entry.target.id;
      document.querySelector(`.nav a[href="#${id}"]`).classList.add("active");
    }
  });
}, { threshold: 0.6 });

sections.forEach(s => navObserver.observe(s));

const elements = document.querySelectorAll(".section, .resume-card, .project-feature");

const reveal = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("show"), i * 60);
    }
  });
}, { threshold: 0.15 });

elements.forEach(el => {
  el.classList.add("hidden");
  reveal.observe(el);
});

let mx = 0, my = 0;

document.addEventListener("mousemove", (e) => {
  mx = (e.clientX / window.innerWidth - 0.5) * 30;
  my = (e.clientY / window.innerHeight - 0.5) * 30;
});

function animate() {
  document.querySelector(".bg-blobs").style.transform =
    `translate(${mx}px, ${my}px)`;
  requestAnimationFrame(animate);
}
animate();

document.body.style.opacity = "0";

window.addEventListener("load", () => {
  document.body.style.transition = "1s ease";
  document.body.style.opacity = "1";
});