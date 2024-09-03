/** @format */

import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [city, setCity] = useState('Kolkata');
  const [weatherData, setWeatherData] = useState(null);

  // ----------------set weather functionality using API--------------

  const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

  const fetchWatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWatherData();
  }, []);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    fetchWatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case 'clear':
        return '/src/sun.png';
      case 'Rain':
        return '/src/rain_with_cloud.png';
      case 'Clouds':
        return '/src/thunder.png';
      case 'Tornado':
        return '/src/Tornado.png';
      case 'Sunny':
        return '/src/sun.png';
      default:
        return '/src/sun.png'; 
    }
  }

  //---------------------- Set Date-------------------------------
  const currentDate = new Date();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  // -------------------------------------------------------------

  return (
    <>
      <div className='container'>
        {weatherData && (
          <>
            <h1 className='container_date'>{formattedDate}</h1>
            <div className='weather_data'>
              <h1 className='container_city'>{weatherData.name}</h1>
              <img className='container_img' src={getWeatherIconUrl(weatherData.weather[0].main)} alt='weather Icon' />
              <h2 className='container_degree'>{weatherData.main.temp/10}</h2>
              <h2 className='country_per'>{weatherData.weather[0].main}</h2>
              <form className='form' onSubmit={handleSumbit}>
                <input
                  type='text'
                  className='input'
                  placeholder='Enter Your City'
                  value={city}
                  required
                  onChange={handleInputChange}
                />
                <button type='sumbit'>Get</button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
