// state
let currCity = "Enugu"
let units = "metric"

// Selectors
let city = document.querySelector(".weather-city")
let datetime = document.querySelector(".datetime")
let weatherForecast = document.querySelector(".forecast")
let weatherIcon = document.querySelector(".weather-icon")
let weatherTemperature = document.querySelector(".weather-temperature")
let weatherMinMax = document.querySelector(".weather-minmax")
let weatherRealFeel = document.querySelector(".weather-realfeel")
let weatherHumidity = document.querySelector(".weather-humidity")
let weatherWind = document.querySelector(".weather-wind")
let weatherPressure = document.querySelector(".weather-pressure")

// input search 
document.querySelector(".weather-search").addEventListener("submit", e => {
  e.preventDefault()
  let searchInput = document.querySelector(".weather-searchform")

  currCity = searchInput.value

  // get weather data
  getWeather()

  // clear form 
  searchInput.value = ""
})

// units
document.querySelector(".weather-unit-celsius").addEventListener("click", () => {
  if(units !== "metric") {
    units = "metric"

    // get weather forecast
    getWeather()
  }
})

document.querySelector(".weather-unit-farenheit").addEventListener("click", () => {
  if(units !== "imperial") {
    units = "imperial"

    // get weather forecast
    getWeather()
  }
})

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

// convert country code to name
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(["en"], {type : "region"})
  return regionNames.of(country)
}


function getWeather() {
  const API_KEY = "19642223b40322b9e46807c9b95d95b0"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`

  fetch(url).then(res => res.json()).then(data => {
    console.log(data);
    
    // Print/Display on UI
    city.innerHTML = `${data.name},${convertCountryCode(data.sys.country)}`
    datetime.innerHTML = convertTimeStamp(data.dt, data.timezone)
    weatherForecast.innerHTML = `<p>${data.weather[0].main}</p>`
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`
    weatherTemperature.innerHTML = `${data.main.temp.toFixed()}&#176`
    weatherMinMax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p>
    <p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
    weatherRealFeel.innerHTML = `<p>${data.main.feels_like.toFixed()}&#176</p>`
    weatherHumidity.innerHTML = `<p>${data.main.humidity}%</p>`
    weatherWind.innerHTML = `<p>${data.wind.speed}${units === "imperial" ? "mph" : "m/s"}</p>`
    weatherPressure.innerHTML = `<p>${data.main.pressure}hpa</p>`
  })
}

document.body.addEventListener("load", getWeather())






// Get weather report
// function getWeather() {
//   let city = cityInput.value
//   let apikey = "19642223b40322b9e46807c9b95d95b0"
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

//   fetch(url).then(function(response) {
//     return response.json()
//   }).then(function(data) {
//     console.log(data);
    
//     // let temperature = data.main.temp
//     // let humidity = data.main.humidity
//     // let nameOfCity = data.name
//   })
// }

// getWeather()

// async function getWeather() {
//   try {
//     let city = cityInput.value
//     let apikey = "19642223b40322b9e46807c9b95d95b0"
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

//     let response = await fetch(url)
//     let data = await response.json()
    
//   }catch {
  
//   }
// }