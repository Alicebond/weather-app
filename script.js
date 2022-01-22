"use strict";

function init() {
  function getCityName() {
    let cityName = document.querySelector('#search').value
    return cityName;
  }

  async function getWeatherData() {
    let cityName = getCityName();
    if (!cityName) cityName = 'Tokyo';
    let APIkey = '19abc771b03351a5a71843b28da01d91';
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`)

    let data = await response.json();
    showWeather(data);
  }

  function process(data) {
    let temp = Math.round(+data.main.temp - 273.15);
    let feelsLike = Math.round(+data.main.feels_like - 273.15);
    let city = data.name;
    let country = data.sys.country;
    let weather = data.weather[0].main;
    let weatherDescription = data.weather[0].description;
    let windSpeed = data.wind.speed;
    let windDeg = data.wind.deg;
    return {
      temp,
      feelsLike,
      city,
      country,
      weather,
      weatherDescription,
      windSpeed,
      windDeg,
    }
  }

  function showWeather(data) {
    let processed = process(data)
    document.querySelector('.city').textContent = processed.city;
    document.querySelector('.country').textContent = processed.country;
    document.querySelector('.weather').textContent = processed.weather;
    document.querySelector('.temp').textContent = processed.temp + '°C';
    getImg(processed.weather + 'sky');
  }

  async function getImg(searchValue) {
    let response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=ueKHssLhrxbcU8gyzQERBxqDvswgkHiP&s=${searchValue}`
    )
    let imgData = await response.json();
    let url = imgData.data.images.original.url;

    document.querySelector('.container').style.backgroundImage = 'url(' + `${url}` + ')';
  }

  window.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (e.key === 'Enter') searchBtn.click();
  })

  let searchBtn = document.querySelector('#search-btn');
  searchBtn.addEventListener('click', getWeatherData);

  getWeatherData()
}

init();
