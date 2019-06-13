import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Input = ({ handle }) => {
  return (
    <>
      <input onChange={handle} />
    </>
  );
};

const Search = ({ text, handle, filterValue }) => {
  return (
    <div>
      {text} <Input value={filterValue} handle={handle} />
    </div>
  );
};
const CountryInfo = props => {
  const result = props.countriesMap.filter(o =>
    o.name.toLocaleLowerCase().includes(props.filter.toLocaleLowerCase())
  );

  if (Object.keys(result).length === 1) {
    return result.map(countryInfo => {
      console.log(countryInfo.languages);
      return (
        <div key={countryInfo.numericCode}>
          <h1> {countryInfo.name} </h1>
          <p>capital {countryInfo.capital}</p>
          <p>population {countryInfo.population}</p>
          <h2>languages</h2>
          <ul>
            {countryInfo.languages.map(countryLang => {
              return <li>{countryLang.name}</li>;
            })}
          </ul>
          <img
            alt="country flag"
            src={countryInfo.flag}
            style={{ width: 150 }}
          />
        </div>
      );
    });
  } else if (Object.keys(result).length < 10) {
    return result.map(countryInfo => {
      return <p key={countryInfo.numericCode}>{countryInfo.name}</p>;
    });
  } else {
    return <p>Too many matches, speficy another filter</p>;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const countriesMap = countries.map(country => {
    return country;
  });

  // const result = countriesMap.filter(o =>
  //   o.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  // );
  // console.log(result.map(countryInfo => countryInfo.capital));

  return (
    <div>
      <Search
        text="find countries"
        handle={handleFilter}
        filterValue={filter}
      />
      <CountryInfo filter={filter} countriesMap={countriesMap} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
