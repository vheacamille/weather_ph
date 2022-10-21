// Init OpenWeather
const openweather = new OpenWeather;

// Init UI
const ui = new UI;

const submitButton = document.querySelector('.btn-primary');
const cityField = document.querySelector('#city');
const countryField = document.querySelector('#country');

const countryName = countryField.value;

window.addEventListener('load', (e) => {
    const previousCity = localStorage.getItem('city').replaceAll('"','');

    if(previousCity !== '') {
        cityField.value = previousCity;

        getAndDisplayWeather(previousCity, countryName);
    }
});

function getAndDisplayWeather(cityName, countryName) {
    openweather.getWeather(cityName, countryName)
    .then(results => {
        if(results !== '') {
            ui.showResult(results);
        }
        else {
            ui.showAlert('We cannot find the city you entered. Perhaps it\'s not a city in the Philippines?');
        }
        
    });
}

submitButton.addEventListener('click', e => {
    const cityName = cityField.value;

    // openweather.getCoordinates(cityName, countryName)
    // .then(results => openweather.getWeather(results.lat, results.lon))
    // .then(weather => console.log(weather));

    getAndDisplayWeather(cityName, countryName);
    
    // Add to local storage
    addToLocalStorage('city', cityName);
});

function addToLocalStorage(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
}
