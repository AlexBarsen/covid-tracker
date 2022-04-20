import React from "react";
import "./InfoBox.scss";
import { Card, CardContent, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  title: string;
  cases?: string;
  total?: string;
  isRed?: boolean;
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
  spanColorRed: {
    fontWeight: "bold",
    color: "red",
  },
  spanColorGreen: {
    fontWeight: "bold",
    color: "green",
  },
});

const InfoBox: React.FC<Props> = ({ title, cases, total, isRed }) => {
  const classes = useStyles();

  return (
    <Card className="card">
      <CardContent className="card__content">
        <Box></Box>
        <Typography className={classes.titleStyle + " card__content--title"}>
          {title}:
        </Typography>
        <Typography variant="h3" className={classes.typographyStyle}>
          <span
            className={isRed ? classes.spanColorRed : classes.spanColorGreen}
          >
            +{cases}
          </span>
        </Typography>
        <Typography variant="h4" className={classes.typographyStyle}>
          <strong>Total:</strong> {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
