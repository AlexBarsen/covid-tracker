export interface ContinentInfo {
  continent: string;
  country: undefined;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  population: number;
  active: number;
  tests: number;
  continentInfo: {
    lat: number;
    long: number;
  };
  countryInfo: undefined;
  oneCasePerPeople: undefined;
  oneDeathPerPeople: undefined;
  oneTestPerPeople: undefined;
  testsPerOneMillion: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
}
