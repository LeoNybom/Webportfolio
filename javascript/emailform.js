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