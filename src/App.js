import React, { useState } from 'react'
import Weather from './component/Weather'
import cityWeatherApi from './api/cityWeatherApi'
import './App.css';

function App() {
  const [city, setCity] = useState('')
  const [error, setError] = useState(false)
  const [weather, setWeather] = useState('')

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
