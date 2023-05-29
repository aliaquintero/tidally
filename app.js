"use strict";

const key = "4e1c8a419e1b49e4b92171950232605";
const userQuery = document.querySelector("#search");
const form = document.querySelector("#search-form");

async function getWeather() {
  const response = await fetch(
    `https://api.weatherapi.com/v1/marine.json?key=${key}&q=${userQuery.value}&tides=yes`
  );
  const data = await response.json();
  renderWeather(data);
}

function renderWeather(data) {
  const date = new Date();

  // current weather forecast
  const currentWeatherLocation = document.querySelector("#location");
  const currentWeatherTemp = document.querySelector("#temperature");
  const currentWeatherCondition = document.querySelector("#conditions");
  let currentWeather = data.forecast.forecastday[0].hour[date.getHours()];
  currentWeatherLocation.innerText = `${data.location.name}`;
  currentWeatherTemp.innerText = `${currentWeather.temp_f} F`;
  currentWeatherCondition.innerText = `${currentWeather.condition.text}`;
  // current tidal weather
  // const currentTide = document.querySelector("#current-tide");
  // const prevTide = document.querySelector("#prev-tide");
  // const nextTide = document.querySelector("#next-tide");
  tideData = data.forecast.forecastday[0].day.tides[0].tide;
}

// geolocation weather on page load
window.addEventListener("load", (e) => {
  userQuery.value = "auto:ip";
  getWeather();
  form.reset();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather();
  form.reset();
});
