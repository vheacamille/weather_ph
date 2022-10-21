class OpenWeather {
    
    constructor() {
        // do not place it here!
        this.appId = '28a4544fe4e6601bf922bff69055342e';
        this.limit = 1;
    }

    async getWeather(cityName, countryCode) {
        const coordinates = await this.getCoordinates(cityName, countryCode);

        if(coordinates === '') {
            return '';
        }

        const lat = coordinates.lat;
        const lon = coordinates.lon;

        console.log(lat);
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.appId}`);

        const jsonResult = await result.json();

        if(jsonResult === '' || jsonResult.cod === '400') {
            return '';
        }

        const weatherInfo = jsonResult.weather[0];

        return {
            weather : weatherInfo.main,
            description : weatherInfo.description,
            iconCode: weatherInfo.icon
        };
    }

    // async getWeather(lat, lon) {
    //     const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.appId}`);

    //     const jsonResult = await result.json();
    //     const weatherInfo = jsonResult.weather[0];

    //     return {
    //         weather : weatherInfo.main,
    //         description : weatherInfo.description
    //     };
    // }
    
    async getCoordinates(cityName, countryCode) {
        const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=${this.limit}&appid=${this.appId}`);

        const jsonResult = await result.json();

        if(jsonResult.length <= 0) {
            return '';
        }

        const firstResult = jsonResult[0];

        return {
            lat : firstResult.lat,
            lon : firstResult.lon
        };
    }
}