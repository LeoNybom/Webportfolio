const submitBtn = document.querySelector('button[type="submit"]');
const form = document.querySelector('form');

submitBtn.addEventListener('click', function(e){
  e.preventDefault();

  if (!form.checkValidity()) {
      Swal.fire({
        title: 'Valideringsfel!',
        text: 'Vänligen fyll i alla fält korrekt.',
        icon: 'error',
        customClass: {
          popup: 'my-alert-popup',
          title: 'my-alert-title',
          htmlContainer: 'my-alert-text'
        }
      });
      return;
  }

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    Swal.fire({
      title: 'Meddelande skickat!',
      text: 'Tack för ditt meddelande.',
      icon: 'success',
      customClass: {
        popup: 'my-alert-popup',
        title: 'my-alert-title',
        htmlContainer: 'my-alert-text'
      }
    });
    form.reset();
  })
  .catch(error => {
    Swal.fire({
      title: 'Fel!',
      text: 'Det uppstod ett fel när meddelandet skickades.',
      icon: 'error',
      customClass: {
        popup: 'my-alert-popup',
        title: 'my-alert-title'
      }
    });
  });
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}