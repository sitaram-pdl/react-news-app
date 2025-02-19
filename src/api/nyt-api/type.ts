export interface Multimedia {
  rank: number;
  subtype: string;
  caption: string | null;
  credit: string | null;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: {
    [key: string]: string | number | null;
  };
  subType: string;
  crop_name: string;
}

export interface Headline {
  main: string;
  kicker: string;
  content_kicker: string | null;
  print_headline: string | null;
  name: string | null;
  seo: string | null;
  sub: string | null;
}

export interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface BylinePerson {
  firstname: string;
  middlename: string | null;
  lastname: string;
  qualifier: string | null;
  title: string | null;
  role: string;
  organization: string;
  rank: number;
}

export interface Byline {
  original: string;
  person: BylinePerson[];
  organization: string | null;
}

export interface Doc {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: Multimedia[];
  headline: Headline;
  keywords: Keyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface Response {
  docs: Doc[];
}

export interface GetNYTApiResponse {
  status: string;
  copyright: string;
  response: Response;
}
