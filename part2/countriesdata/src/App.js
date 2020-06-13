import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const WeatherDisplay = ({capital}) =>{
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
      /* eslint-disable */
  useEffect(()=>{
    let apiReq = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
    axios.get(apiReq).then(response => setWeather(response.data.current))
    }, [capital])

    console.log(weather)

  return (
    <>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.temperature} Celsius</p>
      <img src={weather.weather_icons} alt={weather.weather_descriptions}></img>
      <p>Wind: {weather.wind_speed} mph, direction: {weather.wind_dir}</p>
    </>
  )

}

const Display = ({filtered, setSearch}) =>{
  let overDisplay = filtered.map(each => {
    return(
      <div key={each.alpha2Code}>
        <p>{each.name}</p> 
        <button onClick={e => setSearch(each.name)}>Show</button>
      </div>
  )})

  if(filtered.length === 1){
    let country = filtered[0];
    return(
      <>
        <h3>{country.name}</h3>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h5>Languages:</h5>
        <ul>
          {country.languages.map(ea => <li key={ea.iso639_2}>{ea.name}</li>)}
        </ul>
        <img src={country.flag} alt={country.name + ' flag'}></img>
        <WeatherDisplay capital={country.capital}></WeatherDisplay>
      </>
    )
  };

  if(filtered.length > 10){
    return(
      <p>Too many matches, please spicify your filter.</p>
    )
  };

  if(filtered.length < 10){
    return(
      <div>
        {overDisplay}
      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  
  useEffect(()=>{
    /* eslint-disable */
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    })
  },[])

  useEffect(()=>{
    const newRegex = new RegExp(('^' + search), 'gi')
    let countryCopy = countries.filter(obj => obj.name.match(newRegex));
    setFiltered(countryCopy);
  }, [search])

  return (
    <div>
      <h5>Find country: </h5>
      <input type='display' onChange={(e)=>{setSearch(e.target.value)}} value={search}></input>
      <Display setSearch={setSearch} filtered={filtered}></Display>
    </div>
  );
}

export default App;
