export interface ContinentInfo {
  continent: string;
  country: undefined;
  population: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  continentInfo: {
    lat: number;
    long: number;
  };
}
