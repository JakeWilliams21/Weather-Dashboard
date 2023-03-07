import React from 'react'

const WeatherCard = (props) => {
  return (
    <div className = 'weather-card'>
        <span>{props.time}</span>
        <img src = {`https://openweathermap.org/img/wn/${props.icon}@2x.png`} alt = 'sunny'/>
        <div>
            <span>{props.temp}</span>
        </div>
        <div className = 'precip flex-row'>
            <span>{props.desc}</span>
          </div>
        </div>
  )
}

export default WeatherCard