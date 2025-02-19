import axios, { AxiosResponse } from 'axios';
import { GetNYTApiResponse } from './type';

const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const API_KEY = 'HBshjf0Xk6chVogDuevTTPXJAMFRNap1';

interface FetchNYTNewsParams {
  categories?: string[];
  sources?: string[];
  author?: string[];
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export const fetchNYTApiData = async ({
  categories = [],
  sources = [],
  author = [],
  keyword = '',
  page = 1,
  pageSize = 10,
}: FetchNYTNewsParams): Promise<AxiosResponse<GetNYTApiResponse> | null> => {
  const fqFilters = [
    categories.length
      ? `news_desk:(${categories.map((c) => `"${c}"`).join(' OR ')})`
      : '',
    sources.length
      ? `source:(${sources.map((s) => `"${s}"`).join(' OR ')})`
      : '',
    author.length ? `byline:(${author.map((a) => `"${a}"`).join(' OR ')})` : '',
  ]
    .filter(Boolean)
    .join(' AND ');

  const params = {
    'api-key': API_KEY,
    q: keyword || undefined,
    fq: fqFilters || undefined,
    page,
    'page-size': pageSize,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response;
  } catch (error) {
    console.error('Error fetching NYT news:', error);
    return null;
  }
};
