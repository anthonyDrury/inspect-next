import { Term } from "./google.type";

export type Location = {
  cityName: string;
  countryName: string;
  stateName?: string | undefined;
};

export type CountryID = {
  code: string;
  label: string;
};

export type AutocompleteOption = {
  description: string;
  terms: Term[];
};
