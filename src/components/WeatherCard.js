import React from 'react'
import sun from '../images/icons8-sun.svg'
import drop from '../images/drop.svg'

const WeatherCard = (props) => {
  return (
    <div className = 'weather-card'>
        <span>{props.time}</span>
        <img src = {`https://openweathermap.org/img/wn/${props.icon}@2x.png`} alt = 'sunny'/>
        <div>
            <span>{props.temp}</span>
        </div>
        <div className = 'precip flex-row'>
            <img src ={drop} alt = 'precipitation'/>
            <spa>{props.rain}%</spa>
          </div>
        </div>
  )
}

export default WeatherCard