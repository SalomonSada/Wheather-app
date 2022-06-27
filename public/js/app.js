const wheaterForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');
const img1 = document.querySelector('#img-1');

wheaterForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevents the page to refresh when the form is submited

  const location = searchInput.value;
  message1.textContent = 'Loading...';
  message2.textContent = '';
  message3.textContent = '';
  img1.src = '';
  fetch(`http://localhost:3000/weather?adress=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = 'Location: ' + data.location;
        message2.textContent =
          'temperature: ' +
          data.forecast.temperature +
          ', Feels like: ' +
          data.forecast.feelslike;
        message3.textContent =
          'Description: ' + data.forecast.weather_descriptions;
        img1.src = data.forecast.weather_icons;
      }
    });
  });
});

message1.textContent = '';
