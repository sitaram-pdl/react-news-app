import { PublicRequest } from '@/lib';
import { FetchArticlesParams } from '../news-api';
import { GetNYTApiResponse } from './type';

const BASE_URL = 'https://api.nytimes.com/svc/search/v2';
const API_KEY = 'your_guardian_api_key';

export const getNYTArticles = async ({
  q,
  from,
  to,
  language = 'en',
  sortBy = 'publishedAt',
  pageSize = 50,
  page = 1,
}: FetchArticlesParams): Promise<GetNYTApiResponse> => {
  try {
    const response = await PublicRequest.get(`${BASE_URL}/articlesearch.json`, {
      params: {
        'api-key': API_KEY,
        q,
        from,
        to,
        language,
        sort: sortBy,
        pageSize,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching NYT articles:', error);
    throw error;
  }
};
