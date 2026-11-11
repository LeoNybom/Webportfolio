// Projektkarusell: visar tre kort åt gången (ett på mobil) och loopar runt.
// Originalkorten sparas undan dolda; karusellen visar kopior av dem.
(function () {
  const viewport = document.querySelector(".project-card");
  if (!viewport) {
    return;
  }

  const GAP = 20; // avstånd mellan korten i px, samma som i CSS

  const originals = Array.from(viewport.querySelectorAll(".projectitem"));
  const store = document.createElement("div");
  store.hidden = true;
  originals.forEach(function (card) {
    store.appendChild(card);
  });

  viewport.classList.add("carousel");
  const track = document.createElement("div");
  track.className = "carousel-track";
  viewport.append(track, store);

  // Ram runt karusellen så att pilarna kan ligga på var sida om korten
  const wrap = document.createElement("div");
  wrap.className = "carousel-wrap";
  viewport.before(wrap);
  wrap.appendChild(viewport);
  wrap.insertAdjacentHTML(
    "beforeend",
    '<button class="carousel-arrow carousel-prev" type="button" aria-label="Föregående projekt"><i class="fa-solid fa-chevron-left"></i></button>' +
      '<button class="carousel-arrow carousel-next" type="button" aria-label="Nästa projekt"><i class="fa-solid fa-chevron-right"></i></button>'
  );

  // Prickar under korten
  const nav = document.createElement("div");
  nav.className = "carousel-nav";
  nav.innerHTML = '<div class="carousel-dots"></div>';
  wrap.after(nav);
  const dotsBox = nav.querySelector(".carousel-dots");

  let count = 0; // antal kort efter filtrering
  let pos = 0; // index i spåret för första kortet i fokus
  let busy = false;

  function perView() {
    return window.innerWidth < 768 ? 1 : 3;
  }

  function loops() {
    return count > perView();
  }

  function activeFilter() {
    const button = document.querySelector(".filter-btn.active");
    return button ? button.dataset.filter : "alla";
  }

  // Bygger spåret. Med loop läggs tre kopior av korten i rad,
  // så att karusellen kan hoppa tillbaka till mitten utan att det syns.
  function build() {
    const filter = activeFilter();
    const cards = originals.filter(function (card) {
      return filter === "alla" || card.dataset.category === filter;
    });
    count = cards.length;

    track.innerHTML = "";
    const copies = loops() ? 3 : 1;
    for (let k = 0; k < copies; k++) {
      cards.forEach(function (card) {
        const copy = card.cloneNode(true);
        copy.classList.remove("hidden");
        track.appendChild(copy);
      });
    }

    pos = loops() ? count : 0;
    layout(false);
  }

  function layout(animate) {
    const visible = perView();
    const width = (viewport.clientWidth - GAP * (visible - 1)) / visible;

    track.classList.toggle("no-anim", !animate);
    Array.from(track.children).forEach(function (card, i) {
      const rel = i - pos;
      card.style.width = width + "px";
      card.classList.toggle("offscreen", rel < 0 || rel >= visible);
    });
    track.style.transform = "translateX(" + -pos * (width + GAP) + "px)";

    if (!animate) {
      void track.offsetWidth; // rita om innan animationerna slås på igen
      track.classList.remove("no-anim");
    }

    // En prick per kort, de som är i fokus är tända
    const first = ((pos % count) + count) % count;
    dotsBox.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot" + ((i - first + count) % count < visible ? " active" : "");
      dot.setAttribute("aria-label", "Visa projekt " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(count + i);
      });
      dotsBox.appendChild(dot);
    }

    nav.classList.toggle("hidden", !loops());
    wrap.classList.toggle("no-loop", !loops());
  }

  function goTo(target) {
    if (busy || !loops() || target === pos) {
      return;
    }
    busy = true;
    pos = target;
    layout(true);

    setTimeout(function () {
      // Utanför mittenkopian: hoppa en hel kopia tillbaka, utan animation
      if (pos >= 2 * count) {
        pos -= count;
        layout(false);
      } else if (pos < count) {
        pos += count;
        layout(false);
      }
      busy = false;
    }, 520);
  }

  wrap.querySelector(".carousel-prev").addEventListener("click", function () {
    goTo(pos - 1);
  });
  wrap.querySelector(".carousel-next").addEventListener("click", function () {
    goTo(pos + 1);
  });

  // Svep på mobil
  let touchX = null;
  track.addEventListener(
    "touchstart",
    function (event) {
      touchX = event.touches[0].clientX;
    },
    { passive: true }
  );
  track.addEventListener("touchend", function (event) {
    if (touchX === null) {
      return;
    }
    const dx = event.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) {
      goTo(pos + (dx < 0 ? 1 : -1));
    }
    touchX = null;
  });

  // Nytt filter: bygg om karusellen från första kortet
  document.querySelectorAll(".filter-btn").forEach(function (button) {
    button.addEventListener("click", build);
  });

  window.addEventListener("resize", function () {
    layout(false);
  });

  build();
})();
