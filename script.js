const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {

   const resp = await fetch(url(city), { origin: "cors" });
   const respData = await resp.json();

   console.log(respData);

   addWeatherToPage(respData);
   updateProperties(respData);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}
function updateProperties(data) {
   const humidityEl = document.getElementById("humidityValue");
   const humidity = data.weather[0].description;
   humidityEl.innerHTML = humidity;

   const airPressureEl = document.getElementById("airPressureValue");
   const airPressure = data.main.pressure;
   airPressureEl.innerHTML = airPressure;

   const gustEl = document.getElementById("gustValue");
   const gust = data.wind.gust;
   gustEl.innerHTML = gust;

   const windSpeedEl = document.getElementById("windSpeedValue");
   const windSpeed = data.wind.speed;
   windSpeedEl.innerHTML = windSpeed;

   const cityEl = document.getElementById("cityDiv");
   const city = data.name;
   cityEl.innerHTML = city;

   const longitudeEl = document.getElementById("longitude");
   const longitude = data.coord.lon;
   longitudeEl.innerHTML = longitude;

   const latitudeEl = document.getElementById("latitude");
   const latitude = data.coord.lat;
   latitudeEl.innerHTML = latitude;

   const countryEl = document.getElementById("country");
   const country = data.sys.country;
   countryEl.innerHTML = country;

   const timezoneEl = document.getElementById("timezone");
   const timezone = data.timezone;
   timezoneEl.innerHTML = timezone;

   const minTempEl = document.getElementById("minTemp");
   const min = data.main.temp_min;
   minTempEl.innerHTML = min;

   const maxTempEl = document.getElementById("maxTemp");
   const max = data.main.temp_max;
   maxTempEl.innerHTML = max;

}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }

   search.value = "";
});



// console.log the respData and observe the api data