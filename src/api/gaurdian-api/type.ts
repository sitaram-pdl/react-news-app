export interface FetchGaurdianArticlesParams {
  q?: string;
  from?: string; // Format: YYYY-MM-DD
  to?: string; // Format: YYYY-MM-DD
  pageSize?: number;
  page?: number;
  orderBy?: 'newest' | 'oldest' | 'relevance';
}

export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

export interface GetGuardianApiResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: GuardianArticle[];
  };
}
