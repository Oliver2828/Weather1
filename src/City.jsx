import React, { useState } from 'react';

function City() {
  const WeatherDashboard = () => {
    const [unit, setUnit] = useState('C');  // State for Celsius/Fahrenheit
    const [city, setCity] = useState('');  // State for city input
    const [weatherData, setWeatherData] = useState(null);  // State for weather data
    const [error, setError] = useState(''); // State for error handling

    const apiKey = '9e289b09c0a98c7dc0a04b5ceb0d54d0'; // Replace with your OpenWeather API key

    // Function to toggle between Celsius and Fahrenheit
    const toggleUnit = () => {
      setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
    };

    // Function to fetch weather data
    const handleSearch = async () => {
      if (city.trim()) {
        try {
          const unitParam = unit === 'C' ? 'metric' : 'imperial';
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitParam}&appid=${apiKey}`
          );
          const data = await response.json();
          if (response.ok) {
            setWeatherData(data);
            setError(''); // Clear previous errors
          } else {
            setError(data.message); // Show error if city is not found
          }
        } catch (error) {
          setError('Error fetching weather data. Please try again.');
        }
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-300 to-yellow-200 flex flex-col items-center justify-center p-4">
        {/* Search Bar */}
        <div className="w-full max-w-md flex space-x-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none"
          >
            Enter
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Current Weather Section */}
        {weatherData && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6 text-center">
            <h2 className="text-2xl font-bold">{weatherData.name}</h2>
            <div className="flex items-center justify-center space-x-4 mt-4">
              {/* Weather Icon */}
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                className="w-12 h-12"
              />
              {/* Temperature Display */}
              <span className="text-6xl font-bold">
                {Math.round(weatherData.main.temp)}°{unit}
              </span>
            </div>
            <p className="text-gray-500 mt-2">{weatherData.weather[0].description}</p>

            {/* Toggle Button */}
            <button
              onClick={toggleUnit}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none"
            >
              Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
            </button>
          </div>
        )}
      </div>
    );
  };

  return <WeatherDashboard />;
}

export default City;
