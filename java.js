
// let toDelete = document.querySelector(".toDelete")
// let allDivs = document.getElementsByTagName("div")
// let allImgs = document.getElementsByTagName("img")
const fiveDayForecast = document.querySelector("#fiveDayForecast")
const cityHeader = document.querySelector("#cityHeader")
const todayImage = document.querySelector("#todayImage")
const savedCities = document.querySelector(".savedCities")
const currentCity1 = document.querySelector(".currentCity1")
const currentCity2 = document.querySelector(".currentCity2")
const currentCity3 = document.querySelector(".currentCity3")
const currentCity4 = document.querySelector(".currentCity4")
let todayDate = moment().format("MM/DD/YYYY")
let data = {}
let lat = 0
let lon = 0
const searchButton = document.querySelector("#searchButton")
let APIKey = "760cf2cb8384d528a5a88838db036b6a"
let city = "Gahanna"

// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey+ "&units=imperial";
let queryURL = "";
let tomorrowDate = []

// console.log(fiveDayForecast.children[0].children[0])



const fetchFunction = function () {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`)
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
            console.log("once")
            cityArray1 = document.createElement("button")
                savedCities.appendChild(cityArray1)
                cityArray1.textContent = data.city.name
                cityArray1.setAttribute("class", "buttonClick")
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
              console.log("only pushing")
              

                cityArray1 = document.createElement("button")
                savedCities.appendChild(cityArray1)
                cityArray1.textContent = data.city.name
                cityArray1.setAttribute("class", "buttonClick")
              
            }
          }

          console.log(cityArray)

          cityHeader.textContent = `${data.city.name} ${todayDate}`
          todayImage.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
          currentCity1.textContent = `Temp: ${data.list[0].main.temp} °F`
          currentCity2.textContent = `Wind: ${data.list[0].wind.speed} MPH`
          currentCity3.textContent = `Humidity: ${data.list[0].main.humidity}`
          currentCity4.textContent = `Feels like: ${data.list[0].main.feels_like}`

          for (i = 1; i < 6; i++) {

            tomorrowDate[i] = moment().add(i, 'days').format("MM/DD/YYYY")

            fiveDayForecast.children[i - 1].children[0].textContent = tomorrowDate[i]
            fiveDayForecast.children[i - 1].children[1].src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
            fiveDayForecast.children[i - 1].children[2].textContent = `Temp: ${data.list[i].main.temp} °F`
            fiveDayForecast.children[i - 1].children[3].textContent = `Wind: ${data.list[i].wind.speed} MPH`
            fiveDayForecast.children[i - 1].children[4].textContent = `Humidity: ${data.list[i].main.humidity}`





            // section[i] = document.createElement("section")
            // section[i].setAttribute("class", "toDelete")
            // img[i] = document.createElement("img")
            // fiveDayForecast.appendChild(section[i])
            // section[i].appendChild(img[i])
            // for (j = 0; j < 4; j++) {
            //   div[j] = document.createElement("div")

            //   section[i].appendChild(div[j])
            // }
            // div[0].textContent = tomorrowDate[i]
            // img[i].src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png` 
            // div[1].textContent = `Temp: ${data.list[i].main.temp} °F`
            // div[2].textContent = `Wind: ${data.list[i].wind.speed} MPH`
            // div[3].textContent = `Humidity: ${data.list[i].main.humidity}`



          }

        })
    })
}


let cityArray = []
const testFunction = function () {
  // allDivs = document.getElementsByTagName("div")
  // allImgs = document.getElementsByTagName("img")
  // allImgs = document.getElementsByTagName("img")
  // toDelete = document.querySelector(".toDelete")
  // if (toDelete){
  //   console.log(toDelete.length)
  //   toDelete.remove()
  // }
  // for (k = 0; k < allDivs.length; k++){
  //   allDivs[k].remove()
  // }
  // for (k = 0; k < allImgs.length; k++){
  //   allImgs[k].remove()
  // }



  city = document.querySelector("#citySearchInput").value
  // console.log(city)
  queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
  fetchFunction()
  // for (i = 0; i < paragraph.length; i++) {
  //   if (paragraph[i] === city) {

  //   } else {
  //     paragraph.push(city)
  //   }

  // }
  // if (paragraph.length === 0) {
  //   paragraph.push(city)
  // }
  // console.log(data.city.name)
  // console.log(paragraph)
  // paragraph[city] = document.createElement("p")
  // savedCities.appendChild(paragraph[city])
  // paragraph[city].textContent = city


}



searchButton.addEventListener("click", testFunction)






// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=APIkey