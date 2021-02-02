import React from 'react'
import './Weather.css'

export default function Weather(props) {
    const baseIconUrl = "http://openweathermap.org/img/wn/id@2x.png"

    function degreeConverter ( temp ) {
        let temperature = (temp-273.15)
        return Math.round(temperature)
    }

    if ( props.weather === ''){
        return (
            <div></div>
        )
    } else {   

        const iconUrl = baseIconUrl.replace('id', props.weather.weather[0].icon) 

        return (
            <div className="card">
                <div>{props.weather.name}</div>
                <img alt="weather icon" src={iconUrl}></img>
                <div>{props.weather.weather[0].description.toUpperCase()}</div>
                <div className="temperature">{degreeConverter(props.weather.main.temp)}°</div>
                <div className="other">Max. {degreeConverter(props.weather.main.temp_max)}° Min. {degreeConverter(props.weather.main.temp_min)}°</div>
                <div className="other">Ressenti {degreeConverter(props.weather.main.feels_like)}°</div>
                <div className="other">Vent {props.weather.wind.speed} km/h</div>
            </div>
        ) 
    }
    
}
