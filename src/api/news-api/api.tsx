import axios, { AxiosResponse } from 'axios';
import { GetNewsApiResponse } from './type';

const API_KEY = '1d69036b971f4426934ed0d4089c8714';
const BASE_URL = 'https://newsapi.org/v2/everything';

interface FetchNewsParams {
  sources?: string[];
  page?: number;
  pageSize?: number;
  keyword?: string;
  date?: Date;
  authors?: string[];
}

export const fetchNewsApiData = async ({
  page = 1,
  pageSize = 20,
  keyword = '',
  date,
}: FetchNewsParams): Promise<AxiosResponse<GetNewsApiResponse> | null> => {
  const pageParam = `&page=${page}`;
  const pageSizeParam = `&pageSize=${pageSize}`;

  const queryParam = keyword ? `&q=${encodeURIComponent(keyword)}` : '&q=all';

  const fromParam = date
    ? `&from=${new Date(date.setHours(0, 0, 0, 0)).toISOString()}&to=${new Date(
        date.setHours(23, 59, 59, 999)
      ).toISOString()}`
    : '';
  // const toParam = toDate ? `&to=${date?.toISOString()}` : '';

  const url = `${BASE_URL}?apiKey=${API_KEY}${queryParam}${pageParam}${pageSizeParam}${fromParam}&sortBy=popularity`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
};
