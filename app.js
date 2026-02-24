const apiKey = "bffbdb9e713495ff40a7a924f8f03cbe"; 



function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  fetchWeather(city);
}

function getWeatherByLocation() {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherByCoords(lat, lon);
  });
}

function fetchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => displayWeather(data));
}

function fetchWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => displayWeather(data));
}

function displayWeather(data) {
  const cityName = data.city.name;
  const current = data.list[0];

  document.getElementById("cityName").innerText = cityName;
  document.getElementById("temperature").innerText = `${current.main.temp}°C`;
  document.getElementById("description").innerText = current.weather[0].description;

  const iconCode = current.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.getElementById("weatherIcon").innerHTML = `<img src="${iconUrl}" />`;

  displayForecast(data.list);
}

function displayForecast(list) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";

  for (let i = 8; i < 48; i += 8) {
    const day = list[i];
    const date = new Date(day.dt_txt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

    const iconCode = day.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    forecastContainer.innerHTML += `
      <div class="forecast-day">
        <h4>${dayName}</h4>
        <img src="${iconUrl}" />
        <p>${day.main.temp}°C</p>
      </div>
    `;
  }
}
