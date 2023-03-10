import './App.css';
import Navbar from './components/Navbar';
import WeatherCard from './components/WeatherCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import $ from 'jquery'

function App() {
  const [current, setCurrent] = useState({
    current: 0,
    high: 0,
    low: 0,
    type: '',
    chance: 0,
    icon: ''
  })
  const [forecast, setForecast] = useState([])
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [location, setLocation] = useState()
  const [unit, setUnit] = useState(false)

  useEffect(() => {

    if (lat && lon) {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=8&units=${unit ? 'metric' : 'imperial'}&appid=${process.env.REACT_APP_WEATHER_KEY}`).then((res) => {
      setForecast(res.data.list)
      console.log(res.data.list);
    })

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit ? 'metric' : 'imperial'}&appid=${process.env.REACT_APP_WEATHER_KEY}`).then((res) => {
      setCurrent({
        current: Math.round(res.data.main.temp),
        high: Math.round(res.data.main.temp_max),
        low: Math.round(res.data.main.temp_min),
        type: res.data.weather[0].main,
        icon: res.data.weather[0].icon,
        desc: res.data.weather[0].description
      })
    })
    }

    
  }, [lat, lon, unit,])

  const unitToggle = (param) => {
    setUnit(param)
    console.log(unit);
  }

  const handleButtonClick = (location) => {
    const zipRegex = /^\d{5}$/ // regular expression to check if string contains only 5 digits
    if (zipRegex.test(location)) {
      axios.get(`https://api.openweathermap.org/geo/1.0/zip?zip=${location},US&appid=${process.env.REACT_APP_WEATHER_KEY}`).then((res) => {
      setLat(res.data.lat)
      setLon(res.data.lon)
      setLocation(res.data.name)
    }).catch((err) => {
      console.log(err);
      setLocation('Too Many Requests, Try Again Later')
    })
    } else {
      axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.REACT_APP_WEATHER_KEY}`).then((res) => {
      setLat(res.data[0].lat)
      setLon(res.data[0].lon)
      setLocation(res.data[0].name)
      
    }).catch((err) => {
      console.log(err);
      setLocation('Too Many Requests, Try Again Later')
    })
    }
    

    $('.snapshot').removeClass('fade-in-three')
    $('.forecast').removeClass('fade-in-four')

    $('.snapshot').addClass('fade-in-three')
    $('.forecast').addClass('fade-in-four')
    
  }

  const convertDate = (date) => {
    let newDate = new Date(date * 1000)

    return newDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }


  return (
    <div className="App">
      <Navbar onButtonClick = {(location) => handleButtonClick(location)} onUnitClick={(param) => unitToggle(param)}/>
      <div className = 'snapshot'>
        <span className = 'location-name'>{location ? location : 'Please enter your location.'}</span>
        <div className = 'snap-top flex-row'>
          {lat ? <img src = {`https://openweathermap.org/img/wn/${current.icon}@2x.png`} className = 'weather-type' alt = 'sunny'/> : <span></span>}
        </div>
        <div className = 'temps flex-row'>
          <span className = 'low'>{lat ? `${current.low}??` : ''}</span>
          <span className = 'current'>{lat ? `${current.current}??` : ''}</span>
          <span className = 'high'>{lat ? `${current.high}??` : ''}</span>
        </div>
        <div className = 'ul-container'>
          <ul className = 'forecast flex-row'>
            {forecast && forecast.map((weather, index) => (
              <li>
                <WeatherCard key = {index} time = {convertDate(weather.dt)} temp = {Math.round(weather.main.temp)} icon = {weather.weather[0].icon} desc = {weather.weather[0].description}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
