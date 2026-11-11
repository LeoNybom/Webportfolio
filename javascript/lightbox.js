// Visar ett projekt i en popup: större bild, titel och längre beskrivning
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxDetails = document.getElementById("lightbox-details");
const lightboxGallery = document.getElementById("lightbox-gallery");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(card) {
  const img = card.querySelector("img");
  const title = card.querySelector("h2");
  const shortText = card.querySelector(".project-content p");
  const details = card.querySelector(".project-details");
  const gallery = card.querySelector(".project-gallery");

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = title ? title.textContent : "";

  // Korta texten från kortet + den längre beskrivningen (om den finns)
  lightboxDetails.innerHTML =
    (shortText ? shortText.outerHTML : "") + (details ? details.innerHTML : "");

  // Galleriet: huvudbilden först, sedan kortets extra bilder/placeholders
  lightboxGallery.innerHTML = "";
  const mainThumb = img.cloneNode();
  mainThumb.removeAttribute("class");
  mainThumb.classList.add("active");
  lightboxGallery.appendChild(mainThumb);
  if (gallery) {
    lightboxGallery.insertAdjacentHTML("beforeend", gallery.innerHTML);
  }

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

// Både bilden och "Läs mer"-knappen öppnar samma vy
document.querySelectorAll(".projectitem").forEach(function (card) {
  card.querySelector("img").addEventListener("click", function () {
    openLightbox(card);
  });

  const readMore = card.querySelector(".readmore-btn");
  if (readMore) {
    readMore.addEventListener("click", function () {
      openLightbox(card);
    });
  }
});

// Klick på en miniatyr byter den stora bilden
lightboxGallery.addEventListener("click", function (event) {
  const thumb = event.target.closest("img");
  if (!thumb) {
    return;
  }
  lightboxImg.src = thumb.src;
  lightboxImg.alt = thumb.alt;
  lightboxGallery.querySelectorAll("img").forEach(function (i) {
    i.classList.toggle("active", i === thumb);
  });
});

// Stäng med krysset
lightboxClose.addEventListener("click", closeLightbox);

// Stäng när man klickar utanför rutan
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
