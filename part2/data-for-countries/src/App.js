import { useEffect, useState } from 'react'
import axios from 'axios'

const Details = ({ prop }) => {
  return (
    <div>
      <h1>{prop[0].name.common}</h1>
      <p>capital {prop[0].capital}</p>
      <p>area {prop[0].area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(prop[0].languages).length > 1 ?
          Object.values(prop[0].languages).map(language => <li>{language}</li>)
          : <li>{Object.values(prop[0].languages)[0]}</li>}
      </ul>
      <img src={prop[0].flags.png} alt={`${prop[0].name.common} flag`} />
    </div >
  )
}



const Search = ({ searchResult, chooseOne }) => {


  if (searchResult.length === 1) {
    return (
      <Details prop={searchResult} />
    )
  }

  return (searchResult.map(result => <p key={result.name.common}>{result.name.common} <button onClick={()=>chooseOne(result.name.common)}>show</button></p>))

}
const App = () => {

  const [countries, setCountries] = useState([])
  const [searchTarget, setSearchTarget] = useState("")
  const [searchResult, setSearchResult] = useState([])

  const chooseOne = (name) => {
    const choosen = searchResult.filter(result => result.name.common === name)
    setSearchResult(choosen)
  }

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(res => {
        setCountries(res.data)
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
