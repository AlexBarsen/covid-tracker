import React from "react";
import "./InfoBox.scss";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import numeral from "numeral";

interface Props {
  title: string;
  cases?: string;
  total?: string;
  isRed?: boolean;
  oneCasePerPeople?: number;
  oneDeathPerPeople?: number;
  oneTestPerPeople?: number;
  deathsPerOneMillion?: number;
  testsPerOneMillion?: number;
  activePerOneMillion?: number;
  recoveredPerOneMillion?: number;
  casesPerOneMillion?: number;
}

const useStyles = makeStyles({
  titleStyle: {
    fontSize: "2rem",
    letterSpacing: ".2rem",
    position: "relative",
    marginBottom: "1.6rem",
    display: "inline-block",
  },
  typographyStyle: {
    fontSize: "2.4rem",
    letterSpacing: ".1rem",
    "&:not(:last-child)": {
      marginBottom: ".5rem",
    },
  },
  otherTypographyStyle: {
    fontSize: "1.4rem",
    letterSpacing: ".1rem",
  },
  spanColorRed: {
    fontWeight: "bold",
    color: "red",
  },
  spanColorGreen: {
    fontWeight: "bold",
    color: "green",
  },
});

const InfoBox: React.FC<Props> = ({
  title,
  cases,
  total,
  isRed,
  oneCasePerPeople,
  oneDeathPerPeople,
  oneTestPerPeople,
  deathsPerOneMillion,
  testsPerOneMillion,
  recoveredPerOneMillion,
  casesPerOneMillion,
  activePerOneMillion,
}) => {
  const classes = useStyles();

  const statistics = () => (
    <>
      <Typography className={classes.titleStyle + " card__content--title"}>
        {title}:
      </Typography>
      <Typography variant="h3" className={classes.typographyStyle}>
        <span className={isRed ? classes.spanColorRed : classes.spanColorGreen}>
          +{cases}
        </span>
      </Typography>
      <Typography variant="h4" className={classes.typographyStyle}>
        <strong>Total:</strong> {total}
      </Typography>
    </>
  );

  const otherStatisticsCountries = () => (
    <>
      <Typography className={classes.titleStyle + " card__content--title"}>
        {title}:
      </Typography>
      <Typography className={classes.otherTypographyStyle}>
        One Case Per <strong>{oneCasePerPeople}</strong> people.
      </Typography>
      <Typography className={classes.otherTypographyStyle}>
        One Death Per <strong>{oneDeathPerPeople}</strong> people.
      </Typography>
      <Typography className={classes.otherTypographyStyle}>
        One Test Per <strong>{oneTestPerPeople}</strong> people.
      </Typography>
    </>
  );

  const otherStatisticsContinents = () => (
    <>
      <Typography className={classes.titleStyle + " card__content--title"}>
        {title}:
      </Typography>
      <Typography className={classes.otherTypographyStyle}>
        <strong>{numeral(casesPerOneMillion).format("0.0a")}</strong> cases per
        million.
      </Typography>
      <Typography className={classes.otherTypographyStyle}>
        <strong>{numeral(deathsPerOneMillion).format("0.0a")}</strong> deaths
        per million.
      </Typography>
      <Typography className={classes.otherTypographyStyle}>
        <strong>{numeral(testsPerOneMillion).format("0.0a")}</strong> tests per
        million.
      </Typography>
      <Typography className={classes.otherTypographyStyle}>
        <strong>{numeral(activePerOneMillion).format("0.0a")}</strong> active
        per million.
      </Typography>
      <Typography className={classes.otherTypographyStyle}>
        <strong>{numeral(recoveredPerOneMillion).format("0.0a")}</strong>
        recovered per million.
      </Typography>
    </>
  );

  return (
    <Card className="card">
      <CardContent className="card__content">
        {oneCasePerPeople || oneDeathPerPeople || oneTestPerPeople
          ? otherStatisticsCountries()
          : casesPerOneMillion ||
            deathsPerOneMillion ||
            testsPerOneMillion ||
            activePerOneMillion ||
            recoveredPerOneMillion
          ? otherStatisticsContinents()
          : statistics()}
      </CardContent>
    </Card>
  );
};

export default InfoBox;
