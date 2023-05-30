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
  renderTides(data);
}

function renderWeather(data) {
  const date = new Date();

  // render current weather
  const currentWeatherLocation = document.querySelector("#location");
  const currentWeatherTemp = document.querySelector("#temperature");
  const currentWeatherCondition = document.querySelector("#conditions");
  const currentWeather = data.forecast.forecastday[0].hour[date.getHours()];
  currentWeatherLocation.innerText = `${data.location.name}`;
  currentWeatherTemp.innerText = `${currentWeather.temp_f} F`;
  currentWeatherCondition.innerText = `${currentWeather.condition.text}`;
}

function renderTides(data) {
  const currentTidalData = document.querySelector("#tide-root");
  const tideData = data.forecast.forecastday[0].day.tides[0].tide;
  tideData.forEach((tide) => {
    const time = tide.tide_time;
    const status = tide.tide_type;
    console.log(`The tide is ${status} at ${time}.`);
  });
}

// local weather on page load
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
