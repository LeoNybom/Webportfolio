// Förstorar projektbilder i en popup när man klickar på dem
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(img) {
  const title = img.closest(".projectitem").querySelector("h2");

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = title ? title.textContent : "";

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

document.querySelectorAll(".projectitem img").forEach(function (img) {
  img.addEventListener("click", function () {
    openLightbox(img);
  });
});

// Stäng med krysset
lightboxClose.addEventListener("click", closeLightbox);

// Stäng när man klickar utanför bilden
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Stäng med Esc
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});
