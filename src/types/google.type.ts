export interface AutocompleteResponse {
  predictions: Prediction[];
  status: string;
}

export interface Prediction {
  description: string;
  matchedSubstrings: MatchedSubstring[];
  terms: Term[];
  id?: string;
  placeID?: string;
  reference?: string;
  types?: string[];
}

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface Term {
  offset: number;
  value: string;
}
