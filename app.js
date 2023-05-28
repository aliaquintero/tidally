const key = "4e1c8a419e1b49e4b92171950232605";
const userQuery = document.querySelector("#search");
const buttons = document.querySelectorAll("button");
// const userGeolocation = document.querySelector("#geolocation");
const currentWeatherResult = document.querySelector("#result");

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

  currentWeatherResult.innerText = `${marineData.location.name} is currently ${currentWeather.condition.text} with a temperature of ${currentWeather.temp_f} F.`;
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (button.classList.contains("geolocation")) {
      userQuery.value = "auto:ip";
    }
    getWeather();
    userQuery.value = "";
  });
});

// searchBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   getWeather();
//   userQuery.value = "";
// });

// userGeolocation.addEventListener("click", (e) => {
//   e.preventDefault();
//   userQuery.value = "auto:ip";
//   getWeather();
//   userQuery.value = "";
// });
