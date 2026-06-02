const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "13bc2c57dcb78c2e6a5d1191eb9d5e8a";
const city = "Stockholm";

const updateWeather = () => {
    const weatherInfo = document.getElementById("weatherInfo");

    if (!weatherInfo) {
        return;
    }

    weatherInfo.classList.add("weather-widget");

    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=sv`;

    fetch(url)
    .then((response)=>{
        if(!response.ok){
            throw new Error("Nätverksrespons var inte ok");
        }
        return response.json();
    })
    .then((data) => {
        const temperature = Math.round(data.main.temp);
        const location = data.name;

        weatherInfo.innerHTML = `
            <p class="weather-location">${location}</p>
            <p class="weather-temp">${temperature}°C</p>
        `;
    })
    .catch((error) => {
      console.error("Det gick inte att hämta väderdata:", error);
      weatherInfo.textContent = "Kunde inte hämta vädret just nu.";
    });
};

window.addEventListener("DOMContentLoaded", updateWeather);
