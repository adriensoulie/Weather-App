import React, { useState, useEffect } from 'react'
import Weather from './component/Weather'
import cityWeatherApi from './api/cityWeatherApi'
import './App.css';

function App() {
  const [city, setCity] = useState('')
  const [error, setError] = useState(false)
  const [weather, setWeather] = useState('')
  const [loading, isLoading] = useState(false)
  

  useEffect(() => {

    if( navigator.geolocation){

      const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=replace_lat&lon=replace_lon&appid=3e0125ad1c01dc42cced5e471fbc8f4b'
  
      navigator.geolocation.getCurrentPosition(function(pos){
        isLoading(true)
        //'pos' return object has many properties we can grab
        var geoLat = pos.coords.latitude.toFixed(5);
        var geoLng = pos.coords.longitude.toFixed(5);
  
  
        const urlLon = baseUrl.replace('replace_lon', geoLng)
        const fetchUrlLocalisation = urlLon.replace('replace_lat', geoLat)

        fetch(fetchUrlLocalisation)
          .then((res)=> res.json())
          .then((res => {
            setWeather(res)
            isLoading(false)
          }))
      });
    }

  },[]);



  const onSubmitCity = city => {
    let cityWeatherUrl = cityWeatherApi.replace('city_name', city)
    setCity('')
    fetch(cityWeatherUrl)
      .then((res)=> {
        if(!res.ok) throw new Error(res.status)
        else return res.json()
      })
      .then((res => {
        setWeather(res)
        setError(null)
      }))
      .catch(function(error){
        setError('Please enter a valid city name')
        setCity('')
        setWeather('')
      })
  }


  function handleChange(event){
    setCity(event.target.value.toLowerCase())
  }

  function handleSubmit(event){
    event.preventDefault()
    onSubmitCity(city)
  }



  if(loading===true){
    return   ( 
      <div className="App">
        <header className="App-header">
          <h1>How is the weather ? </h1>
          <div>Loading your current location wait...</div>
        </header>
      </div>
    )
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>How is the weather ? </h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor='cityInput'>Let's look the weather in a town 😄 !</label><br/>
          <input value={city} onChange={handleChange}></input>
          <button disabled={Boolean(!city)} type='submit'>Submit</button>
          <div style={{color: 'red'}}>{error}</div>
        </form>


        <Weather weather={weather} />


      </header>
    </div>
  );
}

export default App;
