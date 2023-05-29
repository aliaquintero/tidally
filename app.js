"use strict";

const key = "4e1c8a419e1b49e4b92171950232605";
const userQuery = document.querySelector("#search");
const form = document.querySelector("#search-form");
const currentWeatherLocation = document.querySelector(
  "#current-weather__location"
);
const currentWeatherTemp = document.querySelector(
  "#current-weather__temperature"
);
const currentWeatherCondition = document.querySelector(
  "#current-weather__conditions"
);
const currentTide = document.querySelector("#current-tide");
const prevTide = document.querySelector("#prev-tide");
const nextTide = document.querySelector("#next-tide");

async function getWeather() {
  const date = new Date();

  const response = await fetch(
    `https://api.weatherapi.com/v1/marine.json?key=${key}&q=${userQuery.value}&tides=yes`
  );
  const marineData = await response.json();

  // retrieves tidal data
  const tideData = marineData.forecast.forecastday[0].day.tides[0].tide;
  console.log(tideData);
  // retrieves current weather status
  const currentWeather =
    marineData.forecast.forecastday[0].hour[date.getHours()];

  // displays data in dom
  currentWeatherLocation.innerText = `${marineData.location.name}`;
  currentWeatherTemp.innerText = `${currentWeather.temp_f} F`;
  currentWeatherCondition.innerText = `${currentWeather.condition.text}`;
  // currentTide.innerText = `The tide is: [rising/falling]`;
  // prevTide.innerText = `Previous tide: [high/low] `;
  // nextTide.innerText = `Next tide: [high/low]`;
}
// current location weather
window.addEventListener("load", (e) => {
  userQuery.value = "auto:ip";
  getWeather();
  userQuery.value = "";
});

// search location weather
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather();
  userQuery.value = "";
});
