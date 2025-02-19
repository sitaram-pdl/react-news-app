import axios, { AxiosResponse } from 'axios';
import { GetGuardianApiResponse } from './type';

const BASE_URL = 'https://content.guardianapis.com';
const API_KEY = '07209d94-b995-408c-8714-d8337300f627';

interface FetchGuardianNewsParams {
  keyword?: string;
  from?: string;
  to?: string;
  pageSize?: number;
  page?: number;
  orderBy?: 'newest' | 'oldest';
}

export const fetchGuardianApiData = async ({
  keyword = '',
  from,
  to,
  page = 1,
  pageSize = 30,
  orderBy = 'newest',
}: FetchGuardianNewsParams): Promise<AxiosResponse<GetGuardianApiResponse> | null> => {
  const queryParam = keyword ? `&q=${keyword}` : '';
  const pageParam = `&page=${page}`;
  const pageSizeParam = `&page-size=${pageSize}`;
  const orderByParam = `&order-by=${orderBy}`;
  const fromParam = from ? `&from-date=${from}` : '';
  const toParam = to ? `&to-date=${to}` : '';

  const url = `${BASE_URL}/search?api-key=${API_KEY}${queryParam}${pageParam}${pageSizeParam}${orderByParam}${fromParam}${toParam}&show-fields=thumbnail,trailText,byline`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching Guardian news:', error);
    return null;
  }
};
