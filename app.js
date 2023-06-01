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
  const today = new Date();

  // render current weather
  const currentWeatherLocation = document.querySelector("#location");
  const currentWeatherTemp = document.querySelector("#temperature");
  const currentWeatherCondition = document.querySelector("#conditions");
  const currentWeather = data.forecast.forecastday[0].hour[today.getHours()];
  currentWeatherLocation.innerText = `${data.location.name}`;
  currentWeatherTemp.innerText = `${currentWeather.temp_f} F`;
  currentWeatherCondition.innerText = `${currentWeather.condition.text}`;
}

function renderTides(data) {
  const currentTime = new Date();
  const tideData = data.forecast.forecastday[0].day.tides[0].tide;

  if (!tideData) {
    console.log("No tide data available");
    return;
  }

  const tides = tideData.map((tide) => ({
    time: new Date(tide.tide_time),
    type: tide.tide_type,
  }));

  let prevTide = null;
  let nextTide = null;

  // find previous and next tides
  for (let i = 0; i < tides.length; i++) {
    const tide = tides[i];
    if (tide.time < currentTime) {
      prevTide = tide;
    } else {
      nextTide = tide;
      break;
    }
  }

  if (prevTide && nextTide) {
    const tideStatus = prevTide.type === "HIGH" ? "falling" : "rising";
    console.log(`The tide is ${tideStatus}`);
    console.log("Previous Tide:", prevTide.type);
    console.log("Next Tide:", nextTide.type);
  } else if (!prevTide && nextTide) {
    console.log("No data for previous tide");
    console.log("Next Tide:", nextTide.type);
  } else if (prevTide && !nextTide) {
    console.log("Previous Tide:", prevTide.type);
    console.log("No data for next tide");
  } else {
    console.log("Tide data is insufficient.");
  }
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
