import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@material-ui/core";

import { Circle, Popup } from "react-leaflet";

import numeral from "numeral";

import InfoBox from "./components/InfoBox/InfoBox";
import Table from "./components/Table/Table";
import Map from "./components/Map/Map";

import "./App.scss";

interface Country {
  active: any;
  name: any;
}

interface CountryInfo {
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  countryInfo: {
    lat: number;
    long: number;
  };
}

interface MapCoordinates {
  lat: any;
  lng: any;
}

interface CasesTypeColors {
  cases: {
    hex: string;
    rgb: string;
    half_op: string;
    multiplier: number;
  };
  recovered: {
    hex: string;
    rgb: string;
    half_op: string;
    multiplier: number;
  };
  deaths: {
    hex: string;
    rgb: string;
    half_op: string;
    multiplier: number;
  };
}

const casesTypeColors: CasesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

// Draw circles on the map with interactive tooltip
export const showDataOnMap = (data: any, casesType = "cases") => {
  console.log(data);
  data.map((country: any) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors.cases.hex}
      fillColor={casesTypeColors.cases.hex}
      radius={Math.sqrt(country.cases) * casesTypeColors.cases.multiplier}
    />
  ));
};

function App() {
  const [country, setCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState<CountryInfo | undefined>(
    undefined
  );

  const [continents, setContinents] = useState([]);
  const [continent, setContinent] = useState("worldwide");
  const [continentInfo, setContinentInfo] = useState([]);

  const [tableData, setTableData] = useState<any>([]);
  const [mapCenter, setMapCenter] = useState<any>({
    lat: 34.80746,
    lng: -45.4796,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));

    return () => {};
  }, []);

  useEffect(() => {
    const getCountriesData: any = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country: any) => ({
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
          const continents = data.map((continent: any) => ({
            name: continent.continent,
            population: continent.population,
          }));
          setContinents(continents);
        });
    };

    getCountriesData();
    getContinetsData();
  }, []);

  const onCountryChange = async (event: any) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
        setMapZoom(4);
      });
  };

  const onContinentChange = (event: any) => {
    const continentName = event.target.value;

    setContinent(continentName);
  };

  const sortData = (data: any) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (a.cases > b.cases) {
        return -1;
      } else {
        return 1;
      }
    });
    return sortedData;
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
            {countries.map((country: any, index) => (
              <MenuItem value={country.value} key={country.value + index}>
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
            {continents.map((continent: any, index) => (
              <MenuItem value={continent.name} key={continent + index}>
                {continent.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="app__stats">
        <div className="app__stats--infoboxes">
          {/* <InfoBox
            title="Active"
            total={numeral(allData?.active).format("0.0a")}
          ></InfoBox> */}

          <InfoBox
            title="Coronavirus Cases"
            cases={numeral(countryInfo?.todayCases).format("0.0a")}
            total={numeral(countryInfo?.cases).format("0.0a")}
            isRed
          ></InfoBox>

          <InfoBox
            title="Recovered"
            cases={numeral(countryInfo?.todayRecovered).format("0.0a")}
            total={numeral(countryInfo?.recovered).format("0.0a")}
          ></InfoBox>

          <InfoBox
            title="Deaths"
            cases={numeral(countryInfo?.todayDeaths).format("0.0a")}
            total={numeral(countryInfo?.deaths).format("0.0a")}
            isRed
          ></InfoBox>
        </div>
      </div>

      <div className="app__container">
        <div className="app__map">
          <Map mapCountries={mapCountries} center={mapCenter} zoom={mapZoom} />
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
