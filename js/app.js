const API_KEY = '9071a61b53d2043421d4d7e8c553959c';

// Divide URL in code with variables:
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

const countriesData = {
  chile: ['santiago', 'valdivia', 'puerto montt'],
  colombia: ['cali', 'bogota', 'medellin']
};

const container = document.querySelector('.container-weather');

/* Draws countries */
function populateCountries(countrySelect) {
  let keys = Object.keys(countriesData);
  for (let i = 0; i < keys.length; i++) {
    const element = keys[i];
    let option = document.createElement('option');
    option.value = element;
    option.innerHTML = element;
    countrySelect.appendChild(option);
  }
}

/* Connects to the API and retrieves data */
const getWeather = async (locate) => {
  return new Promise((resolve, reject) => {
    console.log(`${WEATHER_URL}?q=${locate}&APPID=${API_KEY}`);
    axios.get(`${WEATHER_URL}?q=${locate}&APPID=${API_KEY}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
  });
}

/* Populates a container with data = response */
const render = (data) => {
  // Destructuring
  let { weather: [{ description: firstValue }] } = data.data;
  console.log('data.data using destructuring:', firstValue);

  /* Update location thumbnail */
  let photo = '';
  
  if (data.data.name == 'Santiago') {
    photo = '../images/chile-santiago.jpg';
  }
  if (data.data.name == 'Valdivia') {
    photo = '../images/chile-valdivia.jpeg';
  }
  if (data.data.name == 'Port Montt') {
    photo = '../images/chile-puerto-montt.jpg';
  }
  if (data.data.name == 'Santiago de Cali') {
    photo = '../images/colombia-cali.jpg';
  }
  if (data.data.name == 'Bogota') {
    photo = '../images/colombia-bogota.jpg';
  }
  if (data.data.name == 'Medellín') {
    photo = '../images/colombia-medellin.jpeg';
  }

  /* Converts degrees */
  const fahrenheitTemp = data.data.main.temp;

  celsiusTemp = 0;

  function convertToCelsius(fahrenheit) {
    celsiusTemp = Math.round((fahrenheitTemp - 32) * (5/9) * 100) / 100;
    return celsiusTemp;
  }

  convertToCelsius(fahrenheitTemp);

  container.innerHTML =`
  <div class="weather">
  <img class="thumbnail" src="${photo}" alt="the best web in the world" height="150" width="150"></img>
  <p class="highlight">${data.data.name}:</p>
  <p class="highlight">Status: <em>${firstValue}</em></p>
  <p class="highlight">Temperature: <em>${data.data.main.temp} °F</em> / <em>${celsiusTemp} °C</em></p>
  </div>
  `;
};

/* Cleans up both select controls */
function removeOptions(select) {
  select.options.length = 0;
}

/* Draws regions */
function populateRegions(regionSelect, regions) {
  let option = document.createElement('option');
  option.value = '';
  option.innerHTML = 'Escoge tu región';
  regionSelect.appendChild(option);
  for (let i = 0; i < regions.length; i++) {
    const element = regions[i];
    option = document.createElement('option');
    option.value = element;
    option.innerHTML = element;
    regionSelect.appendChild(option);
  }
}

/* Changes regions */
function changeRegions(countrySelected) {
  const regionSelect = document.getElementById('regionsId');
  const regionsData = countriesData[countrySelected];
  removeOptions(regionSelect);
  populateRegions(regionSelect, regionsData);
}

function searchAgain() {
  const div = document.getElementById('contentId');
  div.innerHTML = `
  <form>
    <select id="countriesId">
      <option value="" selected disabled hidden>Escoge el país</option>
    </select>
    <select id="regionsId">
      <option value="" selected disabled hidden>Escoge tu región</option>
    </select>
  </form>`;
  const countrySelect = document.getElementById('countriesId');
  populateCountries(countrySelect);
  //agregamos event en el form
  countrySelect.addEventListener('change', (event) => {
    changeRegions(event.target.value);
  });
}

function search() {
  // llamar api para obtener coordenadas F
  // llamar a api para obtener clima en base a coordenadas F
  // crear nuestro string template <div>${temperatura}</div> F
  // reemplazar el div del form por el div del resultado F
  // agregar evento a botón buscar de nuevo F
}

/* Gets the requested region */
function obtainRegion() {
  const regionSelect = document.getElementById('regionsId');
  regionSelect.addEventListener('change', (e) => {
    let locate = e.target.value;
    getWeather(locate)
      .then((data) => {
        render(data);
      })
      .catch((error) => {
        alert(error);
      })
  });
}

/* Main */
function main() {
  // populamos countries
  const countrySelect = document.getElementById('countriesId');
  populateCountries(countrySelect);
  //agregamos event en el form
  countrySelect.addEventListener('change', (event) => {
    changeRegions(event.target.value);
    console.log('event: ', event.target.value); // chile or colombia
  });
  // agregamos evento al buscar
  obtainRegion();
  console.log(countrySelect);
}

window.onload = () => {
  main();
}
