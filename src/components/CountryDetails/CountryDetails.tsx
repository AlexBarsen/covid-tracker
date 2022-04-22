import React from "react";
import ReactCountryFlag from "react-country-flag";

import { Card, CardContent, Typography } from "@material-ui/core";
import WorldFlag from "../../img/world_flag.png";

import "./CountryDetails.scss";

interface Props {
  countryCode: any;
  country: any;
  continent: any;
  population: any;
  active: any;
  tests: any;
}

const CountryDetails: React.FC<Props> = ({
  country,
  continent,
  countryCode,
  population,
  active,
  tests,
}) => {
  return (
    <Card className="details">
      <CardContent className="details__content">
        <div className="details__image--wrapper">
          {countryCode ? (
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              className="details__image--img"
            />
          ) : (
            <img
              src={WorldFlag}
              alt="World Flag"
              className="details__image--img"
            />
          )}
        </div>

        <div className="details__stats">
          <Typography
            className="details__stats--title"
            gutterBottom
            variant="h3"
            component="div"
          >
            {country ? country : continent ? continent : "Worldwide"}
          </Typography>
          <Typography
            className="details__stats--row"
            variant="h4"
            component="p"
          >
            <strong>Population:</strong> {population}
          </Typography>
          <Typography
            className="details__stats--row"
            variant="h4"
            component="p"
          >
            <strong>Active Cases:</strong> {active}
          </Typography>
          <Typography
            className="details__stats--row"
            variant="h4"
            component="p"
          >
            <strong>Tests done:</strong> {tests}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryDetails;
