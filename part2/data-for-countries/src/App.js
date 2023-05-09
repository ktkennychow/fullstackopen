import { useEffect, useState } from 'react'
import axios from 'axios'

const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY

const Details = ({ prop }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const country = prop[0]

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${weather_api_key}&units=metric`).then((response) => {
      console.log(response)
      setWeather(response)
      setIsLoading(false)
    })
  },[])

  if (!isLoading) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).length > 1 ?
            Object.values(country.languages).map(language => <li>{language}</li>)
            : <li>{Object.values(country.languages)[0]}</li>}
        </ul>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        <h2>Weather in {country.name.common}</h2>
        <p>temperatrue {weather.data.main.temp} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt={`weather in ${country.name.common}`} />
        <p>wind {weather.data.wind.speed} m/s</p>
      </div>
    )
  }

}


const Search = ({ searchResult, chooseOne }) => {
  if (searchResult.length === 1) {
    return (
      <Details prop={searchResult} />
    )
  }

  return (searchResult.map(result => <p key={result.name.common}>{result.name.common} <button onClick={() => chooseOne(result.name.common)}>show</button></p>))
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTarget, setSearchTarget] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const chooseOne = (name) => {
    const choosen = searchResult.filter(result => result.name.common === name)
    setSearchResult(choosen)
  }

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(res => {
        setCountries(res.data)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (countries.length > 0) {
      console.log("Loaded countries", countries)
      if (searchTarget !== "") {
        const result = countries.filter(country => country.name.common.toLowerCase().startsWith(searchTarget))
        console.log(searchTarget, result);
        if (result.length > 0) {
          setSearchResult(result)
          if (result.length < 11) {
            const tenResults = result.slice(0, 10)
            setSearchResult(tenResults)
          }
        }
        if (result.length === 0) {
          setSearchResult([])
        }
      }
    }
  }, [countries, searchTarget])

  console.log(searchResult.length)
  return (
    <div>
      <p>find countries</p>
      <input
        value={searchTarget}
        onChange={(e) => setSearchTarget(e.target.value)}
      />
      {searchResult.length > 10 ? <p>Too many matches, specify another filter</p> : <Search searchResult={searchResult} chooseOne={chooseOne} />}
    </div>
  );
}

export default App;
