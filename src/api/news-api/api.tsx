import axios, { AxiosResponse } from 'axios';
import { DateRange } from 'react-day-picker';
import { GetNewsApiResponse } from './type';

// const API_KEY = '0e6477bac9e145af81df5f6fc81f2d90';
const API_KEY = 'd8108b576ee54eff9bfdc1a7db972166';
const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=us';

interface FetchNewsParams {
  categories?: string[];
  sources?: string[];
  author?: string[];
  page?: number;
  pageSize?: number;
  keyword?: string;
  date?: DateRange;
}

export const fetchNewsApiData = async ({
  categories = [],
  sources = [],
  author = [],
  page = 1,
  pageSize = 20,
  keyword = '',
  date,
}: FetchNewsParams): Promise<AxiosResponse<GetNewsApiResponse> | null> => {
  const categoryParam =
    categories.length > 0 ? `&category=${categories.join(',')}` : '';
  const sourcesParam =
    sources.length > 0 ? `&sources=${sources.join(',')}` : '';
  const authorParam = author.length > 0 ? `&author=${author.join(',')}` : '';
  const pageParam = `&page=${page}`;
  const pageSizeParam = `&pageSize=${pageSize}`;
  const queryParam = keyword ? `&q=${keyword}` : '';

  const fromParam = date?.from
    ? `&from=${date.from.toISOString().split('T')[0]}`
    : '';
  const toParam = date?.to ? `&to=${date.to.toISOString().split('T')[0]}` : '';

  const url = `${BASE_URL}&apiKey=${API_KEY}${queryParam}${categoryParam}${sourcesParam}${authorParam}${pageParam}${pageSizeParam}${fromParam}${toParam}`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
};
