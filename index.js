let form = document.getElementById("weather-form")
let cityInput = document.getElementById("city-input")

let unitC = document.getElementById("unit-c")
let unitF = document.getElementById("unit-f")
let cityName = document.getElementById("city-name")
let cityDateTime = document.getElementById("city-datetime")
let cityForecast = document.getElementById("forecast")
let cityImage = document.getElementById("weather-icon")
let cityTempRange = document.getElementById("weather-temp-range")
let cityTempMin = document.getElementById("weather-min")
let cityTempMax = document.getElementById("weather-max")
let cityRealFeel = document.getElementById("weather-realfeel")
let cityHumidity = document.getElementById("weather-humidity")
let cityWind = document.getElementById("weather-wind")
let cityPressure = document.getElementById("weather-pressure")


const API_KEY = "19642223b40322b9e46807c9b95d95b0"
let currentCity = "Enugu"
let currentUnit = "metric"

// convert timestamp and timezone
function convertTimeStamp(timestamp, timezone) {
  // convert seconds to hours
  const convertTimezone = timezone / 3600
  const date = new Date(timestamp * 1000)

  const options = {
    weekday : "long",
    day : "numeric",
    month : "long",
    year : "numeric",
    hour : "numeric",
    minute : "numeric",
    timeZone : `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
    Hour12 : true
  }

  return date.toLocaleString("en-US", options)
}

// Convert country code
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(["en"], {type : "region"})
  return regionNames.of(country)
}

// Change units
// Change to Celsius
unitC.addEventListener("click", () => {
  if(currentUnit !== "metric") {
    currentUnit = "metric"

    // get weather data
    getWeather(currentCity)
  }
});

// Change to Fahrenheit
unitF.addEventListener("click", () => {
  if (currentUnit !== "imperial") {
    currentUnit = "imperial"

    // get weather data
    getWeather(currentCity)
  } 
});


function isMetric() {
  return currentUnit === "metric"
}

function getTempSymbol() {
  return isMetric() ? " °C" : " °F"
}
function getWindSymbol() {
  return isMetric() ? "m/s" : "mph"
}

// Submit form
form.addEventListener("submit", function(e) {
  e.preventDefault()

  const city = cityInput.value.trim()

  if(!city) return

  currentCity = city

  // get weather data
  getWeather(city)

  // clear form
  cityInput.value = ""
})


async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${currentUnit}`

    const response = await fetch(url)

    if(!response.ok) {
      throw new Error("Network is not available");
    }
    
    const data = await response.json()

    updateUIData(data);

  } catch (error) {
    console.log(error);
  }

}

function updateUIData(data) {
  cityName.textContent = `${data.name},${convertCountryCode(data.sys.country)}`
  cityDateTime.textContent = convertTimeStamp(data.dt, data.timezone)
  cityForecast.textContent = `${data.weather[0].main}`
  cityImage.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
  cityTempRange.textContent = `${Math.round(data.main.temp)}${getTempSymbol()}`
  cityTempMin.textContent = `Min: ${Math.round(data.main.temp_min)}${getTempSymbol()}`
  cityTempMax.textContent = `Max: ${Math.round(data.main.temp_max)}${getTempSymbol()}`
  cityRealFeel.textContent = `${Math.round(data.main.feels_like)}${getTempSymbol()}`
  cityHumidity.textContent = `${data.main.humidity}%`
  cityWind.textContent = `${data.wind.speed}${getWindSymbol()}`
  cityPressure.textContent = `${data.main.pressure}hPa`
}

getWeather(currentCity)

