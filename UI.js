class UI {
    constructor() {
        this.weatherResult = document.querySelector('.weather-result');
    }

    showResult(weatherDetails) {
        if(this.checkIfAlertDisplayed()) {
            document.querySelector('.alert').remove();
        }

        this.showProgressBar();
        setTimeout(() => this.showWeatherData(weatherDetails), 5000);   
    }

    checkIfAlertDisplayed() {
        return document.querySelector('.alert') !== null;
    }

    showProgressBar() {
        return  this.weatherResult.innerHTML = `
                                                <div class="progress">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%;"></div>
                                                </div>
                                            `;
    }

    showWeatherData(weatherDetails) {
        return this.weatherResult.innerHTML = `
                                                <img src="http://openweathermap.org/img/wn/${weatherDetails.iconCode}@2x.png" alt="${weatherDetails.description}" class="center">
                                                
                                                <h3 class="center">${weatherDetails.description}</h3>
                                            `;
    }

    showAlert(message) {
        this.removePreviousWeather();
        this.removePreviousAlert();

        this.showProgressBar();

        setTimeout(() => {
                            this.removePreviousWeather();
                            this.createAndDisplayAlert(message);
                        }, 2000);
    }

    checkIfWeatherResultEmpty() {
        return this.weatherResult.innerHTML === null;
    }

    removePreviousWeather() {
        if(!this.checkIfWeatherResultEmpty()) {
            this.weatherResult.innerHTML = '';
        }
    }

    removePreviousAlert() {
        if(this.checkIfAlertDisplayed()) {
            document.querySelector('.alert').remove();
        }
    }

    createAndDisplayAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-dismissible alert-danger';
        alert.innerHTML = `
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            ${message}
                            `;
        const cardBody = document.querySelector('.card-body');
        const form = document.querySelector('.form-group');

        cardBody.insertBefore(alert, form);

        this.removeAlertByClick(alert);
    }

    removeAlertByClick(alertElement) {
        alertElement.addEventListener('click', e => {
            if(e.target.classList.contains('btn-close')) {
                alertElement.remove();
            }
        });
    }
}