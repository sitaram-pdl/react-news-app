import axios, { AxiosResponse } from 'axios';
import { GetNYTApiResponse } from './type';

const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const API_KEY = '0or0oIKwW0R6Wl2OIV6DmaRFkoRvkxXh';

interface FetchNYTNewsParams {
  date?: Date;
  page?: number;
  keyword?: string;
}

export const fetchNYTApiData = async ({
  keyword = '',
  date,
  page = 0,
}: FetchNYTNewsParams): Promise<AxiosResponse<GetNYTApiResponse> | null> => {
  // Format date in local time to YYYYMMDD
  const formatDate = (inputDate: Date) => {
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const formattedDate = date ? formatDate(date) : undefined;

  const queryParams = new URLSearchParams({
    'api-key': API_KEY,
    ...(formattedDate && {
      begin_date: formattedDate,
      end_date: formattedDate,
    }),
    page: page.toString(),
    ...(keyword && { q: keyword }), // ✅ Fixed: Added `q` correctly inside URLSearchParams
  });

  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching NYT news:', error);
    return null;
  }
};
