import './App.css';
import Navbar from './components/Navbar';
import sun from './images/icons8-sun.svg'
import drop from './images/drop.svg'
import WeatherCard from './components/WeatherCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=bb7b08e02944933f95323a0d2bd6a58f`).then((res) => {
        setCurrent({
          current: Math.round(res.data.main.temp),
          high: Math.round(res.data.main.temp_max),
          low: Math.round(res.data.main.temp_min),
          type: res.data.weather[0].main,
          icon: res.data.weather[0].icon
        })
      })

      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&units=imperial&appid=bb7b08e02944933f95323a0d2bd6a58f`).then((res) => {
        setForecast(res.data.list)
        console.log(res.data.list);
      })
    }
  }, [lat, lon])

  const handleButtonClick = (location) => {
    setLocation(location)
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=bb7b08e02944933f95323a0d2bd6a58f`).then((res) => {
      console.log(res.data);
      setLat(res.data[0].lat)
      setLon(res.data[0].lon)
    })

    
  }

  const convertDate = (date) => {
    let newDate = new Date(date * 1000)

    return newDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }


  return (
    <div className="App">
      <Navbar onButtonClick = {(location) => handleButtonClick(location)}/>
      <div className = 'snapshot'>
        <span className = 'location-name'>{location}</span>
        <div className = 'snap-top flex-row'>
          {location ? <img src = {`https://openweathermap.org/img/wn/${current.icon}@2x.png`} className = 'weather-type' alt = 'sunny'/> : <span>-</span>}
          <div className = 'precip flex-row'>
            <img src ={drop} alt = 'precipitation'/>
            <spa>0%</spa>
          </div>
        </div>
        <div className = 'temps flex-row'>
          <span className = 'low'>{location ? current.low : '-'}</span>
          <span className = 'current'>{location ? current.current : '-'}</span>
          <span className = 'high'>{location ? current.high : '-'}</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px'}}>
          <ul className = 'forecast flex-row'>
            {forecast && forecast.map((weather, index) => (
              <li>
                <WeatherCard key = {index} time = {convertDate(weather.dt)} temp = {Math.round(weather.main.temp)} icon = {weather.weather[0].icon}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
