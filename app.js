
window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.your-location');
    let iconAnimation = document.querySelector('.weather-icon');
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            const PROXY = 'https://cors-anywhere.herokuapp.com/'
            const API = `${PROXY}https://api.darksky.net/forecast/917523edc955818a25610c5d1fdb3b62/${lat},${long}`;
            fetch(API)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    const { timezone } = data;
                    locationTimezone.textContent = timezone;
                    let celsius = (temperature - 32) * (5 / 9);
                    setIcons(icon, iconAnimation);
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else if (temperatureSpan.textContent === "C") {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })



                });
        });
    }
    function setIcons(icon, iconID) {
        const SKYCONS = new Skycons({ color: 'white' });
        const CURRENT_ICON = icon.replace(/-/g, "_").toUpperCase();
        SKYCONS.play();
        return SKYCONS.set(iconID, Skycons[CURRENT_ICON]);
    }
});

