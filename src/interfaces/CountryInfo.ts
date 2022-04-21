export interface CountryInfo {
  country: string;
  continent: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  countryInfo: {
    iso2: string;
    lat: number;
    long: number;
  };
}