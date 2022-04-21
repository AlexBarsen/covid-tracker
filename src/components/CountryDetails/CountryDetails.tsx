import React from "react";
import ReactCountryFlag from "react-country-flag";

import { Card, CardContent, Typography } from "@material-ui/core";

import "./CountryDetails.scss";

interface Props {
  countryCode: any;
  country: any;
  population: any;
  active: any;
  tests: any;
}

const CountryDetails: React.FC<Props> = ({
  country,
  countryCode,
  population,
  active,
  tests,
}) => {
  return (
    <Card className="details">
      <CardContent className="details__content">
        <div className="details__content--img">
          <ReactCountryFlag
            countryCode={countryCode}
            svg
            style={{
              width: "100%",
              height: "100%",
            }}
            title="US"
          />
        </div>
        <Typography
          className="details__content--title"
          gutterBottom
          variant="h3"
          component="div"
        >
          {country}
        </Typography>
        <Typography className="details__content--detail" variant="body2">
          <strong>Population:</strong> {population}
        </Typography>
        <Typography className="details__content--detail" variant="body2">
          <strong>Active Cases:</strong> {active}
        </Typography>
        <Typography className="details__content--detail" variant="body2">
          <strong>Tests done:</strong> {tests}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CountryDetails;
