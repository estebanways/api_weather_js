
const API_KEY = 'askdasdkqwufim12oem12dqiciaskxsldqjwq';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const countriesData = {
  chile: ['santiago', 'valdivia', 'puerto montt'],
  colombia: ['cali', 'bogota', 'medellin']
}

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

async function getWeather() {
  return new Promise((resolve, reject) => {
    axios.get(`${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((response) => {
        console.log(response);
        resolve(response);
      });
  });
}

function removeOptions(select) {
  select.options.length = 0;
}

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

function main() {
  // populamos countries
  const countrySelect = document.getElementById('countriesId');
  populateCountries(countrySelect);
  //agregamos event en el form
  countrySelect.addEventListener('change', (event) => {
    changeRegions(event.target.value);
  });
  // agregamos evento al buscar
}

window.onload = () => {
  main();
}