export type Publication = {
  id: string;
  author: string;
  title?: string;
  englishTitle?: string;
  otherAuthors?: string;
  documentType?: string;
  year?: number;
  genre?: string;
  language?: string;
  publisher?: string;
  publicationName?: string;
  source?: string;
  publishLocation?: string;
  date?: Date;
  reference?: string;
  note?: string;
  link?: string;
  receptions?: {
    translations: string[];
    reviews: string[];
    articles: string[];
    adaptations: string[];
    other: string[];
  };
};
