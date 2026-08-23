export type Author = {
  id: string;
  name: string;
  pseudonyms?: string;
  otherNames?: string;
  yearOfBirth?: number;
  yearOfDeath?: number;
  country?: string;
  language?: string;
  biographicalDetails?: string;
  professionalDetails?: string;
  publications: string[];
};
