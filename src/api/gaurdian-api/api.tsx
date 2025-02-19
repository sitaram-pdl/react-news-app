import axios, { AxiosResponse } from 'axios';
import { DateRange } from 'react-day-picker';
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
  date?: DateRange;
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

  const dateRangeParams = date
    ? [
        date.from ? `from-date=${date.from.toISOString().split('T')[0]}` : '',
        date.to ? `to-date=${date.to.toISOString().split('T')[0]}` : '',
      ]
    : [];

  const queryString = [
    ...queryParams,
    `page=${page}`,
    `page-size=${pageSize}`,
    ...dateRangeParams.filter(Boolean),
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
