import React from "react";
import { Circle, Popup } from "react-leaflet";

import { CountryInfo } from "../../interfaces/CountryInfo";
import { CasesTypeColors } from "../../interfaces/CasesTypeColors";

import "./Utils.scss";
import numeral from "numeral";

export const sortData = (data: CountryInfo[]) => {
  console.log(data);
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

const casesTypeColors: { [index: string]: any } = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 90,
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
export const showDataOnMap = (data: CountryInfo[], casesType = "cases") =>
  data.map((country: any) => (
    <Circle
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup className="popup">
        <div className="popup__title">
          <span>{country.country}</span>
        </div>
        <div className="popup__container">
          <div className="popup__container--stat">
            Cases: {numeral(country.cases).format("0.0a")}
          </div>
          <div className="popup__container--stat">
            Recovered: {numeral(country.recovered).format("0.0a")}
          </div>
          <div className="popup__container--stat">
            Deaths: {numeral(country.deaths).format("0.0a")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
