interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface GetNewsApiSourceResponse {
  status: string;
  sources: Source[];
}

interface Source {
  id: string;
  name: string;
}

export interface ApiArticle {
  source: Source;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface GetNewsApiResponse {
  status: string;
  totalResults: number;
  articles: ApiArticle[];
}

export type FetchArticlesParams = Partial<{
  q: string; // Keywords or phrases
  from: string;
  to: string;
  language: string;
  sortBy: string;
  pageSize: number;
  page: number;
}>;

export interface FetchNewsParams {
  categories?: string[];
  sources?: string[];
  author?: string[];
  page?: number;
  pageSize?: number;
}
