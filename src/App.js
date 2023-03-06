import './App.css';
import Navbar from './components/Navbar';
import sun from './images/icons8-sun.svg'
import drop from './images/drop.svg'
import WeatherCard from './components/WeatherCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [current, setCurrent] = useState([])
  const [forecast, setForecast] = useState([])

  const handleSearch = () => {
    axios.get('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=bb7b08e02944933f95323a0d2bd6a58f').then((res) => {
      console.log(res);
    })
  }

  return (
    <div className="App">
      <Navbar/>
      <div className = 'snapshot'>
        <span className = 'location-name'>Columbus, Ohio</span>
        <div className = 'snap-top flex-row'>
          <img src = {sun} className = 'weather-type' alt = 'sunny'/>
          <div className = 'precip flex-row'>
            <img src ={drop} alt = 'precipitation'/>
            <spa>0%</spa>
          </div>
        </div>
        <div className = 'temps flex-row'>
          <span className = 'low'>30°</span>
          <span className = 'current'>30°</span>
          <span className = 'high'>30°</span>
        </div>
        <div className = 'forecast flex-row'>
          <WeatherCard/>
          <WeatherCard/>
          <WeatherCard/>
          <WeatherCard/>
          <WeatherCard/>
          <WeatherCard/>
          <WeatherCard/>
        </div>
      </div>
    </div>
  );
}

export default App;
