// const APIKey = "5796d926-4268-11ed-9c50-0242ac130002-5796d994-4268-11ed-9c50-0242ac130002";
// const inputVal = input.value;
// const url = `https://api.stormglass.io/v2/weather/point`;
const submitSearch = document.querySelector('#submit-search');
const weatherResults = document.querySelector('.weather-results');

submitSearch.addEventListener('submit', (e) => { 
    e.preventDefault();
    weatherResults.classList.add('visible');
})
