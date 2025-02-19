import { PublicRequest } from '@/lib';
import { FetchGaurdianArticlesParams, GetGuardianApiResponse } from './type';

const BASE_URL = 'https://content.guardianapis.com';
const API_KEY = 'your_guardian_api_key';
export const getGuardianArticles = async ({
  q,
  from,
  to,
  pageSize = 50,
  page = 1,
  orderBy = 'newest',
}: FetchGaurdianArticlesParams): Promise<GetGuardianApiResponse> => {
  try {
    const response = await PublicRequest.get(`${BASE_URL}/search`, {
      params: {
        'api-key': API_KEY,
        q,
        'from-date': from,
        'to-date': to,
        'page-size': pageSize,
        page,
        'order-by': orderBy,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Guardian articles:', error);
    throw error;
  }
};
