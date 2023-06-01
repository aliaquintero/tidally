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
  const currentTime = new Date();
  const tides = [];
  const tideData = data.forecast.forecastday[0].day.tides[0].tide;
  tideData.forEach((tide) => {
    const tide_type = tide.tide_type;
    const tide_time = tide.tide_time;
    const tideTime = new Date(tide_time);
    tides.push({ time: tideTime, type: tide_type });
  });

  let prevTide = null;
  let nextTide = null;

  // find previous and next tides
  for (let i = 0; i < tides.length; i++) {
    if (tides[i].time < currentTime) {
      prevTide = tides[i];
    } else {
      nextTide = tides[i];
      break;
    }
  }
  if (prevTide && nextTide) {
    if (prevTide.type === "HIGH") {
      console.log("The tide is falling");
    } else if (prevTide.type === "LOW") {
      console.log("The tide is rising");
    }

    console.log("Previous Tide:", prevTide.type);
    console.log("Next Tide:", nextTide.type);
  } else if (!prevTide) {
    console.log("No data for previous tide");
    console.log("Next Tide:", nextTide.type);
  } else if (!nextTide) {
    console.log("Previous Tide:", prevTide.type);

    console.log("No data for next tide");
  } else {
    console.log("Not sufficient data. Sorry!");
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
