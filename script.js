document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weatherForm');
    const weatherDiv = document.getElementById('weather');

    weatherForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const location = document.getElementById('location').value;
        try {
            const weatherData = await fetchWeather(location);
            displayWeather(weatherData);
        } catch (error) {
            weatherDiv.innerHTML = `<p>Could not fetch weather data. Please try again.</p>`;
        }
    });

    async function fetchWeather(location) {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=X35KL5FAKMLZN9XJPNZ5U8X5X&contentType=json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    function displayWeather(data) {
        weatherDiv.innerHTML = `
            <h2>Weather in ${data.address}</h2>
            <p>Temperature: ${data.currentConditions.temp}°C</p>
            <p>Conditions: ${data.currentConditions.conditions}</p>
        `;
    }
});
