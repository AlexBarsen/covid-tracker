import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@material-ui/core";

import numeral from "numeral";

import InfoBox from "./components/InfoBox/InfoBox";
import Table from "./components/Table/Table";
import Map from "./components/Map/Map";
import { sortData } from "./components/Utils/Utils";

import { Country } from "./interfaces/Country";
import { Continent } from "./interfaces/Continent";
import { CountryInfo } from "./interfaces/CountryInfo";
import { ContinentInfo } from "./interfaces/ContinentInfo";
import { MapCoordinates } from "./interfaces/MapCoordinates";

import "./App.scss";

function App() {
  const [country, setCountry] = useState<string>("worldwide");
  const [countries, setCountries] = useState([]);

  const [continent, setContinent] = useState<string>("worldwide");
  const [continents, setContinents] = useState([]);

  const [displayInfo, setDisplayInfo] = useState<
    CountryInfo | ContinentInfo | undefined
  >(undefined);

  const [tableData, setTableData] = useState<any>([]);
  const [mapCenter, setMapCenter] = useState<MapCoordinates>({
    lat: 34.80746,
    lng: -45.4796,
  });
  const [mapZoom, setMapZoom] = useState<number>(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setDisplayInfo(data));

    return () => {};
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country: CountryInfo) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);

          setTableData(sortedData);
        });
    };

    const getContinetsData = async () => {
      await fetch("https://disease.sh/v3/covid-19/continents")
        .then((response) => response.json())
        .then((data) => {
          const continents = data.map((continent: ContinentInfo) => ({
            name: continent.continent,
          }));
          setContinents(continents);
        });
    };

    getCountriesData();
    getContinetsData();
  }, []);

  const onCountryChange = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const countryCode = event.target.value as string;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setDisplayInfo(data);
        setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
        console.log(mapCenter);
        setMapZoom(4);
      });
  };

  const onContinentChange = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const continentName = event.target.value as string;

    const url =
      continentName === "worldwide"
        ? "https://disease.sh/v3/covid-19/all "
        : `https://disease.sh/v3/covid-19/continents/${continentName}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDisplayInfo(data);
        console.log(data);
        setContinent(continentName);
      });
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1 className="app__header--title">Covid-19-Tracker</h1>

        <div className="app__header--dropdowns">
          <Select
            variant="outlined"
            onChange={onCountryChange}
            value={country}
            className="app__header--dropdown"
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country: Country, index) => (
              <MenuItem value={country.value} key={index + country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            variant="outlined"
            onChange={onContinentChange}
            value={continent}
            className="app__header--dropdown"
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {continents.map((continent: Continent) => (
              <MenuItem value={continent.name} key={continent.name}>
                {continent.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="app__stats">
        <h2>
          You are viewing the stats for:
          {displayInfo?.continent
            ? displayInfo.country
              ? displayInfo.country
              : displayInfo.continent
            : "Worldwide"}
        </h2>
        <div className="app__stats--infoboxes">
          <InfoBox
            title="Coronavirus Cases"
            cases={numeral(displayInfo?.todayCases).format("0.0a")}
            total={numeral(displayInfo?.cases).format("0.0a")}
            isRed
          ></InfoBox>

          <InfoBox
            title="Recovered"
            cases={numeral(displayInfo?.todayRecovered).format("0.0a")}
            total={numeral(displayInfo?.recovered).format("0.0a")}
          ></InfoBox>

          <InfoBox
            title="Deaths"
            cases={numeral(displayInfo?.todayDeaths).format("0.0a")}
            total={numeral(displayInfo?.deaths).format("0.0a")}
            isRed
          ></InfoBox>
        </div>
      </div>

      <div className="app__container">
        <div className="app__map">
          <Map
            mapCountries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
            casesType="cases"
          />
        </div>

        <div className="app__cases">
          <h2 className="app__cases--title">Cases by Country </h2>

          <div className="app__cases--table">
            <Table countries={tableData}></Table>
          </div>

          <div className="app__cases--graph"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
