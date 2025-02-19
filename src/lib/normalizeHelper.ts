import { ApiArticle } from '@/api';
import { Article } from '@/type/article';

export const normalizeArticlesToNewsCards = (
  articles: ApiArticle[]
): Article[] => {
  return articles.map((article) => ({
    title: article.title,
    author: article.author ?? 'Unknown',
    date: article.publishedAt,
    description: article.description ?? '',
    imageUrl: article.urlToImage ?? '',
    source: article.source?.name ?? 'Unknown Source',
    sourceUrl: article.url,
    web_url: article.url,
  }));
};
