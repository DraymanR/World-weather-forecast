import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetTemperatureInformation.css';

function GetTemperatureInformation({ city, title }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}
            &appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}
            &lang=${process.env.REACT_APP_OPENWEATHERMAP_LANGUAGE}
            &units=${process.env.REACT_APP_OPENWEATHERMAP_UNITS_OF_MEASUREMENT}`);
        setData(response.data);
        setError(null); // Clear previous errors if request is successful
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, [city]);

  const getFilteredData = () => {
    if (!data) return null;
    const { main, weather } = data;
    const temperature = main?.temp;
    const feels_like = main?.feels_like;
    const humidity = main?.humidity;
    const description = weather?.[0]?.description;

    return { temperature, feels_like, humidity, description };
  };

  const filteredData = getFilteredData();

  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        filteredData ? (
          <div>
            <div className="weather-icon">
              {filteredData.feels_like <= 20 ? '☁️' :
                filteredData.feels_like >= 30 ? '☀️' : '⛅'}
            </div>
            <p className="temperature">Temperature: {filteredData.temperature} °C</p>
            <p className="temperature">Feels Like: {filteredData.feels_like} °C</p>
            <p>Humidity: {filteredData.humidity} %</p>
            <p className="description">Description: {filteredData.description}</p>
          </div>
        ) : (
          'Loading...'
        )
      )}
    </div>
  );
}

export default GetTemperatureInformation;
