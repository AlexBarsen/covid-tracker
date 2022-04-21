import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import numeral from "numeral";

import InfoBox from "./components/InfoBox/InfoBox";
import Table from "./components/Table/Table";
import Map from "./components/Map/Map";
import CountryDetails from "./components/CountryDetails/CountryDetails";

import { sortData } from "./components/Utils/Utils";

import { Country } from "./interfaces/Country";
import { Continent } from "./interfaces/Continent";
import { CountryInfo } from "./interfaces/CountryInfo";
import { ContinentInfo } from "./interfaces/ContinentInfo";
import { MapCoordinates } from "./interfaces/MapCoordinates";

import "./App.scss";

const useStyles = makeStyles({
  label: {
    fontSize: "14px",
  },
  select: {
    width: "15rem",
    fontSize: 14,
    textAlign: "center",

    "& ul": {
      backgroundColor: "#d3d3d3",
    },
    "& li": {
      fontSize: 12,
    },
  },
});

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

  const classes = useStyles();

  useEffect(() => {
    fetch("https://corona.lmao.ninja/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setDisplayInfo(data));
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://corona.lmao.ninja/v3/covid-19/countries")
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
      await fetch("https://corona.lmao.ninja/v3/covid-19/continents")
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
        ? "https://corona.lmao.ninja/v3/covid-19/all"
        : `https://corona.lmao.ninja/v3/covid-19/countries/${countryCode}`;

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
        ? "https://corona.lmao.ninja/v3/covid-19/all "
        : `https://corona.lmao.ninja/v3/covid-19/continents/${continentName}`;

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
          <FormControl
            className="app__header--dropdown"
            variant="outlined"
            style={{ width: "100%", marginBottom: 32 }}
          >
            <InputLabel id="select-label" className={classes.label}>
              Country
            </InputLabel>
            <Select
              label="Country"
              labelId="select-label"
              variant="outlined"
              onChange={onCountryChange}
              value={country}
              className={classes.select}
              MenuProps={{ classes: { paper: classes.select } }}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country: Country, index) => (
                <MenuItem value={country.value} key={index + country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            className="app__header--dropdown"
            variant="outlined"
            style={{ width: "100%", marginBottom: 32 }}
          >
            <InputLabel id="select-label" className={classes.label}>
              Continent
            </InputLabel>
            <Select
              label="Continent"
              labelId="select-label"
              variant="outlined"
              onChange={onContinentChange}
              value={continent}
              className={classes.select + " app__header--dropdown"}
              MenuProps={{ classes: { paper: classes.select } }}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {continents.map((continent: Continent) => (
                <MenuItem value={continent.name} key={continent.name}>
                  {continent.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="app__stats">
        <div className="app__stats--infoboxes">
          <CountryDetails
            country={displayInfo?.country}
            countryCode={displayInfo?.countryInfo?.iso2}
            population={displayInfo?.population}
            active={displayInfo?.active}
            tests={displayInfo?.tests}
          />

          <div className="wrapper">
            <InfoBox
              title="Coronavirus Cases"
              cases={numeral(displayInfo?.todayCases).format("0.0a")}
              total={numeral(displayInfo?.cases).format("0.0a")}
              isRed
            ></InfoBox>

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
