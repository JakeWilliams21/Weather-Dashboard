import React from 'react'
import sun from '../images/icons8-sun.svg'
import drop from '../images/drop.svg'

const WeatherCard = () => {
  return (
    <div className = 'weather-card'>
        <span>M</span>
        <img src = {sun} alt = 'sunny'/>
        <div>
            <span>30°</span>
            <span>30°</span>
        </div>
        <div className = 'precip flex-row'>
            <img src ={drop} alt = 'precipitation'/>
            <spa>0%</spa>
          </div>
        </div>
  )
}

export default WeatherCard