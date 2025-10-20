// i have combined the three java file in one so just chnage the last script tag
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.classList.remove('animate-out');
        } else {
            entry.target.classList.add('animate-out');
            entry.target.classList.remove('animate-in');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.classList.add('slide-up');
        observer.observe(card);
    });

const slides = document.querySelectorAll(".slide");
const track = document.querySelector(".slider-track");
const leftBtn = document.querySelector(".slide-btn.left");
const rightBtn = document.querySelector(".slide-btn.right");

let current = 1;

function updateSlides() {
  slides.forEach((slide, i) => slide.classList.remove("active"));
  slides[current].classList.add("active");

  const cardWidth = slides[0].offsetWidth + 50;
  const offset = -(current - 1) * cardWidth;
  track.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
  current = (current + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  updateSlides();
}

slides.forEach((slide, i) => {
  slide.addEventListener("click", () => {
    if (i !== current) {
      current = i;
      updateSlides();
    }
  });
});

if (rightBtn) rightBtn.addEventListener("click", nextSlide);
if (leftBtn) leftBtn.addEventListener("click", prevSlide);

window.addEventListener("resize", updateSlides);

updateSlides();

const vSection = document.querySelector(".vertical-slider-section");
const vSlider = document.querySelector(".vertical-slider");
const vSlides = document.querySelectorAll(".v-slide");
const vImages = document.querySelectorAll(".v-left .v-image");

let verticalIndex = 0;

function handleVerticalScroll() {
  if (!vSection) return;

  const rect = vSection.getBoundingClientRect();
  const sectionHeight = vSection.offsetHeight;
  const windowHeight = window.innerHeight;

  if (rect.top <= 0 && Math.abs(rect.top) < sectionHeight - windowHeight) {
    const progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
    const totalSlides = vSlides.length;
    const index = Math.min(Math.floor(progress * totalSlides), totalSlides - 1);

    verticalIndex = index;

    vSlider.style.transform = `translateY(-${verticalIndex * (vSlides[0].offsetHeight + 50)}px)`;

    vSlides.forEach((s, i) => s.classList.toggle("active", i === verticalIndex));

    if (vImages.length) {
      vImages.forEach((img, i) => img.classList.toggle("active", i === verticalIndex));
    }
  }

  if (rect.top > windowHeight || rect.bottom < 0) {
    if (vImages.length) vImages.forEach(img => img.classList.remove("active"));
  }
}

window.addEventListener("scroll", handleVerticalScroll);
window.addEventListener("resize", handleVerticalScroll);

handleVerticalScroll();

const videos = document.querySelectorAll(".video");

videos.forEach(video => {
  video.pause();
  video.muted = false;

  video.addEventListener("mouseenter", () => {
    video.currentTime = 0;
    video.play().catch(err => {
      console.log("Autoplay with sound blocked until user interacts:", err);
    });
  });

  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});
