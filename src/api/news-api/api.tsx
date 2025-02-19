import { PublicRequest } from '@/lib';
import {
  FetchArticlesParams,
  GetNewsApiResponse,
  GetNewsApiSourceResponse,
} from './type';

const BASE_URL = 'https://newsapi.org/v2';
const API_KEY = 'your_guardian_api_key';

export const getNewsSources = async (): Promise<GetNewsApiSourceResponse> => {
  try {
    const response = await PublicRequest.get(
      `${BASE_URL}/top-headlines/sources?apiKey=${'Aaa'}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching news sources:', error);
    throw error;
  }
};

export const getArticles = async ({
  q,
  from,
  to,
  language = 'en',
  sortBy = 'publishedAt',
  pageSize = 50,
  page = 1,
}: FetchArticlesParams): Promise<GetNewsApiResponse> => {
  try {
    const response = await PublicRequest.get(`${BASE_URL}/everything`, {
      params: {
        apiKey: API_KEY,
        q,
        from,
        to,
        language,
        sortBy,
        pageSize,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};
