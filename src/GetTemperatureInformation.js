import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetTemperatureInformation.css';

function GetTemperatureInformation({ city, title }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&lang=${process.env.REACT_APP_OPENWEATHERMAP_LANGUAGE}&units=${process.env.REACT_APP_OPENWEATHERMAP_UNITS_OF_MEASUREMENT}`);
        setData(response.data);
        setError(null); // Clear previous errors if request is successful
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('.שגיאה בהעלאת הקובץ, נסה במועד מאוחר יותר');
      }
    };

    fetchData();
  }, []);

  const getFilteredData = () => {
    if (!data) return null;
    const { main, weather, name } = data;
    const temperature = main?.temp;
    const feels_like = main?.feels_like;
    const humidity = main?.humidity;
    const description = weather?.[0]?.description;
    const city = name;
    return { temperature, feels_like, humidity, description, city };
  };

  const filteredData = getFilteredData();

  return (
    <div className="card">
      {error ? (
        <p>{error}</p>
      ) : (
        filteredData ? (
          <div>
            <h2 className="card-title">{filteredData.city}</h2>
            <div className="weather-icon">
              {filteredData.feels_like <= 20 ? '☁️' :
                filteredData.feels_like >= 30 ? '☀️' : '⛅'}
            </div>
            <p className="temperature">טמפרטורה נמדדת: {filteredData.temperature} °C</p>
            <p className="temperature">טמפרטורה מורגשת: {filteredData.feels_like} °C</p>
            <p>אחוזי לחות: % {filteredData.humidity}</p>
            <p className="description">תיאור: {filteredData.description}</p>
          </div>
        ) : (
          '...טוען '
        )
      )}
    </div>
  );
}

export default GetTemperatureInformation;
