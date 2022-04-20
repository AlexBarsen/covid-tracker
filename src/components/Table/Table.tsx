import React from "react";

import numeral from "numeral";
import "./Table.scss";

interface Props {
  countries?: any;
}

const Table: React.FC<Props> = ({ countries }) => {
  return (
    <table className="table">
      <tbody className="table__body">
        {countries?.map((country: any) => (
          <tr className="table__row" key={country?.country}>
            <td className="table__row--country">{country?.country}</td>
            <td className="table__row--cases">
              {numeral(country?.cases).format("0,0")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
