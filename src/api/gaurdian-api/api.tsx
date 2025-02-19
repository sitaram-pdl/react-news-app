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
  // Build query parameters dynamically based on function arguments
  const queryParams: string[] = [];

  if (keyword) queryParams.push(`q=${encodeURIComponent(keyword)}`);
  if (from) queryParams.push(`from-date=${from}`);
  if (to) queryParams.push(`to-date=${to}`);
  if (orderBy) queryParams.push(`order-by=${orderBy}`);

  queryParams.push(`page=${page}`);
  queryParams.push(`page-size=${pageSize}`);

  // Ensure the parameters are joined properly
  const queryString = queryParams.length > 0 ? `&${queryParams.join('&')}` : '';

  const url = `${BASE_URL}/search?api-key=${API_KEY}${queryString}&show-fields=thumbnail,trailText,byline`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching Guardian news:');
    return null;
  }
};
