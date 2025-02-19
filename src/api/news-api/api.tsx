import axios, { AxiosResponse } from 'axios';
import { GetNewsApiResponse } from './type';

const API_KEY = '0e6477bac9e145af81df5f6fc81f2d90';
const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=us';

interface FetchNewsParams {
  categories?: string[];
  sources?: string[];
  author?: string[];
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export const fetchNewsApiData = async ({
  categories = [],
  sources = [],
  author = [],
  page = 1,
  pageSize = 30,
  keyword = '',
}: FetchNewsParams): Promise<AxiosResponse<GetNewsApiResponse> | null> => {
  const categoryParam =
    categories.length > 0 ? `&category=${categories.join(',')}` : '';
  const sourcesParam =
    sources.length > 0 ? `&sources=${sources.join(',')}` : '';
  const authorParam = author.length > 0 ? `&author=${author.join(',')}` : '';
  const pageParam = `&page=${1}`;
  const pageSizeParam = `&pageSize=${pageSize * page}`;
  const queryParam = `&q=${keyword}`;

  const url = `${BASE_URL}&apiKey=${API_KEY}${queryParam}${categoryParam}${sourcesParam}${authorParam}${pageParam}${pageSizeParam}`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
};
