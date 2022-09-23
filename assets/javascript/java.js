

const fiveDayForecast = document.querySelector("#fiveDayForecast")
const cityHeader = document.querySelector("#cityHeader")
const todayImage = document.querySelector("#todayImage")
const allForecastSection = document.querySelector(".allForecastSection")
const currentDay = document.querySelector(".currentDay")
const savedCities = document.querySelector(".savedCities")
const currentCity1 = document.querySelector(".currentCity1")
const currentCity2 = document.querySelector(".currentCity2")
const currentCity3 = document.querySelector(".currentCity3")
const currentCity4 = document.querySelector(".currentCity4")
let buttonClick = document.querySelector(".buttonClick")
let todayDate = moment().format("MM/DD/YYYY")
let data = {}
let lat = 0
let lon = 0
const searchButton = document.querySelector("#searchButton")
let APIKey = "760cf2cb8384d528a5a88838db036b6a"
let city = "Gahanna"

let queryURL = "";
let tomorrowDate = []



const fetchFunction = function () {
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`)
    .then(function (response) {

      return response.json();
    })
    .then(function (data) {
      lat = data[0].lat
      lon = data[0].lon
      queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
      fetch(queryURL)
        .then(function (response) {
          return response.json();
        }).then(function (data) {
          let cityArray1 = []
          if (cityArray.length === 0) {
            cityArray.push(data.city.name)
            cityArray1 = document.createElement("button")
            savedCities.appendChild(cityArray1)
            cityArray1.textContent = data.city.name
            cityArray1.setAttribute("class", "buttonClick")
            localStorage.setItem("input1", cityArray)
          } else {
            let something = false
            for (i = 0; i < cityArray.length; i++) {
              if (cityArray[i] === data.city.name) {
                something = true

              } else {
              }
            }
            if (something === false) {
              cityArray.push(data.city.name)
              cityArray1 = document.createElement("button")
              savedCities.appendChild(cityArray1)
              cityArray1.textContent = data.city.name
              cityArray1.setAttribute("class", "buttonClick")
              localStorage.setItem("input1", cityArray)

            }
          }

          cityHeader.textContent = `${data.city.name} ${todayDate}`
          todayImage.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
          currentCity1.textContent = `Temp: ${data.list[0].main.temp} °F`
          currentCity2.textContent = `Wind: ${data.list[0].wind.speed} MPH`
          currentCity3.textContent = `Humidity: ${data.list[0].main.humidity}`
          currentCity4.textContent = `Feels like: ${data.list[0].main.feels_like} °F`
          if (data.list[0].main.feels_like > 80) {
            currentCity4.setAttribute("class", "currentCity4 red")
          } else if (data.list[0].main.feels_like < 50) {
            currentCity4.setAttribute("class", "currentCity4 blue")
          } else {
            currentCity4.setAttribute("class", "currentCity4 green")
          }

          for (i = 1; i < 6; i++) {

            tomorrowDate[i] = moment().add(i, 'days').format("MM/DD/YYYY")

            fiveDayForecast.children[i - 1].children[0].textContent = tomorrowDate[i]
            fiveDayForecast.children[i - 1].children[1].src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
            fiveDayForecast.children[i - 1].children[2].textContent = `Temp: ${data.list[i].main.temp} °F`
            fiveDayForecast.children[i - 1].children[3].textContent = `Wind: ${data.list[i].wind.speed} MPH`
            fiveDayForecast.children[i - 1].children[4].textContent = `Humidity: ${data.list[i].main.humidity}`
          }
        })
    })

}

let cityArray = []
const testFunction = function () {
  allForecastSection.setAttribute("style", "visibility: visible;")
  currentDay.setAttribute("style", "visibility: visible;")

  city = document.querySelector("#citySearchInput").value

  queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
  fetchFunction()

}


function renderLastRegistered() {
  let storageGetting = localStorage.getItem("input1")
  let storageArray = storageGetting.split(",")
  let appendedArray = []
  for (i = 0; i < storageArray.length; i++) {
    appendedArray = document.createElement("button")
    savedCities.appendChild(appendedArray)
    appendedArray.textContent = storageArray[i]
    appendedArray.setAttribute("class", "buttonClick")
  }
}
if (localStorage.getItem("input1")){
  renderLastRegistered()
}

$(document).on("click", '.buttonClick', function () {
  allForecastSection.setAttribute("style", "visibility: visible;")
  currentDay.setAttribute("style", "visibility: visible;")
  city = this.textContent
  cityArray.push(city)
  fetchFunction()
})


searchButton.addEventListener("click", testFunction)





