// API Key and Base URL for OpenWeatherMap API
const apiKey = '7417ab6f6ce6e54c20c438ea59cc5be9'; 
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const units = '&units=imperial';
// Generate Button Event Listener
document.getElementById('generate').addEventListener('click', generateClick);

// Main function triggered on button click
function generateClick() {
    const zipCode = document.getElementById('zip').value;
    const Userfeelings = document.getElementById('feelings').value;

    
    if (!zipCode) {
        alert("Please enter a valid Zip Code");
        return;
    }

    // Fetch weather data, post it to the server, then update the UI
    fetchWeatherData(baseURL, zipCode, apiKey)
        .then((weatherData) => {
            if (weatherData) {
                const currentDate = new Date().toLocaleDateString('en-US');
                const postData = {
                    temperature: weatherData.main.temp,
                    date: currentDate,
                    userResponse: Userfeelings
                };
                return postDataToServer('/add', postData);
            }
        })
        .then(() => retrieveData()); 
}

// Function to GET weather data from OpenWeatherMap
const fetchWeatherData = async (baseURL, zip, key) => {
    try {
        const response = await fetch(`${baseURL}${zip}&appid=${key}&{units}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};


// Function to POST data to the server
const postDataToServer = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error("Error posting data to the server:", error);
    }
};

// Function to GET Project Data and update the UI
const retrieveData = async () => {
    try {
        const request = await fetch('/all');
        const allData = await request.json();
        console.log(allData);

        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temperature)}°C`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.userResponse}`;
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    } catch (error) {
        console.error("Error retrieving data", error);
    }
};
