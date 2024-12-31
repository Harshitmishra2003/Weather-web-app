
        const weatherIcons = {
            Clear: '☀',
            Clouds: '☁',
            Rain: '🌧',
            Snow: '❄',
            Thunderstorm: '⚡',
            Drizzle: '🌦',
            Mist: '🌫',
        };

        const citiesWeather = []; // Array to store weather data for all cities

        // Function to update background based on weather conditions
        function updateBackground(weather) {
            const backgrounds = {
                Clear: "linear-gradient(to top, #87CEEB, #FFFFFF)",  // Light blue skies
                Clouds: "linear-gradient(to top, #B0C4DE, #FFFFFF)",  // Light gray clouds
                Rain: "linear-gradient(to top, #A9A9A9, #4C4C4C)",   // Rainy dark gray
                Snow: "linear-gradient(to top, #F0F8FF, #FFFFFF)",   // Snowy light blue
                Thunderstorm: "linear-gradient(to top, #778899, #D3D3D3)",  // Thunderstorm dark gray
                Drizzle: "linear-gradient(to top, #C0C0C0, #E0E0E0)", // Light drizzle gray
                Mist: "linear-gradient(to top, #E0E0E0, #B0B0B0)",  // Misty gray
            };

            document.body.style.background = backgrounds[weather] || "#FFFFFF";
        }

        // Function to format time from Unix timestamp
        function formatTime(timestamp) {
            const date = new Date(timestamp * 1000);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        }

        // Function to get weather information for a city
        async function getWeather() {
            const city = document.getElementById('city').value;
            if (!city) {
                alert('Please enter a city name!');
                return;
            }

            const apiKey = '0d2292ae94f4b00bc64be1f5e6de6469'; // Replace with your OpenWeather API key
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('City not found');

                const data = await response.json();
                const weather = data.weather[0].main;
                const temp = data.main.temp;
                const time = formatTime(data.dt);

                // Update current weather
                document.getElementById('weather-icon').textContent = weatherIcons[weather] || '❓';
                document.getElementById('temperature').textContent = `${temp} °C`;
                document.getElementById('condition').textContent = weather;
                document.getElementById('current-time').textContent = `Time: ${time}`;

                // Update background color based on weather condition
                updateBackground(weather);

                // Save city weather info to the list
                const cityData = {
                    cityName: city,
                    weather: weather,
                    temperature: temp,
                    time: time,
                    icon: weatherIcons[weather] || '❓',
                };

                citiesWeather.push(cityData);

                // Update city list UI
                updateCityList();
            } catch (error) {
                alert(error.message);
            }

            // Clear the city input field
            document.getElementById('city').value = '';
        }

        // Function to update the city list in the UI
        function updateCityList() {
            const cityListContainer = document.getElementById('city-list');
            cityListContainer.innerHTML = ''; // Clear the list before updating

            citiesWeather.forEach(cityData => {
                const cityItem = document.createElement('div');
                cityItem.className = 'city-item ' + cityData.weather.toLowerCase();
                cityItem.innerHTML = `
                    <div class="icon">${cityData.icon}</div>
                    <div class="city-name">${cityData.cityName}</div>
                    <div class="weather">${cityData.weather}</div>
                    <div class="temperature">${cityData.temperature} °C</div>
                    <div class="time">${cityData.time}</div>
                `;
                cityListContainer.appendChild(cityItem);
            });
        }

        // Function to search Google for a city or query
        function searchGoogle() {
            const query = document.getElementById('top-city').value;
            if (query) {
                const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                window.open(googleUrl, '_blank');
            } else {
                alert('Please enter a search query!');
            }

            // Clear the top-city search bar after searching Google
            document.getElementById('top-city').value = '';
        }
        function toggleAboutSection() {
            const aboutSection = document.getElementById('about-section');
            if (aboutSection.style.display === 'none' || aboutSection.style.display === '') {
                aboutSection.style.display = 'block';
            } else {
                aboutSection.style.display = 'none';
            }
        }