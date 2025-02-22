import axios, { AxiosResponse } from 'axios';
import { GetGuardianApiResponse } from './type';

const BASE_URL = 'https://content.guardianapis.com';
const API_KEY = '07209d94-b995-408c-8714-d8337300f627';

interface FetchGuardianNewsParams {
  categories?: string[];
  keyword?: string;
  from?: string;
  to?: string;
  pageSize?: number;
  page?: number;
  orderBy?: 'newest' | 'oldest';
  date?: Date;
  useDate?:
    | 'published'
    | 'first-publication'
    | 'newspaper-edition'
    | 'last-modified';
}

export const fetchGuardianApiData = async ({
  keyword = '',
  page = 1,
  pageSize = 20,
  orderBy = 'newest',
  date,
  useDate = 'published',
}: FetchGuardianNewsParams): Promise<AxiosResponse<GetGuardianApiResponse> | null> => {
  const queryParams: string[] = [];

  if (keyword) queryParams.push(`q=${encodeURIComponent(keyword)}`);
  if (orderBy) queryParams.push(`order-by=${orderBy}`);
  if (useDate) queryParams.push(`use-date=${useDate}`);

  // Apply date reduction by 1 day (if date is provided)
  if (date) {
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 1); // Reduce 1 day

    const formattedDate = previousDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    queryParams.push(`from-date=${formattedDate}`, `to-date=${formattedDate}`);
  }

  const queryString = [
    ...queryParams,
    `page=${page}`,
    `page-size=${pageSize}`,
  ].join('&');

  const url = `${BASE_URL}/search?api-key=${API_KEY}&${queryString}&show-fields=thumbnail,trailText,byline`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching Guardian news:', error);
    return null;
  }
};
